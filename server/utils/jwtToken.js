//creating token and saving in COOKIE

const sendToken = (user,statusCode,res)=>{
    const token = user.getJWTToken();
    var temp = Date.now() + process.env.COOKIE_EXPIRE *24 * 60 * 60 * 1000 // initialised a seperate variable . otherwise the option - 'expires' shows invalid error of some sort
    //options for cookie
    const options = {
        expires: new Date( 
           temp
        ),
        httpOnly: true,
    };

    res.status(statusCode).cookie("token",token,options).json({
        success:true,
        user,
        token,
    });
};

module.exports = sendToken;