const { validationResult } = require('express-validator/check');
const passport = require('passport')
// const LocalStrategy = require('passport-local').Strategy
const errorFormatter = require(`../middleware/validator_error`)
const Model = require(`../model`)

module.exports = UserController = {
    getsignin: async function (req, res, next) {
        res.render('signin');
    },
    getsignup: async function (req, res, next) {
        res.render('signup')
    },
    postsignup: async function (req, res) {
        try {
            let errors = validationResult(req).formatWith(errorFormatter);
            if (!errors.isEmpty()) {
                console.log("UserController postsignup validation : ", errors.array());
                return res.status(422).json({ errors: errors.array() });
            }
            let req_body = {
                email: req.body.email,
                username: req.body.username,
                password: req.body.password
            }
            await Model.User.create(req_body)
            res.redirect('/')
        } catch (e) {
            console.log("UserController postsignup : ", e);
            if (e.message == "Validation error") {
                res.status(400).json({ errors: e.errors[0].message });
            } else {
                res.status(400).json({ errors: "User Signup has Error" });
            }
        }
    },
    postsignin: async function (req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log("UserController postsignin validation : ", errors.array());
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
        } catch (e) {
            console.log("UserController postsignin : ", e);
            res.status(400).json({ errors: "User Signin has Error" });
        }
    },
    logout: async function (req, res, next) {
        req.logout()
        res.redirect('/')
    }
}