const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    default: "general",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  resetToken: { type: String, default: null },
  resetTokenExpiry: { type: Date, default: null },
});
module.exports = mongoose.model("user", userSchema);
