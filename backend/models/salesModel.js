const mongoose = require('mongoose');

// Define   Schema, considering it represents sales data
const salesSchema = new mongoose.Schema({
  salesId: { type: String }, 
  productName: { type: String }, 
  quantity: { type: Number },  
  amount: { type: Number }  
}, { timestamps: true }); 
 
module.exports = mongoose.model("Sales", salesSchema);
