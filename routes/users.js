var express = require('express');
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var bcrypt = require("bcrypt")
var router = express.Router();
var user_controller = require(`${global.appRoot}/app/controller/user_controller`)
var User = require(`${global.appRoot}/app/model/user`)

const UserController = new user_controller

router.get('/signup', UserController.getsignup)

router.post('/signup', UserController.postsignup);

router.get('/signin', UserController.getsignin);

router.post('/signin',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signin',
    failureFlash: true
  }),
  function (req, res) {
    res.redirect('/')
  }
);

router.get('/logout', UserController.logout)

// function ensureAuthenticated(req, res, next){
//   console.log("===> ", req.session)
//   if(req.isAuthenticated()){
//     console.log("1")
//     return next();
//   } else {
//     console.log("2")
//     // req.flash('error_msg', 'you are not logged in')
//     res.redirect('/signin')
//   }
// }

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
          console.log()
          return done(null, user)
        } else {
          return done(null, false, { message: 'Invalid password' })
        }
      })
    }).catch((err) => {
      return done(err); 
    })
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({ where: { id: id }, raw: true })
  .then(function(user){
    return done(null, user);
  })
  .catch((err) => {
    console.log("errr : ", err)
  })
  // try {
  //   let user = await User.findOne({ where: { id: id }, raw: true })
  //   console.log(user)
  //   // User.getUserById(id, function(err, user) {
  //   // });
  //   done(null, user);
  // } catch (e) {
  //   console.log("E : ", e)
  // }
});

module.exports = router;
