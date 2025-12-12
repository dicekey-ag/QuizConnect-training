const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');
const authMiddleware = require('../middlewares/authMiddleware');
const { imageUploadMiddleware, csvUploadMiddleware } = require('../config/upload'); // この行を修正

const optionalAuth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId;
      req.userRole = decoded.role;
    } catch (error) {
      console.error('Token verification error:', error);
    }
  }
  next();
};


// 公開エンドポイント
router.get('/difficulties', questionController.getDifficulties);
router.get('/unique-categories', questionController.getUniqueCategories);
router.get('/unique-subcategories', questionController.getUniqueSubcategories);

// オプショナル認証エンドポイント
router.get('/', optionalAuth, questionController.getQuestions);
router.get('/category/:categoryId', optionalAuth, questionController.getQuestionsByCategoryId);
router.get('/:id', optionalAuth, questionController.getQuestionById);

// 認証必須エンドポイント
router.use(authMiddleware); // 以降のルートには認証が必要

router.get('/role', questionController.getQuestionsByRole);
// CSVアップロード用のルート
router.post('/upload-csv', csvUploadMiddleware, questionController.uploadQuestionsCsv);
// 画像アップロード用のルート
router.post('/upload-image', imageUploadMiddleware, questionController.uploadImage);

// 問題作成・更新用のルート
router.post('/', imageUploadMiddleware, questionController.createQuestion);
router.put('/:id', imageUploadMiddleware, questionController.updateQuestion);

// その他のルート
router.delete('/:id', questionController.deleteQuestion);

module.exports = router;
