import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server'

export function getTokenData(request:NextRequest){
try{
    const token = request.cookies?.get("token")?.value || ""
    console.log(token)
    if(!token){
        return null
    }
    const payload = jwt.verify(token,process.env.JWT_SECRET!)
    return payload
}catch(error:any){
    throw new Error(error.message)
}
}