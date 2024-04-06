const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  phone_number: {
    type: String,
  },
  facebook_id: {
    type: String,
  },
  google_id: {
    type: String,
  },
  avatar: {
    type: String,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});
const User = mongoose.model("users", userSchema);

module.exports = User;
