const { default: mongoose } = require("mongoose");

// Function responsible for establishing a connection to the MongoDB database
const connectToDB = () => {
    mongoose.connect(process.env.MONGODB_URL).then(() => {
        console.log(`Database Connected!`);
    }).catch((err) => {
        console.error(`Error connecting to the database: ${err.message}`);
        process.exit(1); // Exit the process with an error code if the connection fails
    });
};

module.exports = connectToDB;