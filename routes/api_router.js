const express = require('express');
const router = express.Router();
const oauth = require("../app/middleware/oauth")
const Controller = require('../app/controller')

router.post('/oauth/token', oauth.tokenHandler);

// router.use(oauth.authenticateHandler)

router.get("/get", function (req, res) {
    console.warn(res.locals.oauth)
    res.json({ "info": res.locals.oauth })
})

router.get('/order', Controller.OrderController.get)
router.post('/order', Controller.OrderController.post)
router.post('/order/event', Controller.OrderController.add_event)
router.post('/order/member', Controller.OrderController.add_member)
// router.put('/order', Controller.OrderController)
// router.delete('/order', Controller.OrderController)

module.exports = router;

