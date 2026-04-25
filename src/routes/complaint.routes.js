const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({
    storage: multer.memoryStorage()
})

const {createComplaint,
    getAllComplaints,
    getMyComplaints,
    updateComplaint,
    deleteComplaint} = require('../controllers/complaint.controller');

const {protect, admin} = require("../middleware/auth");





// student routes
router.post("/", protect, upload.single("photo"), createComplaint);
router.get("/my", protect, getMyComplaints);

// admin routes
router.get("/all", protect, admin, getAllComplaints);
router.put("/:id", protect, admin, updateComplaint);
router.delete("/:id", protect, admin, deleteComplaint);



module.exports = router