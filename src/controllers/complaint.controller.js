const complaintModel = require('../models/complaint.model');
const { uploadFile } = require("../services/storage.service");


// create new complaint (only student)
// POST /api/complaints
const createComplaint = async (req, res) => {
    try {
         
        const { title, department, category, description } = req.body;

        let uri = '';
        if (req.file) {
            const result = await uploadFile(req.file.buffer.toString('base64'));
            uri = result.url;
        }

        const complaint = await complaintModel.create({
            student: req.user._id,  //logged in user ki id
            title,
            department,
            category,
            description,
            uri
        })

        res.status(201).json({
            message: "Complaint created successfully",
            complaint
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


// get all complaints (only admin)
// GET /api/complaints/all
const getAllComplaints = async (req, res) => {
    try {
        const complaints = await complaintModel.find().populate('student', 'name email department').sort({ createdAt: -1 });

        if (complaints.length === 0) {
            return res.json({ message: "No complaints yet", complaints })
        }

        res.status(201).json(complaints);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


// get logged in students complaints (only student)
// GET /api/complaints/my
const getMyComplaints = async (req, res) => {
    try {
        const complaints = await complaintModel.find({ student: req.user._id }).sort({ createdAt: -1 });

        if (complaints.length === 0) {
            return res.json({ message: "No complaints yet", complaints })
        }

        res.status(201).json(complaints);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// update complaints status (only admin)
// PUT /api/complaints/:id
const updateComplaint = async (req, res) => {
    try {
        const { status } = req.body;

        const complaint = await complaintModel.findById(req.params.id);

        if (!complaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }

        complaint.status = status;
        complaint.updatedAt = Date.now();

        const updatedComplaint = await complaint.save();

        res.json(updatedComplaint);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


// delete complaint (only admin)
// DELETE /api/complaints/:id
const deleteComplaint = async (req, res) => {
    try {
        const complaint = await complaintModel.findById(req.params.id);

        if (!complaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }

        if (complaint.status !== 'Resolved')
            return res.status(400).json({ message: 'Only Resolved complaints can be deleted' });

        await complaint.deleteOne();

        res.json({ message: "Complaint deleted successfully" })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    createComplaint,
    getAllComplaints,
    getMyComplaints,
    updateComplaint,
    deleteComplaint
}