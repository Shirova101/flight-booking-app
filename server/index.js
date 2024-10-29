const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");


// HANDLING UNCAUGHT EXCEPTIONS
process.on("uncaughtException", err=>{
    console.log(`Error : ${err.message}`);
    console.log(`Shutting Down Server due to UNCAUGHT EXCEPTIONS`)

    process.exit(1);
})

// Config

dotenv.config({path: "backend/config/config.env"});

// connecting database

connectDatabase()

const server = app.listen(process.env.PORT , () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
})

// UNHANDLED PROMISE REJECTIONS

process.on("unhandledRejection", err =>{
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(()=>{
        process.exit(1);
    });
});