var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var user_schema = new Schema({
  email: String,
  username: String,
  password: String,
  age: Number,
  email: String,
  date_of_birth: Date
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