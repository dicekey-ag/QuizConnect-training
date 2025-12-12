// routes/userAnswerRoutes.js
const express = require('express');
const router = express.Router();
const userAnswerController = require('../controllers/userAnswerController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, userAnswerController.saveUserAnswer);

module.exports = router;
