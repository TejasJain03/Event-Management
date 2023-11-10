const Joi = require('joi')

const userRegistrationSchema = Joi.object({
  password: Joi.string().min(6).required(),
  name: Joi.string().max(100).required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().max(10).required(),
})

const userLoginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
})

const attendeeRegistrationSchema = Joi.object({
  name: Joi.string().max(50).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().max(10).required(),
  attendeeId: Joi.string().required(),
  eventId: Joi.required(),
  ticketCategory:Joi.required(),
  purchaseDate:Joi.required()
})

module.exports = {
  userRegistrationSchema,
  attendeeRegistrationSchema,
  userLoginSchema,
}
