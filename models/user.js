var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var user_schema = new Schema({
  email: {type: String, required: "El email es obligatorio", match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Ingresa mail correcto"]},
  username: {type: String, required: true, maxlength: [50, "Username muy extenso"]},
  password: {type: String, required: true, minlength: [8, "Password muy corto"]},
  age: {type: Number, min: [17, "Edad minima permitida 17 años"]},
  date_of_birth: Date,
  sex: {type: String, enum:{ values: ["M", "F"], message: "Opción invalida"}}
});

user_schema.virtual("password_confirmation")
  .get(function () {
    return this.passConfirm;
  })
  .set(function (pwd) {
    this.passConfirm = pwd;
  })

var User = mongoose.model("User", user_schema);

module.exports.User = User;