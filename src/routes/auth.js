
const express = require("express");
const router = express.Router();
const { signup, login,logout} = require("../controllers/authController");

// login signup aur forgot password apis
router.post("/signup", signup);
router.post("/login", login);
// logout routes====================================================================================
router.post("/logout", logout);
// router.post('/logOut',logout);

module.exports = router;