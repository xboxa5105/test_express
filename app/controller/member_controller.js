var Member = require(`${global.appRoot}/app/model/member`)

module.exports = class MemberController {
    async index(req, res, next) {
        let members = await Member.findAll()
        console.log(res.locals)
        res.render('member_index', { members: members });
    }
    async getcreate(req, res, next) {
        res.render('member_create');
    }
    async postcreate(req, res, next) {
        console.log(req.body);
        let req_body = {
            username: req.body.membername,
            gender: req.body.selectgender,
            birth: req.body.year,
        }
        Member.create(req_body)
            .then((member) => {
                res.redirect('/');
            })
    }
    async getupdate(req, res, next) {
        let member = await Member.findOne({ where: { id: req.params.id } })
        res.render('member_index', { member: member });
    }
    async putupdate(req, res, next) {
        let update_body = {

        }
        let member = await Member.update({ where: { id: req.params.id } })
        res.render('member_index', { member: member });
    }
}