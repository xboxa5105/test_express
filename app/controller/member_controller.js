const { validationResult } = require('express-validator/check');
const errorFormatter = require(`../middleware/validator_error`)
const Model = require(`../model`)

module.exports = MemberController = {
    index: async function (req, res, next) {
        try {
            let members = await Model.Member.findAll()
            console.log(res.locals)
            res.render('member_index', { members: members });
        } catch (e) {
            console.log("MemberController index : ", e);
            res.status(400).json({ errors: "Members Get has Error" });
        }
    },
    getcreate: async function (req, res, next) {
        res.render('member_create');
    },
    postcreate: async function (req, res, next) {
        try {
            let errors = validationResult(req).formatWith(errorFormatter);
            if (!errors.isEmpty()) {
                console.log("MemberController postcreate validation : ", errors.array());
                return res.status(422).json({ errors: errors.array() });
            }
            let req_body = {
                username: req.body.membername,
                gender: req.body.selectgender,
                birth: req.body.year,
            }
            await Model.Member.create(req_body)
            res.redirect('/');
        } catch (e) {
            console.log("MemberController postcreate : ", e);
            if (e.message == "Validation error") {
                res.status(400).json({ errors: e.errors[0].message });
            } else {
                res.status(400).json({ errors: "Member Create has Error" });
            }
        }
    },
    getupdate: async function (req, res, next) {
        try {
            let member = await Model.Member.findOne({ where: { id: req.params.id } })
            res.render('member_update', { member: member, current: req.params.id });
        } catch (e) {
            console.log("MemberController getupdate : ", e);            
            res.status(400).json({ errors: "Member Get has Error" });
        }
    },
    putupdate: async function (req, res, next) {
        try {
            let member = await Model.Member.findOne({ where: { id: req.params.id } })
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
            await Model.Member.update(update_body)
            res.redirect('/');
        } catch (e) {
            console.log("MemberController putupdate : ", e); 
            if (e.message == "Validation error") {
                res.status(400).json({ errors: e.errors[0].message });
            } else {
                res.status(400).json({ errors: "Member Update has Error" });
            }
        }
    },
    delete: async function (req, res, next) {
        try {
            await Model.Member.destroy({ where: { id: req.params.id } })
            res.redirect('/');
        } catch (e) {
            console.log("MemberController delete : ", e); 
            res.status(400).json({ errors: "Member Delete has Error" });
        }
    }
}