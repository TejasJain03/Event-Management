const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type:String,
  },
  date: {
    type: Date,
  },
  location: String,
  organizerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  tickets:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Ticket"
  }],
  ticketCategories:[{
    type:String
  }],
  ticketAvailable:Number,
  coverImage:{type:String},
  isPublic:Boolean,
  attendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Attendee', 
    },
  ],
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review', 
  }]
},{timestamps:true});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
