const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const generateOtp = require('../utils/generateOtp');
const User = require('../model/user');
const sendEmail = require('../utils/sendEmail');

// Forgot Password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const cleanEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: cleanEmail });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const otp = generateOtp();
    user.otp = otp;
    user.otpVerified = false;
    user.otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000)

    await user.save();
    await sendEmail(cleanEmail,
      "Faatse.com Pvt Ltd",
       `Your One-Time-Password(OTP) is:${otp}.
        This OTP is confidential and valid for the next 10 minutes.
        Please do not share it with anyone `

    );

    res.json({ msg: 'OTP sent to your email' });
  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ msg: 'Failed to process request' });
  }
};

// Verify OTP
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const cleanEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: cleanEmail });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (!user.otp || !user.otpExpiresAt) {
      return res.status(400).json({ msg: 'No OTP requested for this user' });
    }

    if(user.otpExpiresAt < Date.now()){
      return res.status(400).json({msg: "Otp expired"})    }

    if (String(user.otp) !== String(otp)) {
      return res.status(400).json({ msg: 'Invalid OTP' });
    }

    const token = jwt.sign({email: user.email},process.env.JWT_SECRET,
      {expiresIn: "10m"}
    )
    user.otp = undefined;
    user.otpExpiresAt = undefined
    await user.save();


    res.json({ msg: 'OTP verified successfully' , token});
  } catch (err) {
    console.error('Verify OTP error:', err);
    res.status(500).json({ msg: 'Failed to verify OTP' });
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
      return res.status(401).json({msg: "Authorization token missing"});
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);


    const user = await User.findOne({ email: decoded.email.toLowerCase() });


    if(!user) {
      return res.status(404).json({msg: "User not found"});
    }

    const { newPassword } = req.body;

    user.password = await bcrypt.hash(newPassword, 10);

    await user.save();

    res.json({ msg: "Password reset successfully" });

  } catch (err) {
    if(err.name === "TokenExpiredError"){
      return res.status(401).json({msg: "Token Expired"});
    }
    console.error('Reset password error:', err);
    res.status(500).json({ msg: 'Failed to reset password' });
  }
};



module.exports = {
  forgotPassword,
  verifyOtp,
  resetPassword
};
