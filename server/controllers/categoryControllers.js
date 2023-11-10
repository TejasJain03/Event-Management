const ExpressError = require('../middleware/ExpressError')
const Category = require('../models/category')
const Event = require('../models/event')

exports.createCategory = async (req, res) => {
  const { eventId } = req.params
  const { name, price } = req.body

  const event = await Event.findById(eventId)
  if (!event) {
    return res.status(404).json({ message: 'Event not found' })
  }

  const category = new Category({ name, price })

  await category.save()

  event.ticketCategories.push(category._id)
  await event.save()

  return res
    .status(201)
    .json({ message: 'Category created successfully', category })
}

exports.updateCategory = async (req, res) => {}

exports.deleteCategory = async (req, res) => {}
