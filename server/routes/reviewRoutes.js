const express=require("express")
const route=express.Router()
const catchAsync=require('../utils/catchAsync')
const authMiddleware=require('../middleware/authMiddleware')
const reviewControllers=require('../controllers/reviewControllers')

route.post("/:eventId/postreview",authMiddleware,catchAsync(reviewControllers.postReview))
route.delete("/:eventId/deletereview/:reviewId",authMiddleware,catchAsync(reviewControllers.deleteReview))

module.exports=route