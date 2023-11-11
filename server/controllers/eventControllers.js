const Attendee = require('../models/attendee')
const User = require('../models/user')
const Ticket = require('../models/ticket')
const Event = require('../models/event')
const ExpressError = require('../middleware/ExpressError')
const { cloudinary } = require('../config/cloudinary')
const Category = require('../models/category')

exports.showAllEvent = async (req, res) => {
  // const userId = req.user._id
  // console.log(userId)
  // console.log(req.user.organisedEvents)
  const data = await Event.find({ isPublic: true }).populate('organizerId')
  res.send(data)
}

exports.aboutEvent = async (req, res) => {
  const { eventId } = req.params
  const event = await Event.findById(eventId).populate(
    'organizerId reviews ticketCategories',
  )

  if (!event) {
    return res.status(404).json({ success: false, message: 'Event not found' })
  }
  res.send(event)
}

exports.showOneEvent = async (req, res) => {
  const { eventId } = req.params
  const event = await Event.findById(eventId).populate(
    'organizerId attendees reviews ticketCategories',
  )
  if (!event) {
    return res.status(404).json({ success: false, message: 'Event not found' })
  }
  const organizerName = event.organizerId.name
  res.send(event)
  res.json({ success: true, message: 'Successfully found', organizerName })
}

exports.showUserEvent = async (req, res) => {
  const userId = req.user._id
  const user = await User.findById(userId).populate('organisedEvents')
  if (!user) {
    throw new ExpressError(401, false, 'User not found')
  }

  const eventsOrganized = user.organisedEvents

  const events = eventsOrganized.map((event) => ({
    _id: event._id,
    name: event.name,
    description: event.description,
    image: event.image,
    date: event.date,
    location: event.location,
    ticketAvailable: event.ticketAvailable,
    ticketCategories: event.ticketCategories,
  }))

  res.send(events)
}

exports.showCreateEvent = async (req, res) => {
  res.send(req.user._id)
}

exports.createEvent = async (req, res) => {
  const eventData = req.body
  const image = req.file

  if (image) {
    eventData.image = image.path
    const data = new Event({ ...eventData, organizerId: req.user._id })
    await data.save()

    const user = await User.findById(req.user._id)
    user.organisedEvents.push(data._id)
    await user.save()

    res.status(201).json({
      success: true,
      message: 'Event created Successfully',
      data: data,
    })
  } else {
    const data = new Event({ ...eventData, organizerId: req.user._id })
    await data.save()

    const user = await User.findById(req.user._id)
    user.organisedEvents.push(data._id)
    await user.save()

    res.status(201).send({
      success: true,
      message: 'Event created successfully',
      data: data._id,
    })
  }
}

exports.updateEvent = async (req, res) => {
  const { eventId } = req.params
  const { ...rest } = req.body
  const userId = req.user._id

  const event = await Event.findOne({ _id: eventId, organizerId: userId })

  if (!event) {
    return res
      .status(403)
      .json({ message: 'You are not authorized to update this event' })
  }
  if (req.file) {
    rest.image = req.file.path
  }

  const updatedEvent = await Event.findOneAndUpdate(
    { _id: eventId },
    { $set: rest },
    { new: true },
  )

  res.json({success:true,message:"Event Updated Successfully"})
}

exports.deleteEvent = async (req, res) => {
  const { eventId } = req.params
  const event = await Event.findById(eventId)

  const organizerId = event.organizerId._id

  const attendeeIds = event.attendees
  const ticketIds = event.tickets
  const categories = event.ticketCategories

  await Event.findByIdAndDelete(eventId)
  const user = await User.findByIdAndUpdate(
    { _id: organizerId },
    { $pull: { organisedEvents: eventId } },
  )

  await user.save()
  const category = await Category.deleteMany({ _id: { $in: categories } })
  const attendee = await Attendee.deleteMany({ _id: { $in: attendeeIds } })

  const ticket = await Ticket.deleteMany({ _id: { $in: ticketIds } })

  res.send({ success:true,message:"Event deleted Successfully" })
}
