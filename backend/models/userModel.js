const mongoose = require('mongoose');

// Define a schema for user registration
const userRegistrationSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    password: { type: String }
}, { timestamps: true });  

 
module.exports  = mongoose.model("UserRegistration", userRegistrationSchema);

 
