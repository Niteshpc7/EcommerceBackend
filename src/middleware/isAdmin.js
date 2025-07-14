const jwt = require('jsonwebtoken');
const User = require('../model/user');

require('dotenv').config();

const isAdmin = async (req,res,next) =>{
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({msg:"No token provided"})
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        const user = await User.findById(decoded.id || decoded._id);
        

        if (!user || user.role !== "admin") {
            return res.status(403).json({msg: "Access denied: Admin only"});
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({msg : "Invalid token"})
    }
};

module.exports = isAdmin;
