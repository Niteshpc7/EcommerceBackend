const jwt = require("jsonwebtoken");
const User = require('../model/user');
const protect = async(req, res, next) => {
  try {
    // check for Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized, token missing" });
    }

    // get token 
    const token = authHeader.split(" ")[1];

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { _id: decoded.id };
    const user = await User.findById(decoded.id);
    if(!user){
      return res.status(401).json({msg:" Authorization Failed ! user not found"});

    }
    req.user = user;

    next();
  } catch (err) {
    console.error("JWT auth error:", err);
    return res.status(401).json({ message: "Unauthorized, invalid token" });
  }
};

module.exports = protect;
