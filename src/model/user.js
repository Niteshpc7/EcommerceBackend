const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username:{
      type:String,
      required:true,
      unique:true,
      trim:true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    resetToken: String,
    tokenExpire: Date,

    otp: {
      type: String
    },
    otpExpiresAt:{
      type:Date
    },
    otpVerified: {
      type: Boolean,
      default: false
    },
    // role field 
    role: {
      type: String,
      enum: ["user", "admin", "seller"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
