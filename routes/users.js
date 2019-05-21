var express = require('express');
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy
var bcrypt = require("bcrypt")
var router = express.Router();
var user_controller = require(`${global.appRoot}/app/controller/user_controller`)
var User = require(`${global.appRoot}/app/model/user`)
var app = express();

const UserController = new user_controller
/* GET users listing. */
router.get('/', UserController.getsignin);

router.post('/',
  passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/',
    failureFlash: true
  }),
  function (req, res) {
    res.redirect('/profile')
  }
);

router.get('/signup', UserController.getsignup)

router.post('/signup', UserController.postsignup);

router.get('/logout', function(req, res, next) {
  req.logout()
  // req.flash('success_msg', 'You are logged out')
  res.redirect('')
})

app.use(ensureAuthenticated)

router.get('/profile', function(req, res, next) {
  console.log("req.user", req.user)
  res.render('profile', {
    user: req.user.username
  });
});

function ensureAuthenticated(req, res, next){
  console.log("===> ", req.session)
  if(req.isAuthenticated()){
    console.log("1")
    return next();
  } else {
    console.log("2")
    // req.flash('error_msg', 'you are not logged in')
    res.redirect('/')
  }
}

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
  console.log("----", done)
  User.findOne({ where: { id: id } })
  .then((err, user) => {
    console.log("----", done(err, user))
    return done(err, user);
  })
  .catch((err) => {
    console.log("errr : ", err)
  })
  // User.getUserById(id, function(err, user) {
  //   done(err, user);
  // });
});

module.exports = router;
