const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');


// protect rotes to check user logged in or not
const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && 
        req.headers.authorization.startsWith('Bearer')) {
        try {
            // get token
            token = req.headers.authorization.split(' ')[1];

            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // get user from token without password
            req.user = await userModel.findById(decoded.id).select('-password');

            next();   // access to go to the next route

        } catch (error) {
            res.status(401).json({ message: "Not authorized, no token" })

        }
    }

    if (!token) {
        res.status(401).json({ message: "Not authorized, no token" })
    }
}

// only admin access to update complaints
const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: "Access denied, Admin only" })
    }
}


module.exports = { protect, admin }