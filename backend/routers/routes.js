const express = require("express");
const { register, login } = require("../controllers/userControllers");
const { getTopSales, addSales, todaySalesRevenue } = require("../controllers/salesControllers");
const router = express.Router();

//user route
router.post('/registration', register);
router.post('/login', login);

//sales route
router.post('/products', addSales);
router.get('/products', getTopSales);
router.get('/products/revenue', todaySalesRevenue);




module.exports = router;