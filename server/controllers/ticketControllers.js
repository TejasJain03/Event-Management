const express = require('express')
const router = express.Router()
const Ticket = require('../models/ticket')
const Event = require('../models/event')
const User = require('../models/user')
const { authMiddleware } = require('../middleware/authMiddleware')
const { attendeeRegistrationSchema } = require('../schema')
const sendEmail = require('../utils/ticketMail')
const Attendee = require('../models/attendee')
const ExpressError = require('../middleware/ExpressError')
const generateRandomID = require('../utils/getRandomId')

exports.registerTicket = async (req, res) => {
  const { eventId } = req.params
  let { ticketType, price, purchaseDate, attendeeInfo } = req.body

  const event = await Event.findById(eventId)

  if (!event) {
    return res.status(404).json({ message: 'Event not found' })
  }
  const processAttendees = async () => {
    for (const attendee of attendeeInfo) {
      attendee.attendeeId = generateRandomID()
      attendee.eventId = eventId
      const { error, value } = attendeeRegistrationSchema.validate(attendee)

      if (error) {
        return res
          .status(400)
          .json(error.details.map((el) => el.message).join(','))
      } else {
        const newAttendee = new Attendee(attendee)
        await newAttendee.save()
        sendEmail(newAttendee.email, newAttendee.attendeeId, event)
        event.attendees.push(newAttendee._id)
        event.ticketAvailable -= 1

        const newTicket = new Ticket({
          eventId,
          attendeeId: newAttendee._id,
          ticketType,
          price,
          purchaseDate: new Date(purchaseDate),
        })

        event.tickets.push(newTicket)
        await newTicket.save()
      }
    }

    await event.save()
    res.status(201).json({ message: 'Tickets registered successfully' })
  }
  processAttendees()
}

exports.attendeeCheckIn = async (req, res) => {
  const { eventId, attendeeId } = req.params
  const event = await Event.findById(eventId)
  const attendee = await Attendee.findById(attendeeId)
  attendee.checkedIn=true
  attendee.save()
  res.send(attendee.checkedIn)
}
