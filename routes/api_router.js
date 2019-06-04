const express = require('express');
const router = express.Router();
const oauth = require("../app/middleware/oauth")

router.post('/oauth/token', oauth.tokenHandler);

router.use(oauth.authenticateHandler)

router.get("/get", function (req, res, next) {
    console.log(res.locals.oauth)
    res.json({ "info": res.locals.oauth })
})

module.exports = router;

