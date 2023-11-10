const express=require('express')
const route=express.Router()
const catchAsync=require("../utils/catchAsync")
const categoryControllers=require("../controllers/categoryControllers")
const authMiddleware=require("../middleware/authMiddleware")
const isOrganizer=require("../middleware/isOrganizer")

route.post("/:eventId/createcategory",authMiddleware,isOrganizer,catchAsync(categoryControllers.createCategory))
route.put("/:eventId/updatecategory/:categoryId",authMiddleware,isOrganizer,catchAsync(categoryControllers.updateCategory))
route.delete("/:eventId/deletecategory/:categoryId",authMiddleware,isOrganizer,catchAsync(categoryControllers.deleteCategory))

module.exports=route