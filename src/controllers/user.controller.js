const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// generate jwt token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

// register new user 
// POST /api/users/register
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // check if user exists
        const userExists = await userModel.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" })
        }

        // password hased
        const hashPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            name,
            email,
            password: hashPassword,
            role: role || 'student'
        })

        if (user) {
            res.status(201).json({
                message: "User registered successfully",
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            })
        }
    } catch (error) {
        res.status(500).json(error.message);
    }
}

// login user
// POST /api/users/login
const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        // check password match
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        res.status(201).json({
            message: "User logged in successfully",
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        })
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}

module.exports = {registerUser, loginUser}