const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  verifyCode: {type: String, required: false}
}, {timestamps: true});

const UserModel = mongoose.model("users", userSchema);
module.exports = UserModel;