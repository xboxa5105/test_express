const { validationResult } = require('express-validator/check');
const passport = require('passport')
// const LocalStrategy = require('passport-local').Strategy
const errorFormatter = require(`../middleware/validator_error`)
const User = require(`../model/user`)

module.exports = UserController = {
    getsignin: async function (req, res, next) {
        console.log(res.locals)
        res.render('signin');
    },
    getsignup: async function (req, res, next) {
        console.log(res.locals)
        res.render('signup')
    },
    postsignup: async function (req, res) {
        let errors = validationResult(req).formatWith(errorFormatter);
        if (!errors.isEmpty()) {
            // console.log(errors.array());
            return res.status(422).json({ errors: errors.array() });
        }
        let req_body = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }
        User.create(req_body)
            .then((user) => {
                res.redirect('/')
            })
    },
    postsignin: async function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                return res.status(403).json({ errors: 'Error' });
            }
            if (!user) {
                return res.status(403).json({ errors: 'Invalid User' });
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                return res.redirect('/')
            });
        })(req, res, next);
    },
    logout: async function (req, res, next) {
        req.logout()
        //   req.flash('success_msg', 'You are logged out')
        res.redirect('/')
    }
}