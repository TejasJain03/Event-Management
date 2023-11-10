const { string } = require('joi')
const mongoose = require('mongoose')

const ticketCategorySchema = new mongoose.Schema({
  name: String,
  price: Number,
})

const ticketSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    attendeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    ticketType: ticketCategorySchema,
    purchaseDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
)

const Ticket = mongoose.model('Ticket', ticketSchema)

module.exports = Ticket
