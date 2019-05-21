function ensureAuthenticated(req, res, next){
  console.log(req.isAuthenticated())
  if(req.isAuthenticated()){
    return next();
  } else {
    // req.flash('error_msg', 'you are not logged in')
    res.redirect('/')
  }
}

module.exports = ensureAuthenticated