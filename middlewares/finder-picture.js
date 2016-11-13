var Picture = require("../models/picture");

module.exports = function (req, res, next) {
  Picture.findById(req.params.id)
    .populate("creator")
    .exec(function (err, picture) {
      if(picture){
        res.locals.picture = picture;
        next();
      }else {
        console.log(err);
        res.redirect("/app");
      }
  })
}