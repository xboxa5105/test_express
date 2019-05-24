const Member = require(`../model/member`)

module.exports = MemberController = {
    index: async function(req, res, next) {
        let members = await Member.findAll()
        console.log(res.locals)
        res.render('member_index', { members: members });
    },
    getcreate: async function(req, res, next) {
        res.render('member_create');
    },
    postcreate: async function(req, res, next) {
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
    },
    getupdate: async function(req, res, next) {
        let member = await Member.findOne({ where: { id: req.params.id } })
        res.render('member_update', { member: member, current : req.params.id });
    },
    putupdate: async function(req, res, next) {
        let update_body = {
            username: req.body.membername,
            gender: req.body.selectgender,
            birth: req.body.year,
        }
        let member = await Member.update(update_body, { where: { id: req.params.id } })
        res.redirect('/');
    },
    delete: async function(req, res, next) {
        let member = await Member.destroy({ where: { id: req.params.id } })
        res.redirect('/');
    }
}