const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../models');

// Google認証情報が設定されているかチェック
const isGoogleAuthEnabled =
  process.env.GOOGLE_CLIENT_ID &&
  process.env.GOOGLE_CLIENT_SECRET;

// Google認証が有効な場合のみGoogle戦略を登録
if (isGoogleAuthEnabled) {
  console.log('Google OAuth is enabled');

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
} else {
  console.warn('Google OAuth is disabled: Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET');
}

// セッション管理の設定（常に必要）
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
