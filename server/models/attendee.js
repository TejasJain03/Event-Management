const mongoose = require('mongoose')

const ticketCategorySchema = new mongoose.Schema({
  name: String,
  price: Number,
})

const attendeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: Number,
  attendeeId: String,
  eventId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Event',
  },
  purchaseDate:Date,
  ticketCategory: ticketCategorySchema,
  checkedIn: {
    type: Boolean,
    default: false,
  },
})

const Attendee = mongoose.model('Attendee', attendeeSchema)

module.exports = Attendee
