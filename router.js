var express = require("express");
var fs = require("fs");
var redis = require("redis");
var Picture = require("./models/picture");
var finder_picture_middlewares = require("./middlewares/finder-picture");
var router = express.Router();

var client = redis.createClient();

router.get("/", function (req, res) {
  Picture.find({})
    .populate("creator")
    .exec(function (err, pictures) {
      if(err) { console.log(err)}
      res.render("app/home", {pictures: pictures});
    })
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
    var extension = req.files.file.name.split(".").pop();

    var picture = new Picture({
      title : req.fields.title,
      creator: res.locals.user._id,
      extension: extension
    })

    picture.save(function (err) {
      if (!err) {

        var pictJson = {
          "id": picture._id,
          "title": picture.title,
          "extension": picture.extension
        }

        client.publish("pictures", JSON.stringify(pictJson));
        fs.rename(req.files.file.path, "public/imgs/" + picture._id + "." + extension);
        res.redirect("/app/pictures/" + picture._id);
      }else {
        res.render(err);
      }
    })
  });

router.route("/close")
  .get(function (req, res) {
    req.session.user_id = undefined;

    res.redirect("/singin");
  })
module.exports = router;