const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    department: {
        type: String,
        required: true,
        enum: ['BCA', 'BTECH', 'MCA', 'Other']
    },
    category: {
        type: String,
        required: true,
        enum: ['Academics', 'Infrastructure', 'Faculty', 'Hostel', 'Sanitation', 'Other']
    },
    description: {
        type: String,
        required: true,
    },
    uri: {
        type: String,
        required: false
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Resolved'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

const complaintModel = mongoose.model('complaint', complaintSchema);

module.exports = complaintModel