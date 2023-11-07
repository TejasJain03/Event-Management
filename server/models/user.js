  const mongoose = require('mongoose');

  const userSchema = new mongoose.Schema({
    password:String,
    name: String,
    email: String,
    phoneNumber: String,
    organisedEvents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event', 
      },
    ],
  },{timestamps:true});

  const User = mongoose.model('User', userSchema);

  module.exports = User;
