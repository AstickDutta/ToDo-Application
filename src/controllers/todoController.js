const ToDo = require('../models/todoModel');

const createTodo = async (req, res) => {
  try {
    const { title, description, dueDate, priority, category } = req.body;
    const newTodo = await ToDo.create({
      userId: req.user._id,
      title,
      description,
      dueDate,
      priority,
      category,
    });
    res.status(201).json({ status: true, message: "New todo created successfully", newTodo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// const getTodos = async (req, res) => {
//   try {
//     const { status, priority, category, dueDate } = req.query;

//     const query = { userId: req.user._id, isDeleted: false };
//     if (status) query.status = status;
//     if (priority) query.priority = priority;
//     if (category) query.category = category;
//     if (dueDate) query.dueDate = { $lte: new Date(dueDate) };

//     const sort = req.query.sort || '-createdAt';
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const skip = (page - 1) * limit;

//     const todos = await ToDo.find(query)
//       .sort(sort)
//       .skip(skip)
//       .limit(limit);

//     const totalCount = await ToDo.countDocuments(query);

//     res.status(200).json({
//       message: "to-do list fetch successfully",
//       totalCount,
//       currentPage: page,
//       totalPages: Math.ceil(totalCount / limit),
//       todos,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


const getTodos = async (req, res) => {
  try {
    const { status, priority, category, dueDate, nearDueDate } = req.query;

    const query = { userId: req.user._id, isDeleted: false };
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (category) query.category = category;
    if (dueDate) query.dueDate = { $lte: new Date(dueDate) };

    if (nearDueDate === 'true') {
      const currentDate = new Date();
      const threeDaysLater = new Date();
      threeDaysLater.setDate(currentDate.getDate() + 3);

      query.dueDate = {
        $gte: currentDate,
        $lte: threeDaysLater,
      };
    }

    const sort = req.query.sort || '-createdAt';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const todos = await ToDo.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const totalCount = await ToDo.countDocuments(query);

    res.status(200).json({
      status: true,
      message: "To-do list fetched successfully",
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      todos,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const todo = await ToDo.findOneAndUpdate(
      { _id: id, userId: req.user._id, isDeleted: false },
      updates,
      { new: true }
    );

    if (!todo) return res.status(404).json({ status: false, message: 'To-do not found' });

    res.status(200).json({ status: true, message: "To-Do updated successfully", todo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await ToDo.findOneAndUpdate(
      { _id: id, userId: req.user._id, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );

    if (!todo) return res.status(404).json({ message: 'To-do not found' });

    res.status(200).json({ message: 'To-do deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTodo,
  updateTodo,
  getTodos,
  deleteTodo
}