const User = require('../models/user')
const Review = require('../models/review')
const Event = require('../models/event')

exports.postReview = async (req, res) => {
  const { eventId } = req.params
  const userId = req.user._id
  const body = req.body
  const event = await Event.findById(eventId)

  if (!event) {
    return res.status(404).json({ success: false, message: 'Event not found' })
  }

  const review = new Review({
    ...body,
    user: userId,
  })
  await review.save()
  event.reviews.push(review)
  await event.save()
  console.log(event.reviews)


  res.json({ success: true, review })
}

exports.deleteReview = async (req, res) => {
  const { eventId, reviewId } = req.params
  const event = await Event.findByIdAndUpdate(
    { _id: eventId },
    { $pull: { reviews: reviewId } },
  )
  res.json({ success: true, event })
}
