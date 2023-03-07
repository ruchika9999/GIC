const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "please add the first name"],
    },
    lastName: {
      type: String,
      required: [true, "please add the last name"],
    },
    gender: {
      type: String,
      required: [true, "please add the gender"],
    },
    mobile: {
      type: String,
      required: [true, "please add the mobile"],
    },
    joinedDate: {
      type: Date,
      required: [true, "please add the joined date"],
    },
    email: {
      type: String,
      required: [true, "please add the email"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Employees", employeeSchema);
