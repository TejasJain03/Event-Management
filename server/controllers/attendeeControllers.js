const Attendee = require('../models/attendee')
const Event = require('../models/event')

exports.showAttendee = async (req, res) => {
  const { eventId } = req.params
  const event = await Event.findById(eventId).populate('attendees', 'name email phone attendeeId')
  const attendeeDetails=event.attendees
  res.json({attendeeDetails,user:req.user._id})
}

exports.showCheckedInAttendee = async (req, res) => {
  const { eventId } = req.params
  const event = await Event.findById(eventId).populate({
    path: 'attendees',
    select: 'name checkedIn'}
  )
  event.attendees.map((attendee) => {
    if (attendee.checkedIn) {
      res.json(attendee.name)
    }
  })
  
}

exports.checkInAttendee = async (req, res) => {}

exports.updateAttendee = async (req, res) => {
  const { id } = req.params
  const { checkedIn } = req.body
  const updatedUser = await Attendee.updateOne(
    { _id: id },
    { $set: { checkedIn: checkedIn } },
  )
  res.json({ success: true, message: 'Successfully Updated Attendee' })
}
