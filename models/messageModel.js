var mongoose = require("../config/dbConnect");
var Schema = mongoose.Schema;
var messageSchema = new Schema({
  content:String,
  time:Number
},{
  collection: "message"
});

var messageModel = mongoose.model("message",messageSchema);
module.exports = messageModel;