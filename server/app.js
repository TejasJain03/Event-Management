const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()
const eventRoutes = require('./routes/eventRoutes')
const attendeeRoutes = require('./routes/attendeeRoutes')
const authRoutes = require('./routes/authRoutes')
const ticketRoutes = require('./routes/ticketRoutes')
const reviewRoutes = require('./routes/reviewRoutes')
const ExpressError = require('./middleware/ExpressError')
const GlobalErrorHandler = require('./middleware/GlobalErrorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const PORT = process.env.PORT || 8000

const corsOptions = {
  origin: 'http://127.0.0.1:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}
app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

app.use('/api', eventRoutes)
app.use('/api', attendeeRoutes)
app.use('/api', authRoutes)
app.use('/api', ticketRoutes)
app.use('/api/event', reviewRoutes)

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('DB CONNECTED')
    app.listen(PORT, () => {
      console.log('LISTENING TO THE PORT')
    })
  })
  .catch((err) => console.log('ERROR!!'))

app.all('*', (req, res, next) => {
  try {
    throw new ExpressError(404, false, 'Page not found')
  } catch (error) {
    next(error)
  }
})

app.use(GlobalErrorHandler)
