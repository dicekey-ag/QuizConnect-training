const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// 既存のルート
router.get('/', categoryController.getCategories);

// 新しいルートを追加
router.get('/all', categoryController.getAllCategories);

module.exports = router;
