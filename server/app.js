const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()
const eventRoutes = require('./routes/eventRoutes')
const attendeeRoutes = require('./routes/attendeeRoutes')
const authRoutes = require('./routes/authRoutes')
const ticketRoutes = require('./routes/ticketRoutes')
const reviewRoutes = require('./routes/reviewRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const paymentRoutes = require('./routes/paymentRoutes')
const ExpressError = require('./middleware/ExpressError')
const GlobalErrorHandler = require('./middleware/GlobalErrorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL)
    console.log('Connected to Mongo succesfully')
  } catch (err) {
    console.log('Error while connecting to database')
  }
}
connectDB()

const PORT = process.env.PORT || 5000

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

app.use('/api', eventRoutes)
app.use('/api', attendeeRoutes)
app.use('/api', authRoutes)
app.use('/api', ticketRoutes)
app.use('/api', paymentRoutes)
app.use('/api/event', categoryRoutes)
app.use('/api/event', reviewRoutes)

app.get('/', (req, res) => {
  res.json('Event Management')
})

app.get('/api', (req, res) => {
  res.json('Event ')
})




app.all('*', (req, res, next) => {
  try {
    new ExpressError(404, false, 'Page not found')
  } catch (error) {
    next(error)
  }
})

app.use(GlobalErrorHandler)

app.listen(PORT, () => {
  console.log('LISTENING TO THE PORT')
})
