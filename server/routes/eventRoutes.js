const express=require('express')
const route=express.Router()
const catchAsync=require('../utils/catchAsync')
const eventController = require('../controllers/eventControllers');
const authMiddleware=require('../middleware/authMiddleware')
const isOrganizer=require('../middleware/isOrganizer')
const {upload} = require('../config/cloudinary');


route.get('/showallevent',catchAsync(eventController.showAllEvent))
route.get('/aboutevent/:eventId',catchAsync(eventController.aboutEvent))
route.get('/showuserevent',authMiddleware,catchAsync(eventController.showUserEvent))
route.get('/showevent/:eventId',authMiddleware,isOrganizer,catchAsync(eventController.showOneEvent))
route.get('/createevent',authMiddleware,catchAsync(eventController.showCreateEvent))
route.post('/createevent',authMiddleware,upload.single('image'),catchAsync(eventController.createEvent))
route.put('/updateevent/:eventId',authMiddleware,isOrganizer,upload.single('image'),catchAsync(eventController.updateEvent))
route.delete('/deleteevent/:eventId',authMiddleware,isOrganizer,catchAsync(eventController.deleteEvent))

module.exports=route