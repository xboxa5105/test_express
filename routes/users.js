var express = require('express');
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var bcrypt = require("bcrypt")
var router = express.Router();
var user_controller = require(`${global.appRoot}/app/controller/user_controller`)
var User = require(`${global.appRoot}/app/model/user`)

const UserController = new user_controller
/* GET users listing. */
router.get('/', UserController.getsignin);

router.post('/',
  passport.authenticate('local', {
    successRedirect: '/member',
    failureRedirect: '/',
    failureFlash: true
  }),
  function (req, res) {
    res.redirect('/member')
  }
);

router.get('/signup', UserController.getsignup)

router.post('/signup', UserController.postsignup);

router.get('/member', UserController.getsignup)


passport.use(new LocalStrategy(
  function (username, password, done) {
    User.findOne({ where: { username: username } })
    .then((user) => {
      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }
      bcrypt.compare(password, user.password, function (err, isMatch) {
        if (err) throw err
        if (isMatch) {
          return done(null, user)
        } else {
          return done(null, false, { message: 'Invalid password' })
        }
      })
    }).catch((err) => {
      return done(err); 
    })
      // , function (err, user) {
      // console.log("user", user); 
      // if (err) { return done(err); }
      // if (!user) {
      //   return done(null, false, { message: 'Incorrect username.' });
      // }
      // bcrypt.compare(password, user.password, function (err, isMatch) {
      //   if (err) throw err
      //   if (isMatch) {
      //     console.log("isMatch", isMatch);
      //     return done(null, user)
      //   } else {
      //     return done(null, false, { message: 'Invalid password' })
      //   }
      // })

    // });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = router;
