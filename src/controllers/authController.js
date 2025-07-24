const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
// SIGNUP codes
exports.signup = async (req, res) => {
  const { name, username, email, password, role } = req.body;

  try {
    const cleanEmail = email.toLowerCase().trim();

    const userExists = await User.findOne({ email: cleanEmail });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    // hashPassword
    const hash = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      username,
      email: cleanEmail,
      password: hash,
      role
    });

    await user.save();
    if (role === "admin") {
      res.status(201).json({ message: "Signup successful as Admin" });
    } else if (role === "seller") {
      res.status(201).json({ message: "Signup successful as Seller" });
    } else {
      res.status(201).json({ message: "Signup successful user" });
    }
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  const email = req.body.email.toLowerCase().trim();
  const { password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid Email" });



    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid Password" });
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
         role:user.role
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.logout = (req, res) => {
  try {
    // Invalidate the token by removing it from the client side
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Server error" });
  }
} 
