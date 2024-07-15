import { connectDb } from "@/dbconfig/dbconfig";
import User from "@/models/usermodel";
import { NextRequest,NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import { sendEmail } from "@/helper/mailer";
import { getTokenData } from "@/helper/getTokenData";
connectDb()


export async function POST (request: NextRequest){
    try{
        const payload:any = getTokenData(request)
        console.log(payload)

        if(!payload){
            return NextResponse.json({message:"User Not Found",success:false},{status:400})
        }
        const user = await User.findOne({_id:payload.userId}).select("-password")
        if(!user){
            return NextResponse.json({message:"User Not Found",success : false},{status:400})
        }
        return NextResponse.json({message:"User found",success: true,data:user},{status:200})
    }
    catch(error:any){
        throw new Error(error)
    }
}