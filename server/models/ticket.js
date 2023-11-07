const { string } = require('joi');
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  attendeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  },
  ticketType: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: 'Category', 
    type:String
  },
  price: String,
  purchaseDate: {
    type: Date,
    required: true,
  },
},{timestamps:true});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
