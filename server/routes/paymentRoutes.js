const express = require('express')
const route = express.Router()
const catchAsync=require('../utils/catchAsync')
const paymentControllers=require("../controllers/paymentControllers")

route.post('/create-order',catchAsync(paymentControllers.creatOrder))
route.post('/paymentverification',catchAsync(paymentControllers.paymentVerification))

module.exports=route