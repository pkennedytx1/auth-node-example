const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({"message": "You have hit the auth app!"});
})

router.get('/login', (req, res, next) => {
  res.sendFile('templates/login.html', { root: __dirname })
})

router.get('/signup', (req, res, next) => {
  res.sendFile('templates/signup.html', { root: __dirname })
})

router.post(
    '/signup',
    passport.authenticate('signup', { session: false }),
    async (req, res, next) => {
      console.log('Hitting the signup return response', req, res)
      res.json({
        message: 'Signup successful',
        user: req.user
      });
    }
  );

router.post(
'/login',
async (req, res, next) => {
    passport.authenticate(
    'login',
    async (err, user, info) => {
        console.log('Hitting the login route handler', err, user);
        try {
        if (err || !user) {
            const error = new Error('An error occurred.');

            return next(error);
        }

        req.login(
            user,
            { session: false },
            async (error) => {
            if (error) return next(error);

            const body = { _id: user._id, email: user.email };
            const token = jwt.sign({ user: body }, 'TOP_SECRET');

            return res.json({ token });
            }
        );
        } catch (error) {
        return next(error);
        }
    }
    )(req, res, next);
}
);

module.exports = router;