const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

const adminAuthMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(token){
            try {
                const decoded = jwt.verify(token, process.env.JWT_KEY);
                req.user = await User.findById(decoded.userId).select('-password');
                if(!req.user.isAdmin) return res.status(401).json({ message: "You are not authorized to make this action" });
                next();
            } catch (error) {
                res.status(401).json({ message: "Invalid token"})
            }
        }else{
            res.status(401).json({ message: "You are not authorized to access this resource, no token"});
        }
    } catch (error) {
        res.status(401).json({ message: "Internal server error"});
    }
}

module.exports = adminAuthMiddleware;