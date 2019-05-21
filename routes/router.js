var express = require('express');
var router = express.Router();
var passport = require('passport')
var usersRouter = require(`${global.appRoot}/routes/users`);
var membersRouter = require(`${global.appRoot}/routes/members`);

router.use('/', usersRouter);

router.use('/member', membersRouter);

module.exports = router;

// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//   User.findOne({ where: { id: id } })
//   .then((err, user) => {
//     done(err, user);
//   })
//   .catch((err) => {
//     console.log(err)
//   })
//   // User.getUserById(id, function(err, user) {
//   //   done(err, user);
//   // });
// });