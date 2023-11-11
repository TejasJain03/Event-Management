const ExpressError = require('../middleware/ExpressError')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Review = require('../models/review')
const generateToken = require('../utils/generateToken')
const { userRegistrationSchema, userLoginSchema } = require('../schema')
const jwt = require('jsonwebtoken')
const { findById } = require('../models/ticket')

exports.registerUser = async (req, res) => {
  const { name, email, password, phoneNumber } = req.body
  const { error, value } = userRegistrationSchema.validate(
    { name, email, password, phoneNumber },
    { abortEarly: false },
  )
  if (error) {
    // res.json(error.details.map((el) => el.message).join(','))
    throw new ExpressError(
      422,
      false,
      error.details.map((el) => el.message).join(','),
    )
  } else {
    const userExists = await User.findOne({ email })

    if (userExists) {
      throw new ExpressError(401, false, 'You have already exists.')
    }
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
    })
    res.send({ success: true, user })
  }
}

exports.loginUser = async (req, res) => {
  const { email, password } = req.body

  const { error } = userLoginSchema.validate({ email, password })
  if (error) {
    throw new ExpressError(
      422,
      false,
      error.details.map((el) => el.message).join(','),
    )
  }
  

  const user = await User.findOne({ email })

  if (!user) {
    throw new ExpressError(401, false, 'Please register first!')
  }

  const passwordMatch = await bcrypt.compare(password, user.password)

  if (!passwordMatch) {
    throw new ExpressError(
      401,
      false,
      'Incorrect Credentials!!! Please try again',
    )
  }

  generateToken(res, user._id)

  res.status(201).send({
    success: true,
    _id: user._id,
    name: user.name,
    email: user.email,
    message: 'Login successful!',
  })
}

exports.logoutUser = async (req, res) => {
  res.clearCookie('access_token', {
    httpOnly: true,
    expires: new Date(0),
    path: '/',
  })

  res.setHeader(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate',
  )

  res.status(200).send({ success: true, message: 'Logged out successfully!' })
}

exports.delete = async (req, res) => {
  const userId = req.user._id
  res.clearCookie('access_token', { httpOnly: true, expires: new Date(0) })

  const review = await Review.deleteMany({ user: userId })

  const user = await User.deleteOne(userId)

  res.json({ success: true, message: 'Successfully deleted User' })
}
