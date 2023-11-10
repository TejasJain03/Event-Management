const express = require('express')
const router = express.Router()
const authControllers = require('../controllers/authControllers')
const authMiddleware = require('../middleware/authMiddleware')
const catchAsync = require('../utils/catchAsync')

router.route('/register').post(catchAsync(authControllers.registerUser))

router.route('/login').post(catchAsync(authControllers.loginUser))

router.route('/logout').get(authMiddleware,catchAsync(authControllers.logoutUser))

router
  .route('/deleteuser')
  .delete(authMiddleware, catchAsync(authControllers.deleteUser))

module.exports = router
