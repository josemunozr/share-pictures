var express = require("express");
var mongoose = require("mongoose");
var session = require("express-session");
var methodOverride = require("method-override");
var formidable = require("express-formidable");
var user = require("./models/user");
var router = require("./router");
var session_mdl = require("./middlewares/session");
var RedisStore = require("connect-redis")(session);
var http = require("http");
var realtime = require("./realtime");

var sessionMiddleware = session({
  store: new RedisStore({}),
  secret: "Super M3ga Pass!!!"
})

var app = express();
var server = http.Server(app);
var User = user.User;

realtime(server,sessionMiddleware);

mongoose.connect("mongodb://localhost/pictures")

app.use("/public", express.static("public"))
app.use(methodOverride("_method"));
app.use(formidable());

app.use(sessionMiddleware);

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
    email: req.fields.email, 
    password: req.fields.password,
    password_confirmation: req.fields.passwordConfirmation,
    username: req.fields.username
  });

  user.save()
      .then(function (doc) {
        res.send("usuario creado correctamente");
      }, function (err) {
        if (err) res.send("Error al guardar tus datos: " + err.message)
      })
})

app.post("/session", function (req, res) {
 
  User.findOne({email: req.fields.email, password: req.fields.password}, function (err, user) {
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

server.listen(8080, function () {
  console.log("listen server at http://localhost:8080/");
});