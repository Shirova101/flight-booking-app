const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const userModel = require("../models/userModel");
const exp = require("constants");
// REGISTER USER //

exports.registerUser = catchAsyncErrors(async (req,res,next) => {
    const {name,email,password} = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id: "this is a sample ID",
            url: "profilepicURL",
        },
    });
    sendToken(user,201,res);
});


// LOGIN USER //

exports.loginUser = catchAsyncErrors(async (req,res,next) =>{
    const {email, password} = req.body;

    if(!email || !password)
    {
        return next(new ErrorHandler("PLease Enter Email & Password", 400));
    }

    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("invalid Email or Password",401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("invalid Email or Password",401));
    }
    /// at this point everything has been validate
    sendToken(user,200,res);

});

// LOGOUT USER //

exports.logout = catchAsyncErrors(async (req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    });

    res.status(200).json({
        success:true,
        message:"logged Out",
    });
});

// FORGOT PASSWORD //
exports.forgotPassword = catchAsyncErrors(async(req,res,next) => {
    const user = await User.findOne({email:req.body.email});

    if(!user){
        return next(new ErrorHandler("USER NOT FOUND",404));
    }

    // Get Reset Password token 
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave:false});

    const resetPasswordURL = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;
    const message = `Your password reset token is ;- \n\n ${resetPasswordURL} \n\n If you have not requested this email then, please ignore it`;

    try {
        await sendEmail({
            email:user.email,
            subject:`Ecommerce Password Recovery`,
            message,
        });

        res.status(200).json({
            success:true,
            message: `Email sent to ${user.email} succesfully`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave: false});
        return next(new ErrorHandler(error.message,500));
    }   
});

// RESET PASSWORD //

exports.resetPassword = catchAsyncErrors(async (req,res,next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now()},
    });

    if(!user)
    {
        return next(new ErrorHandler("Reset Password Token is Invalid or has been Expired",400));
    }
    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Passwords do not match", 400));
    }


    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user,200,res); //  this will login the user

});

// Get User Details

exports.getUserDetails = catchAsyncErrors(async (req,res,next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user,
    });
});

// Update User Password

exports.updatePassword = catchAsyncErrors(async (req,res,next) => {
    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Old Password Is Incorrect"),400);
    }

    if(req.body.confirmPassword !== req.body.newPassword){
        return next(new ErrorHandler("Passwords do not Match",400));
    }
    user.password = req.body.newPassword;

    await user.save();

    sendToken(user,200,res);
});


// Update User Profile

exports.updateProfile = catchAsyncErrors(async (req,res,next) => {
    const newUserData ={
        name: req.body.name,
        email:req.body.email,
    };
    // we will add cloudinary later for avatar

    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
        new: true,
        runValidators: true,
        usefindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
})

// get All Users (ADMIN)

exports.getAllUsers = catchAsyncErrors( async (req,res,next) =>{
    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    });

});

// get user details by id (ADMIN)

exports.getSingleUserDetails = catchAsyncErrors(async (req,res,next)=>{
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not Exist with ID : ${req.params.id}`),400);
    }

    res.status(200).json({
        success: true,
        user,
    });
});

// Update User Role -- (ADMIN)

exports.updateUserRole = catchAsyncErrors(async (req,res,next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    }

    const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
       new: true,
       runValidators: true,
       usefindAndModify: false, 
    });
    
    res.status(200).json({
        success: true,
    });
});

// Delete User -- (ADMIN)

exports.deleteUser = catchAsyncErrors(async (req,res,next) => {
    const user = await User.findById(req.params.id);
    // we will remove cloudinary later

    if(!user)
    {
        return next(new ErrorHandler(`User does not exist with ID : ${req.params.id}`,400));
    }
    await user.deleteOne();

    res.status(200).json({
        success: true,
        message: "User Deleted Successfully",
    });
});



