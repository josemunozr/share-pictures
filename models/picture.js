var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var picture_schema = new Schema({
  title : { type: String, required: true },
  creator: { type: Schema.Types.ObjectId , ref: "User"}
})

var Picture = mongoose.model("Picture", picture_schema);

module.exports = Picture;