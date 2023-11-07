const express=require('express')
const route=express.Router()
const catchAsync=require('../utils/catchAsync')
const eventController = require('../controllers/eventControllers');
const authMiddleware=require('../middleware/authMiddleware')
const isOrganizer=require('../middleware/isOrganizer')


route.get('/showallevent',catchAsync(eventController.showAllEvent))
route.get('/showuserevent',authMiddleware,catchAsync(eventController.showUserEvent))
route.get('/showevent/:eventId',authMiddleware,isOrganizer,catchAsync(eventController.showOneEvent))
route.get('/createevent',authMiddleware,catchAsync(eventController.showCreateEvent))
route.post('/createevent',authMiddleware,catchAsync(eventController.createEvent))
route.put('/updateevent/:eventId',authMiddleware,isOrganizer,catchAsync(eventController.updateEvent))
route.delete('/deleteevent/:eventId',authMiddleware,isOrganizer,catchAsync(eventController.deleteEvent))

module.exports=route