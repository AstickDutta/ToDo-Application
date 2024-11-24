const express = require('express');
const {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo
} = require('../controllers/todoController');
const { protect } = require('../middlewares/authMiddleware');
const { todoCreateValidationSchema, todoUpdateValidationSchema } = require('../utils/validationSchemas');
const validateRequest = require('../middlewares/validationRequest');

const router = express.Router();

router.post('/', protect, validateRequest(todoCreateValidationSchema), createTodo);
router.get('/', protect, getTodos);
router.patch('/:id', protect, validateRequest(todoUpdateValidationSchema), updateTodo);
router.delete('/:id', protect, deleteTodo);

module.exports = router;
