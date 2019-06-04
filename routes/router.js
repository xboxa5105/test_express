const express = require('express');
const router = express.Router();
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require("bcrypt")
const { check } = require('express-validator/check');
const Controller = require(`../app/controller`)
const auth = require(`../app/middleware/auth`)
const Model = require("../app/model")

router.get('/signup', Controller.UserController.getsignup)

router.post('/signup', [check('email').isEmail(), check('username').exists(), check('password').exists()], Controller.UserController.postsignup);

router.get('/signin', Controller.UserController.getsignin);

router.post('/signin', [check('username').exists(), check('password').exists()],
  Controller.UserController.postsignin
);

router.get('/logout', Controller.UserController.logout)

router.use(auth)

router.get('/', Controller.MemberController.index)

router.get('/member/create', Controller.MemberController.getcreate)

router.post('/member/create', [
  check('membername').not().isEmpty(),
  check('selectgender').isIn(['man', 'woman']).not().isEmpty(),
  check('year').not().isEmpty()], Controller.MemberController.postcreate)

router.get('/member/update/:id', Controller.MemberController.getupdate)

router.post('/member/update/:id', [
  check('id').exists().not().isEmpty(),
  check('membername').exists(),
  check('gender').isIn(['man', 'woman']),
  check('birth').exists()],
  Controller.MemberController.putupdate)

router.get('/member/delete/:id', Controller.MemberController.delete)

module.exports = router;

passport.use(new LocalStrategy(
  function (username, password, done) {
    Model.User.findOne({ where: { username: username } })
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

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  Model.User.findOne({ where: { id: id }, raw: true })
    .then(function (user) {
      return done(null, user);
    })
    .catch((err) => {
      console.log("errr : ", err)
    })
});