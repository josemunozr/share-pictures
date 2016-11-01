var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var user = require("./models/user");

var app = express();
var User = user.User;

mongoose.connect("mongodb://localhost/pictures")


app.use("/app",express.static("public"))
app.use(bodyParser.json()) // para peticiones application/json
app.use(bodyParser.urlencoded({extended: true}))

app.set("view engine","jade");

app.get("/", function (req, res) {
  res.render("index");
})

app.get("/login", function (req, res) {
  res.render("login")
})

app.post("/users", function (req, res) {
  
  var user = new User({
    email: req.body.email, 
    password: req.body.password,
    password_confirmation: req.body.passwordConfirmation,
    username: req.body.username
  });

  user.save()
      .then(function (doc) {
        res.send("usuario creado correctamente");
      }, function (err) {
        if (err) res.send("Error al guardar tus datos: " + err.message)
      })

  User.find(function (err, doc){
    console.log(doc)
  })


})

app.listen(8080, function () {
  console.log("listen server at http://localhost:8080/")
});