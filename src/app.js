const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const complaintRoutes = require('./routes/complaint.routes');



const app = express();

// middleware
app.use(cors({
  origin: [
    'https://college-complaint-system-frontend.vercel.app',  
    'http://localhost:5173'               
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
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
