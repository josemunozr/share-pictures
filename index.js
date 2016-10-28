var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var app = express();

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/pictures")

var user_schema = new Schema({
  email: String,
  password: String
})

var User = mongoose.model("User", user_schema);

app.use("/app",express.static("public"))
app.use(bodyParser.json()) // para peticiones application/json
app.use(bodyParser.urlencoded({extended: true}))

app.set("view engine","jade");

app.get("/", function (req, res) {
  res.render("index");
})

app.get("/login", function (req, res) {
  User.find(function (err, doc){
    console.log(doc)
    res.render("login")
  })


})

app.post("/users", function (req, res) {
  
  var user = new User({email: req.body.email, password: req.body.password});

  user.save(function () {
    res.send("Datos recibidos")
  })

})

app.listen(8080, function () {
  console.log("listen server at http://localhost:8080/")
});