var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var session = require("express-session");
var user = require("./models/user");
var router = require("./router");
var session_mdl = require("./middlewares/session");

var app = express();
var User = user.User;

mongoose.connect("mongodb://localhost/pictures")


app.use("/public", express.static("public"))
app.use(bodyParser.json()) // para peticiones application/json
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({
  secret: "asdfso7y3948gfdjbn42",
  resave: false,
  saveUninitialized: false
}))



app.set("view engine","jade");

app.get("/", function (req, res) {
  res.render("index");
})

app.get("/singin", function (req, res) {
  res.render("singin")
})

app.get("/singup", function (req, res) {
  res.render("singup")
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
})

app.post("/session", function (req, res) {
  
  User.findOne({email: req.body.email, password: req.body.password}, function (err, user) {
    if (err) res.send(String(err));
    if (user) {
      req.session.user_id = user._id;
      res.redirect("/app");
    }else {
      res.send("Usuario o contraseña incorrectos");
    }
  })
})


app.use("/app", session_mdl);
app.use("/app", router);

app.listen(8080, function () {
  console.log("listen server at http://localhost:8080/");
});