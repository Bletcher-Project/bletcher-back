/* 
  is SignIn : req.isAuthenticated() = true
  not SignIn : req.isAuthenticated () = false
*/

exports.isSignIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send("Need Sign In");
  }
};

exports.isNotSignIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/");
  }
};
