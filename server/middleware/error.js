const ErrorHandler = require("../utils/errorhandler");

module.exports = (err,req,res,next) => { // next is call back function which is used later
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "INTERNAL SERVER ERROR";


    // wrong MongoDb Id error
    if(err.name === "CastError"){
        const message= `Resource Not Found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400); // 400 : bad request 
    }
    
    //Mongoose Duplicate Key Error
    if(err.code === 11000)
    {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message,400);
    }

    // Wrong JWT Error
    if(err.name === "JsonWebTokenError"){
        const message= `Json Web Token is invalid, Try again`;
        err = new ErrorHandler(message, 400); // 400 : bad request 
    }

    //JWT Expire Error
    if(err.name === "TokenExpiredError"){
        const message= `Json Web Token is Expired, Try again`;
        err = new ErrorHandler(message, 400); // 400 : bad request 
    }

    console.error(`Error: ${err.message}\nStatus Code: ${err.statusCode || 500}\nStack: ${err.stack}`);
    
    
    res.status(err.statusCode).json({
        success : false,
        error : err.message,
    });

};
