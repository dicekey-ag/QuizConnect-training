const express = require('express');
const router = express.Router();

// const passport = require('passport');
// const jwt = require('jsonwebtoken');

// router.get('/google',
//   passport.authenticate('google', { scope: ['profile', 'email'] })
// );


// router.get('/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   (req, res) => {
//     const token = jwt.sign(
//       { userId: req.user.id, role: req.user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' }
//     );
//     res.redirect(`${process.env.FRONTEND_URL}/auth/google/callback?token=${token}`);
//   }
// );

module.exports = router;
