const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const complaintRoutes = require('./routes/complaint.routes');



const app = express();

// middleware
app.use(cors());
app.use(express.json());


// test route
app.get('/', (req, res)=>{
    res.json({message: "College complaint management system API is running..."})
})


// POST routes  (for login & register)
// /api/users/
app.use("/api/users", userRoutes);

// POST routes
// for complaints 
app.use("/api/complaints", complaintRoutes);


module.exports = app
