const User = require(`../model/user`)

module.exports = UserController = {
    getsignin: async function(req, res, next) {
        console.log(res.locals)
        res.render('signin');
    },
    getsignup: async function(req, res, next) {
        console.log(res.locals)
        res.render('signup', { errors: '' })
    },
    postsignup: async function(req, res) {
        let req_body = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }
        User.create(req_body)
            .then((user) => {
                console.log(user)
                // req.flash('success_msg', 'you are registered now log in')
                res.redirect('/')
            })
    },
    logout: async function(req, res, next) {
      req.logout()
    //   req.flash('success_msg', 'You are logged out')
      res.redirect('/')
    }
}