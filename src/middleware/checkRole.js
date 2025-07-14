module.exports = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            console.log(req.user.role);
            return res.status(403).json({ message: `only ${role} can perform this action` });
        }
        next();
    };
}