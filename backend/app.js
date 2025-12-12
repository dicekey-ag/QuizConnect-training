require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');  // この行を追加
const passport = require('./config/passport');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const path = require('path');
const fs = require('fs');

// Sequelizeの初期化
sequelize.authenticate()
  .then(() => {
    console.log('データベース接続が正常に確立されました');
  })
  .catch(err => {
    console.error('データベースに接続できません:', err);
  });

const connectWithRetry = async () => {
  try {
    await sequelize.authenticate();
    console.log('データベース接続が正常に確立されました');
  } catch (err) {
    console.error('データベースに接続できません:', err);
    console.log('5秒後に再試行します...');
    setTimeout(connectWithRetry, 5000);
  }
};

connectWithRetry();

/// セッションストアの設定
const sessionStore = new SequelizeStore({
  db: sequelize,
});

// セッションミドルウェアを追加
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_hardcoded_session_secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  }
}));

// セッションストアの同期
sessionStore.sync();

// Passportミドルウェアを初期化
app.use(passport.initialize());
app.use(passport.session());


/// CORSミドルウェアを追加
app.use(cors({
  origin: [process.env.FRONTEND_URL, 'http://localhost:3000'],
  credentials: true
}));

// ミドルウェアの設定
app.use(express.json());

// 既存のミドルウェア設定の後に追加
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads/images')));  // パスを /api/uploads に変更

// アップロードディレクトリが存在しない場合は作成
const uploadsDir = path.join(__dirname, 'uploads');
// uploadsディレクトリが存在しない場合は作成
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// 静的ファイルのルートを設定
app.use('/uploads', express.static(uploadsDir));

// ルーティングの設定
const questionRoutes = require('./routes/questionRoutes');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const subcategoryRoutes = require('./routes/subcategoryRoutes');
// const communityRoutes = require('./routes/communityRoutes');
// const authRoutes = require('./routes/authRoutes');  // 追加
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const userAnswerRoutes = require('./routes/userAnswerRoutes');

app.use('/api/questions', questionRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subcategoryRoutes);
// app.use('/api/community', communityRoutes);
// app.use('/api/auth', authRoutes);  // 追加
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/user-answers', userAnswerRoutes);

// エラーハンドリングミドルウェア
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// サーバーの起動部分をコメントアウト
// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

module.exports = app;
