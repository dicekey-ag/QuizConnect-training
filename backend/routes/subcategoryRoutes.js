const express = require('express');
const router = express.Router();
const subcategoryController = require('../controllers/subcategoryController');

// 既存のルート
router.get('/', subcategoryController.getSubcategories);

// 新しいルートを追加
router.get('/all', subcategoryController.getAllSubcategories);

module.exports = router;
