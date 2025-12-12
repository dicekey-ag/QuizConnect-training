const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', authMiddleware, userController.getUserProfile);

// ユーザー情報の取得
router.get('/all', authMiddleware, userController.getAllUsers);
// ユーザー情報のRole更新
router.put('/change-role', authMiddleware, userController.changeUserRole);
// ユーザー情報のdelete
router.delete('/:id', authMiddleware, userController.deleteUser);


// リフレッシュ ...
router.post('/refresh-token', authMiddleware, userController.refreshToken);



module.exports = router;
