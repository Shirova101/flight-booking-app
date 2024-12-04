const mongoose = require("mongoose");

const connectDatabase = () => {
    mongoose
        .connect(process.env.DB_URL)
        .then((data) => {
            console.log(`MongoDB connected with server: ${data.connection.host}`);
        })
        .catch((err) => {
            console.log(`Error: ${err.message}`);
            process.exit(1); // Exit the process if database connection fails
        });
};

module.exports = connectDatabase;
