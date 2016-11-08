var express = require("express");
var Picture = require("./models/picture");
var router = express.Router();

router.get("/", function (req, res) {
  res.render("app/home");
})

router.get("/pictures/new", function (req, res) {
  res.render("app/pictures/new")
});

router.get("/pictures/:id/edit", function (req, res) {

});

router.route("/pictures/:id")
  .get(function (req, res) {
    Picture.findById(req.params.id, function (err, picture) {
      res.render("app/pictures/show",{picture: picture});
    })
  })
  .put(function (req, res) {

  })
  .delete(function (req, res) {

  });

router.route("/pictures")
  .get(function (req, res) {

  })
  .post(function (req, res) {
    var picture = new Picture({
      title : req.body.title
    })

    picture.save(function (err) {
      if (!err) {
        res.redirect("/app/pictures/" + picture._id);
      }else {
        res.render(err);
      }
    })
  });

module.exports = router;