import { connectDb } from "@/dbconfig/dbconfig";
import User from "@/models/usermodel";
import { NextRequest,NextResponse } from "next/server";
connectDb()

export async function POST(request:NextRequest){


    try {

        const reqBody = await request.json()
        const {token} = reqBody

        console.log(token)

        const verifiedUser = await User.findOne({verifyEmailToken:token,verifyEmailTokenExpiry:{$gt:Date.now()}})

        if(!verifiedUser){
            return NextResponse.json({message:"Request token invalid",success:false},{status:400})
        }

        verifiedUser.isVerified = true
        verifiedUser.verifyEmailToken = undefined
        verifiedUser.verifyEmailTokenExpiry = undefined

        await verifiedUser.save()

        return NextResponse.json({message:"User verified successfully",success:true},{status:200})



        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }

}



