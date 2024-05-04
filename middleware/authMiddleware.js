const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
    
        if(token){
            try {
                const decoded = jwt.verify(token, process.env.JWT_KEY);
                req.user = await User.findOne({ username });
                next();
            } catch (error) {
                res.status(401).json({ message: "Invalid token, unauthorized access" });
            }
        }else{
            res.status(401).json({ message: "No token, unauthorized access" });
        }
    } catch (error) {
        
    }
}

module.exports = authMiddleware;