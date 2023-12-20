const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcypt = require("bcryptjs")

// Your registration logic here
const register = async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        password
    } = req.body;
    try {
        const existingUser = await userModel.findOne({
            email
        });
        if (existingUser) {
            return res.status(409).json({
                message: 'User already exists'
            });
        } else {
            const hashPassword = await bcypt.hash(password, 10)
            const user = await userModel.create({
                firstName,
                lastName,
                email,
                password: hashPassword
            })
            return res.status(200).json({
                message: 'User ragistration successfully'
            });
        }

    } catch (err) {
        next(err);
    }
};


// Your login logic here
const login = async (req, res, next) => {
    const {
        email,
        password
    } = req.body;
    try {
        const existingUser = await userModel.findOne({
            email
        });
        if (!existingUser) {
            return res.status(404).json({
                message: "User doesn't exits"
            });
        }
        const checkPassword = await bcypt.compare(password, existingUser.password)
        if (!checkPassword) {
            return res.status(404).json({
                message: "User doesn't exist or incorrect credentials"
            });


        }
        const token = jwt.sign({
            id: existingUser._id
        }, process.env.JWT_SECRET)
        res.status(200).json({
            user: existingUser,
            message: "User logged in successfully",
            token
        });

    } catch (err) {
        next(err);
    }
};


module.exports = {
    register,
    login
};