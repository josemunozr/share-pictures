var express = require("express");
var Picture = require("./models/picture");
var finder_picture_middlewares = require("./middlewares/finder-picture");
var router = express.Router();

router.get("/", function (req, res) {
  res.render("app/home");
})

router.get("/pictures/new", function (req, res) {
  res.render("app/pictures/new")
});

router.all("/pictures/:id*", finder_picture_middlewares);

router.get("/pictures/:id/edit", function (req, res) {
  res.render("app/pictures/edit");
});

router.route("/pictures/:id")
  .get(function (req, res) {
    res.render("app/pictures/show");
  })
  .put(function (req, res) {
    res.locals.picture.title = req.body.title;
    res.locals.picture.save(function (err) {
      if(!err){
        res.render("app/pictures/show");
      }else {
        res.render("app/picture/" + req.params.id + "/edit");
      }
    });
  })
  .delete(function (req, res) {
    Picture.findOneAndRemove({_id: req.params.id}, function (err, picture) {
      if(err){
        console.log(err);
        res.redirect("/app/pictures/" + req.params.id);
      }else{
        res.redirect("/app/pictures/");
      }
    })
  });

router.route("/pictures")
  .get(function (req, res) {
    Picture.find({ creator: res.locals.user._id }, function (err, pictures) {
      if(err) {res.redirect("/app"); return; }
      res.render("app/pictures/index", {pictures : pictures});
    })
  })
  .post(function (req, res) {
    var picture = new Picture({
      title : req.body.title,
      creator: res.locals.user._id
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