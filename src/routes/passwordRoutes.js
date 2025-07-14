const express = require("express");
const router = express.Router();
const {   forgotPassword, verifyOtp, resetPassword } = require("../controllers/passwordController")
// routes for Passwords
router.post("/verify-otp",verifyOtp);
router.post("/forgotPassword", forgotPassword);
router.put("/resetPassword", resetPassword);

module.exports = router;