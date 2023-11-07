const express=require("express")
const route=express.Router()
const attendeeController=require('../controllers/attendeeControllers')
const catchAsync=require("../utils/catchAsync")
const authMiddleware=require("../middleware/authMiddleware")
const isOrganizer=require("../middleware/isOrganizer")

route.get('/event/:eventId/showattendees',authMiddleware,isOrganizer,catchAsync(attendeeController.showAttendee))
route.get('/event/:eventId/showcheckedinattendees',catchAsync(attendeeController.showCheckedInAttendee))
route.put("/updateattendee/:id",catchAsync(attendeeController.updateAttendee))

module.exports=route