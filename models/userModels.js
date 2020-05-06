var mongoose = require("../config/dbConnect");
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    username: String,
    password: String,
    age: Number,
    address: String
},{
  collection: "userTables"
});

var UserModel = mongoose.model("userTables",UserSchema);
module.exports= UserModel;