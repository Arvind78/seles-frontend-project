const salesModel = require("../models/salesModel");

const addSales = async (req, res, next) => {
    console.log(req.body);
    try {
        const newData = await salesModel.create({
            salesId:`S${Math.floor(Math.random() * 900) + 100}`,
            ...req.body
        })
        res.status(200).json({message:"Product add successfully !"})
    } catch (err) {
      next(err)
        
    }
}


const getTopSales = async (req, res, next) => {
    try {
       const sales = await salesModel.find({}).sort({amount:-1}).limit(5);
       if(!sales){
         return res.status(404).json({message:"data does not found !"});
       }
       res.status(200).json({sales});

    } catch (err) {
      next(err)
    }
}



const todaySalesRevenue = async (req, res, next) => {
    try {
        const today = new Date(); // Get today's date
    
console.log(today);
        const todaySales = await salesModel.aggregate([
            {
            $match: {
                $expr: {
                  $eq: [
                    { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    { $dateToString: { format: "%Y-%m-%d", date: today } }
                  ]
                }
              }
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$amount' } // Replace 'revenueField' with your actual field name
                }
            }
        ]);
console.log(todaySales);
        // Return the total sales revenue for today
        res.status(200).json({ todaySalesRevenue: todaySales.length > 0 ? todaySales[0].totalRevenue : 0 });
    } catch (err) {
        next(err);
    }
};



module.exports = {
    addSales,
    getTopSales,
    todaySalesRevenue

}



