const { validationResult } = require('express-validator/check');
const errorFormatter = require(`../middleware/validator_error`)
const Member = require(`../model/member`)

module.exports = MemberController = {
    index: async function (req, res, next) {
        let members = await Member.findAll()
        console.log(res.locals)
        res.render('member_index', { members: members });
    },
    getcreate: async function (req, res, next) {
        res.render('member_create');
    },
    postcreate: async function (req, res, next) {
        let errors = validationResult(req).formatWith(errorFormatter);
        if (!errors.isEmpty()) {
            // console.log(errors.array());
            return res.status(422).json({ errors: errors.array() });
        }
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
    getupdate: async function (req, res, next) {
        let member = await Member.findOne({ where: { id: req.params.id } })
        res.render('member_update', { member: member, current: req.params.id });
    },
    putupdate: async function (req, res, next) {
        console.log(req.body);

        let member = await Member.findOne({ where: { id: req.params.id } })
        let req_membername
        let req_selectgender
        let req_birth
        if (req.body.membername !== null && req.body.membername !== '') {
            req_membername = req.body.membername
        } else {
            req_membername = member.username
        }
        if (req.body.selectgender !== null && req.body.selectgender !== '') {
            req_selectgender = req.body.selectgender
        } else {
            req_selectgender = member.gender
        }
        if (req.body.year !== null && req.body.year !== '') {
            req_birth = req.body.year
        } else {
            req_birth = member.birth
        }
        let update_body = {
            username: req_membername,
            gender: req_selectgender,
            birth: req_birth,
        }
        await member.update(update_body)
        res.redirect('/');
    },
    delete: async function (req, res, next) {
        await Member.destroy({ where: { id: req.params.id } })
        res.redirect('/');
    }
}