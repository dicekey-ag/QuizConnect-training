const express = require('express');
const session = require('express-session');
const passport = require('./config/passport');

// ... その他の既存のimport文 ...


const app = require('./app');

// セッションミドルウェアを追加
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_hardcoded_session_secret',  // 本番環境では環境変数を使用することをお勧めします
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }  // 開発環境ではfalseに設定
}));

// Passportミドルウェアを初期化
app.use(passport.initialize());
app.use(passport.session());

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
