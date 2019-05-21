var express = require('express');
var router = express.Router();
var member_controller = require(`${global.appRoot}/app/controller/member_controller`)
var auth = require(`${global.appRoot}/app/middleware/auth`)

const MemberController = new member_controller
// console.log("auth", auth);
// router.use(auth)

router.get('/', MemberController.index)

router.get('/edit', MemberController.index)

router.post('/edit', MemberController.index)

router.get('/create', MemberController.index)

router.post('/create', MemberController.index)

router.put('/', MemberController.index)

router.delete('/', MemberController.index)

module.exports = router;


function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    console.log("1")
    return next();
  } else {
    console.log("2")
    // req.flash('error_msg', 'you are not logged in')
    res.redirect('/')
  }
}