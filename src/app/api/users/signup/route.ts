import { connectDb } from "@/dbconfig/dbconfig";
import User from "@/models/usermodel";
import { NextRequest,NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import { sendEmail } from "@/helper/mailer";
connectDb()

export async function POST(request:NextRequest){

    try {

        // here to extract data from request body we need to use await

        const reqBody = await request.json()

    const {username,email,password} = reqBody

    console.log("username : ",username)

    const oldUser = await User.findOne({$or :[{email:email},{username:username}]})

    if(oldUser){
        return NextResponse.json({message:"User Already Exists"},{status:400})
    }

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password,salt)

    const newUser  = await User.create({
        username,email,password:hashedPassword
    })

    console.log(newUser)

    await sendEmail({email,emailType:"VERIFY",userId:newUser._id})

    return NextResponse.json({message:"User Created Successfully, Please Verify Your Account to login",success:true},{status:200})

        
    } catch (error : any) {

        console.log(error)

        return NextResponse.json({error:"Internal Server Error"},{status:500})
        
    }
}


