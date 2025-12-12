const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../models');


// 開発環境では Google OAuth を無効化
if (process.env.NODE_ENV === 'development') {
  // 最小限の設定
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findByPk(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
} else {
// 既存のGoogle
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL || "/api/auth/google/callback"
},
  async (accessToken, refreshToken, profile, done) => {
    try {
      // メールドメインのチェック
      const email = profile.emails[0].value;
      const isCompanyEmail = email.endsWith('@agest.co.jp');

      let user = await User.findOne({ where: { googleId: profile.id } });
      if (user) {
        return done(null, user);
      }
      user = await User.create({
        googleId: profile.id,
        email: email,
        username: profile.displayName,
        role: isCompanyEmail ? 'paid' : 'free',  // ドメインに基づいて権限を設定
        password: null  // 明示的にnullを設定
      });
      done(null, user);
    } catch (error) {
      console.error('Google認証エラー:', error);
      done(error, null);
    }
  }));

}


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = passport;
