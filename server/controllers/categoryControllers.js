const ExpressError = require('../middleware/ExpressError')
const Category = require('../models/category')
const Event = require('../models/event')

exports.createCategory = async (req, res) => {
  const { eventId } = req.params
  const categories = req.body

  const event = await Event.findById(eventId)
  if (!event) {
    return res.status(404).json({ message: 'Event not found' })
  }

  for (const categoryData of categories) {
    const { name, price } = categoryData
    const category = new Category({ name, price })

    await category.save()
    event.ticketCategories.push(category._id)
  }

  await event.save()
  return res
    .status(201)
    .send({ success:true,message: 'Categories created successfully'  })
}



exports.deleteCategory = async (req, res) => {
  const { categoryId, eventId } = req.params

  const deletedCategory = await Category.findOneAndDelete({ _id: categoryId });

  if (!deletedCategory) {
    return res.status(404).json({ message: 'Category not found' });
  }

  const updatedEvent = await Event.findByIdAndUpdate(
    eventId,
    {
      $pull: { ticketCategories: categoryId },
    },
    { new: true }
  );

  if (!updatedEvent) {
    return res.status(404).json({ message: 'Event not found' });
  }

  return res.status(200).send({
    message: 'Category deleted successfully',
    deletedCategory,
    updatedEvent,
  });
}
