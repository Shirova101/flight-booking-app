const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Your Name"],
        maxLength:[30,"Name Cannot Exceed 30 charecters"],
        minLength:[4,"Name Should have more than 4 charecters"]
    },
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter A Valid Email"]
    },
    password:{
        type: String,
        required:[true, "Please Enter Your Password"],
        minLength:[4,"Name Should have more than 4 charecters"],
        select:false,// basically wherever the .find() function is called .. the password for the user found is not selected 
    },
    avatar:{
       
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
    },
    role:{
        type:String,
        default:"user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

userSchema.pre("save", async function(next){

    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password,10);
});
// JWT TOKEN //

userSchema.methods.getJWTToken =function(){ // WE ARE NOT USING BASIC ()=> {} TYPE OF FUNCTION BECAUSE "THIS" CANNOT BE USED IN THAT 
    return jwt.sign({id:this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// COMPARE PASSWORD //
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

// GENERATING PASSWORD RESET TOKEN //
userSchema.methods.getResetPasswordToken = function(){
    // Generating token
    const resetToken= crypto.randomBytes(20).toString("hex");
    // Hashing and adding to User Schema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 15*60*1000; // 15 miniutes in miliseconds
    return resetToken;
};

module.exports = mongoose.model("User",userSchema);