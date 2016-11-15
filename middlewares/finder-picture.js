var Picture = require("../models/picture");
var owner_picture = require("./picture-permison");

module.exports = function (req, res, next) {
  Picture.findById(req.params.id)
    .populate("creator")
    .exec(function (err, picture) {
      if(picture && owner_picture(picture, req, res)){
        res.locals.picture = picture;
        next();
      }else {
        console.log(err);
        res.redirect("/app");
      }
  })
} 