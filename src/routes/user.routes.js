const express = require('express');
const router= express.Router();
const userController = require('../controllers/user.controller');
const {protect, admin} = require("../middleware/auth");


// register route
router.post("/register", userController.registerUser);

// login route
router.post("/login", userController.loginUser);

router.get('/students', protect, admin, async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).select('-password');
    
    if (!students || students.length === 0) {
      return res.json({ message: 'No students found' });
    }

    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router