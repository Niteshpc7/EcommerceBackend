function generateOtp() {
// generate otp for send email thankyou
  return Math.floor(100000 + Math.random() * 900000).toString();

}

module.exports = generateOtp;