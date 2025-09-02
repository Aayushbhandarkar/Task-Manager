const express = require('express');
const { body } = require('express-validator');
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');

const router = express.Router();

router.use(auth);

router.get('/', taskController.getTasks);

router.post('/', [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required'),
  body('dueDate')
    .isISO8601()
    .withMessage('Please provide a valid date')
], taskController.createTask);

router.put('/:id', [
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty'),
  body('dueDate')
    .optional()
    .isISO8601()
    .withMessage('Please provide a valid date')
], taskController.updateTask);

router.delete('/:id', taskController.deleteTask);

module.exports = router;