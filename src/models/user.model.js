const mongoose = require('mongoose');

const userSchema =  new mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim: true
    },
    email:{
        type:String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    password:{
        type:String,
        required: true,
        minlength: 6
    },
    role:{
        type: String,
        enum: ['student', 'admin'],
        default: "student"
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

const userModel = mongoose.model("user", userSchema);

module.exports = userModel
