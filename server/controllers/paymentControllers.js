const Razorpay = require('razorpay')
const crypto = require('crypto')
const Event = require('../models/event')
const Ticket = require('../models/ticket')
const Attendee = require('../models/attendee')
const { attendeeRegistrationSchema } = require('../schema')
const sendEmail = require('../utils/ticketMail')
const generateRandomID = require('../utils/getRandomId')

const razorpay = new Razorpay({
  key_id: process.env.PAYMENT_API_KEY,
  key_secret: process.env.PAYMENT_SECRET_KEY,
})

exports.creatOrder = async (req, res) => {
  // res.json(req.body.amount)
  // alert(req.body.amount)
  const options = {
    amount: req.body.amount * 100,
    currency: 'INR',
    receipt: 'order_receipt_123',
  }

  const response = await razorpay.orders.create(options)
  if (response.error) {
    console.log(response.error);
  } else {
    res.send(response);
  }
  
}

exports.getKey=async(req,res)=>{
  res.send({key:process.env.PAYMENT_API_KEY})
}

exports.paymentVerification = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body

  const allAttendeesData = JSON.parse(req.query.allAttendeesData)
  const eventId = req.query.eventId

  const body = razorpay_order_id + '|' + razorpay_payment_id

  const expectedSignature = crypto
    .createHmac('sha256', 'UKTbLcz90bxadSWJrS76VTCm')
    .update(body.toString())
    .digest('hex')

  const isAuthentic = expectedSignature === razorpay_signature

  if (isAuthentic) {
    let attendees = allAttendeesData
    console.log(attendees)
    const event = await Event.findById(eventId)

    if (!event) {
      return res.status(404).json({ message: 'Event not found' })
    }
    const processAttendees = async () => {
      for (const attendee of attendees) {
        attendee.attendeeId = generateRandomID()
        attendee.eventId = eventId
        attendee.ticketCategory = attendee.ticketCategory
        const { error, value } = attendeeRegistrationSchema.validate(attendee)

        if (error) {
          return res
            .status(400)
            .send(error.details.map((el) => el.message).join(','))
        } else {
          const newAttendee = new Attendee(attendee)
          await newAttendee.save()
          sendEmail(newAttendee.email, newAttendee.attendeeId, event)
          event.attendees.push(newAttendee._id)
          event.ticketAvailable -= 1

          const newTicket = new Ticket({
            eventId,
            attendeeId: newAttendee._id,
            ticketType: newAttendee.ticketCategory,
            purchaseDate: new Date(attendee.purchaseDate),
          })

          event.tickets.push(newTicket)
          await newTicket.save()
        }
      }

      await event.save()
    }
    processAttendees()

    res.redirect(`http://localhost:5173/paymentsuccess/${razorpay_order_id}`)
  } else {
    res.send({ success: false })
  }
}
