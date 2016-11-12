var Picture = require("../models/picture");

module.exports = function (req, res, next) {
  Picture.findById(req.params.id, function (err, picture) {
    if(!err){
      res.locals.picture = picture;
      next();
    }else {
      console.log(err);
      res.redirect("/app");
    }
  });
}