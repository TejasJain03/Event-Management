const express=require('express')
const route=express.Router()
const ticketControllers=require('../controllers/ticketControllers')
const catchAsync=require('../utils/catchAsync')

route.post("/event/:eventId/registerTicket",catchAsync(ticketControllers.registerTicket))
route.post("/event/:eventId/check-in/:attendeeId",catchAsync(ticketControllers.attendeeCheckIn))

module.exports=route