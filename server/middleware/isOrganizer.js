const catchAsync = require('../utils/catchAsync')
const ExpressError = require('./ExpressError')
const Event = require('../models/event')

const isOrganizer = async (req, res, next) => {
  const  userId  = req.user._id
  const { eventId } = req.params

  const event = await Event.findById(eventId)

  if (!event) {
    return res.status(404).json({ success: false, message: 'Event not found' })
  }
  const organizerId=event.organizerId._id
  
  if ( organizerId.toString()=== userId.toString()) {
    return next()
  } else {
    console.log(organizerId.toString())
    console.log(userId.toString())
    throw new ExpressError(401, false, 'Only the event organizer can do this.')
  }
}

module.exports = catchAsync(isOrganizer)
