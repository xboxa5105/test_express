const express = require('express');
const router = express.Router();
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require("bcrypt")
const member_controller = require(`../app/controller/member_controller`)
const auth = require(`../app/middleware/auth`)
const user_controller = require(`../app/controller/user_controller`)
const User = require(`../app/model/user`)

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

router.use(auth)

router.get('/', MemberController.index)

router.get('/member/create', MemberController.getcreate)

router.post('/member/create', MemberController.postcreate)

router.get('/member/update/:id', MemberController.getupdate)

router.post('/member/update/:id', MemberController.putupdate)

router.get('/member/delete/:id', MemberController.delete)

module.exports = router;

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
  });