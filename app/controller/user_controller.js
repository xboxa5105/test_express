var User = require(`${global.appRoot}/app/model/user`)

module.exports = class UserController {
    async getsignin(req, res, next) {
        console.log(res.locals)
        res.render('signin');
    }
    async getsignup(req, res, next) {
        console.log(res.locals)
        res.render('signup', { errors: '' })
    }
    async postsignup(req, res) {
        let req_body = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }
        User.create(req_body)
            .then((user) => {
                console.log(user)
                // req.flash('success_msg', 'you are registered now log in')
                res.redirect('/signin')
            })
    }
}