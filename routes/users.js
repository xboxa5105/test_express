var express = require('express');
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var router = express.Router();
var user_controller = require(`${global.appRoot}/app/controller/user_controller`)

const UserController = new user_controller
/* GET users listing. */
router.get('/', UserController.getsignin());

router.post('/signin',
  passport.authenticate('local', {
    successRedirect: '/users/profile',
    failureRedirect: '/users/signin',
    failureFlash: true
  }),
  function (req, res) {
    res.redirect('/users/profile')
  }
);

router.get('/signup', UserController.getsignup())

router.post('/signup',
  
);

passport.use(new LocalStrategy(
  function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      User.comparePassword(password, user.password, function (err, isMatch) {
        if (err) throw err
        if (isMatch) {
          return done(null, user)
        } else {
          return done(null, false, { message: 'Invalid password' })
        }
      })
    });
  }
));
module.exports = router;
