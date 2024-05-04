const User = require('../model/userModel');
const generateToken = require('../utils/generateToken');

const userController = {
    register: async (req, res) => {
        try {
            const { username } = req.body;
            const userExists = await User.findOne({username});
            if(userExists) return res.json({ message: "User already exists, please login with the account" });
            const response = await User.create(req.body);
            await generateToken(res, response._id);
            res.status(201).json({ message: "User created successfully", data: response });
        } catch (error) {
            res.status(500).json({ message: "Internal server error", error});
        }
    },
    login: async (req, res) => {
        try {
            const { username, password } = req.body;
            const userExists = await User.findOne({username});
            if(!userExists) return res.status(404).json({ message: "User account does not exist, please register your account"});
            if( userExists && (await userExists.matchPassword(password))){
                await generateToken(res, userExists._id);
                return res.status(200).json({ message: "User authenticated successfully" })
            }else{
                return res.status(401).json({ message: "Invalid credentials" });
            }
        } catch (error) {
            res.status(500).json({ message: "Internal server error", error});
        }
    }
}

module.exports = userController;