function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    // req.flash('error_msg', 'you are not logged in')
    res.redirect('/signin')
  }
}

module.exports = ensureAuthenticated