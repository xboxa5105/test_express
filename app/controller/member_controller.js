var User = require(`${global.appRoot}/app/model/member`)

module.exports = class MemberController {
    async index(req, res, next) {
        
        console.log(res.locals)
        res.render('member_index');
    }
}