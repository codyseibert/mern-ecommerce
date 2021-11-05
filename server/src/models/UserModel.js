const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  password: String,
  role: String,
});

const UserModel = mongoose.model("User", UserSchema);

exports.UserModel = UserModel;
