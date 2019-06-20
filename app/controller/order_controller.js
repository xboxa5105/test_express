// const { validationResult } = require('express-validator/check');
// const passport = require('passport')
// const LocalStrategy = require('passport-local').Strategy
// const errorFormatter = require(`../middleware/validator_error`)
const Model = require(`../model`)

module.exports = {
    index: async function (req, res) {

        res.json()
    },
    get: async function (req, res) {
        try {
            let order = await Model.Order.findOne({ where: { order_id: req.query.id } })
            let row_members = await order.getOrderMembers()
            let members = row_members.map(item => {
                return item.dataValues.member
            })
            let row_events = await order.getOrderEvents()
            let events = row_events.map(item => {
                return item.dataValues.event
            })
            res.json({
                "order_id": order.dataValues.order_id,
                'members': members,
                "order_events": events,
                "created_at": order.dataValues.createdAt
            })
        } catch (e) {
            console.error({ error: e.message });
            res.json({ error: e.message })
        }
    },
    post: async function (req, res) {
        try {
            let data = await Model.Order.create()
            res.json({
                "order_id": data.order_id,
                "created_at": data.createdAt
            })
        } catch (e) {
            console.error({ error: e.message });
            res.json({ error: e.message })
        }
    },
    add_event: async function (req, res) {
        try {
            let order = await Model.Order.findOne({ where: { order_id: req.query.id } })
            req.body.event.forEach(async (item) => {
                await order.createOrderEvent({ event: item })
            })
            let row_events = await order.getOrderEvents()
            let events = row_events.map(item => {
                return item.dataValues.event
            })
            res.json({
                "order_id": order.dataValues.order_id,
                "order_events": events,
                "created_at": order.createdAt
            })
        } catch (e) {
            console.error({ error: e.message });
            res.json({ error: e.message })
        }
    },
    add_member: async function (req, res) {
        try {
            let order = await Model.OrderMember.findOne({ where: { order_id: req.query.id } })
            let member = await order.createOrderMember({ member: req.body.member })
            // let row_members = await order.getOrderMembers()
            // let members = row_members.map(item => {
            //     return item.dataValues.member
            // })
            res.json({
                "order_id": order.dataValues.order_id,
                'members': member.dataValues.member,
                "created_at": order.createdAt
            })
        } catch (e) {
            console.error({ error: e.message });
            res.json({ error: e.message })
        }
    },
    delete_event: async function (req, res) {
        try {
            let order = await Model.Order.destroy({ where: { order_id: req.query.id } })
            req.body.event.forEach(async (item) => {
                await order.createOrderEvent({ event: item })
            })
            let row_events = await order.getOrderEvents()
            let events = row_events.map(item => {
                return item.dataValues.event
            })
            res.json({
                "order_id": order.dataValues.order_id,
                "order_events": events,
                "created_at": order.createdAt
            })
        } catch (e) {
            console.error({ error: e.message });
            res.json({ error: e.message })
        }
    },
}