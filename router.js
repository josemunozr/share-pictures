var express = require("express");

var router = express.Router();

router.get("/", function (req, res) {
  res.render("app/home");
})

router.get("/pictures/new", function (req, res) {
  res.render("app/pictures/new")
});

router.get("/pictures/:id/edit", function (req, res) {

});

router.route("pictures/:id")
  .get(function (req, res) {

  })
  .put(function (req, res) {

  })
  .delete(function (req, res) {

  });

router.route("pictures")
  .get(function (req, res) {

  })
  .post(function (req, res) {

  });

module.exports = router;