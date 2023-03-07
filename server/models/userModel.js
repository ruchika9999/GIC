const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "please add the first name"],
    },
    lastName: {
      type: String,
      required: [true, "please add the last name"],
    },
    email: {
      type: String,
      required: [true, "please add the email"],
      unique: [true, "Email address already taken"],
    },
    password: {
      type: String,
      required: [true, "please add the password"],
    },
    roles: {
      type: Array,
      required: [true],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
