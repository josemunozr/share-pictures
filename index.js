var express = require("express");
var bodyParser = require("body-parser")

var app = express();

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
  console.log("Email: " + req.body.email)
  console.log("Pass: " + req.body.password)

  res.send("Datos recibidos")
})

app.listen(8080, function () {
  console.log("listen server at http://localhost:8080/")
});