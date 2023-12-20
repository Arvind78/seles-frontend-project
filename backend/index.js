// Import necessary modules and libraries
const express = require("express"); 
const cors = require("cors");  
const router = require("./routers/routes"); 
const dbConnection = require("./config/dbConnection");
const connectToDB = require("./config/dbConnection");         
const dotenv = require("dotenv").config();   

// Initialize Express app
const app = express();

// Middleware setup
app.use(cors()); 
app.use(express.json());  
app.use("/api", router);

// Error handling middleware
app.use((err, req, res, next) => {
    const status = err.status || 500;  
    const message = err.message || "Internal Server Error!";  
    res.status(status).json({ message });
});

// Start the server
app.listen(process.env.PORT, () => {
  connectToDB(); // Connect to the database
    console.log(`Server Running Port ${process.env.PORT}`); 
});




