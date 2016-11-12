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
  Picture.findById(req.params.id, function (err, picture) {
      res.render("app/pictures/edit",{picture: picture});
    })
});

router.route("/pictures/:id")
  .get(function (req, res) {
    Picture.findById(req.params.id, function (err, picture) {
      res.render("app/pictures/show",{picture: picture});
    })
  })
  .put(function (req, res) {
     Picture.findById(req.params.id, function (err, picture) {
      picture.title = req.body.title;
      picture.save(function (err) {
        if(!err){
          res.render("app/pictures/show", {picture : picture});
        }else {
          res.render("app/picture/" + picture._id + "/edit", {picture : picture});
        }
      });

    })
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
    Picture.find({}, function (err, pictures) {
      if(err) {res.redirect("/app"); return; }
      res.render("app/pictures/index", {pictures : pictures});
    })
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