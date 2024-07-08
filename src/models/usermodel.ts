import { verify } from "crypto";
import mongoose from "mongoose";

const {Schema} =  mongoose


const userSchema = new Schema({

    username : {
        type : String,
        required : [true,"Please provide a username"],
        unique : [true,"Username must be unique"]

    },

    email : {
        type : String,
        required : [true,"Please provide an email"],
        unique : [true,"Email must be unique"]

    },
    password : {
        type : String,
        required : [true,"Please provide a password"],

    },
    isVerified : {
        type : Boolean,
        default: false

    },
    isAdmin : {
        type : Boolean,
        default: false

    },

    forgotPasswordToken : String,
    forgotPasswordTokenExpiry : Date,
    verifyEmailToken : String,
    verifyEmailTokenExpiry:Date


})


const User  = mongoose.models.users || mongoose.model("users",userSchema)

export default User