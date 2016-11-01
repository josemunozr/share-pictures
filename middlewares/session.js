var user = require("../models/user");

var User = user.User;

module.exports = function (req, res, next) {
  if(!req.session.user_id){
    res.redirect("/singin");
  }else {

    User.findById(req.session.user_id, function (err, user) {
      if (err) {
        console.log(err);
        res.redirect("/singin");
      }else {
        res.locals = { user: user };
        next();
      }
    })
  }
}