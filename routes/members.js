var express = require('express');
var router = express.Router();
var member_controller = require(`${global.appRoot}/app/controller/member_controller`)
var auth = require(`${global.appRoot}/app/middleware/auth`)

const MemberController = new member_controller
router.use(auth)

router.get('/', MemberController.index)

router.get('/member/create', MemberController.getcreate)

router.post('/member/create', MemberController.postcreate)

router.get('/member/update/:id', MemberController.getupdate)

router.put('/member/update/:id', MemberController.putupdate)

// router.delete('/member/delete', MemberController.delete)

module.exports = router;


// function ensureAuthenticated(req, res, next){
//   if(req.isAuthenticated()){
//     console.log("1")
//     return next();
//   } else {
//     console.log("2")
//     // req.flash('error_msg', 'you are not logged in')
//     res.redirect('/')
//   }
// }