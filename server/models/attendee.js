const mongoose = require('mongoose')

const attendeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  attendeeId:String,
  eventId:{
    type:mongoose.Schema.ObjectId,
    ref:"Event"
  },
  checkedIn:{
    type:Boolean,
    default:false
  },
})

const Attendee = mongoose.model('Attendee', attendeeSchema)

module.exports = Attendee
