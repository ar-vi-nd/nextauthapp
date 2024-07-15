import { connectDb } from "@/dbconfig/dbconfig";
import User from "@/models/usermodel";
import { NextRequest,NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
connectDb()


export async function POST(request:NextRequest){

    try {

        const reqBody = await request.json()

        const {email,password} = reqBody

        console.log("email,",email," password, ",password)
        const oldUser = await User.findOne({email:email})

        if(!oldUser){
            return NextResponse.json({message:"Invalid Credentials",success:false},{status:400})
        }

        console.log(oldUser)



        if(!(bcrypt.compare(password,oldUser.password))){
            return NextResponse.json({message:"Invalid Credentials",success:false},{status:400})
        }


        const payload = {
            userId : oldUser._id,
            email : oldUser.email,
            username : oldUser.username
        }

        const token = jwt.sign(payload,process.env.JWT_SECRET!,{expiresIn:"1d"})
        
        const response =  NextResponse.json({message:"User Logged in Successfully",success:true},{status:200})

        response.cookies.set("token",token,{httpOnly:true})

        return response
        
    } catch (error) {
        
        return NextResponse.json({message:"Error logging in, ",error, success:false},{status:500})
    }
}