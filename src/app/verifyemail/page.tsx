'use client'
import axios from 'axios';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation'; // Use from 'next/navigation' in App Router
import React, { useEffect, useState } from 'react';

export default function VerifyEmail() {
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);
    const [isVerified, setIsVerified] = useState(false);

    const verifyUserEmail = async ()=>{

        try {
            console.log(typeof token)
            const response = await axios.post("/api/users/verify",{token})
            console.log(response)
            if(response.status === 200){
                setIsVerified(true)
            }
            
        } catch (error:any) {
            console.log("error verifying token ",error.response.data.message)

        }

    }

    useEffect(()=>{
        let verifyToken = window.location.search.split("=")[1]
        console.log(verifyToken)
            setToken(verifyToken)
        
    })



    return (
        <div className='h-screen flex flex-col justify-center items-center'>
            <div>verifyemail</div>
            <button className='text-black bg-white p-2 m-2' onClick={verifyUserEmail} disabled={isVerified}>
                {isVerified ? "Verified" : "Click to Verify"}
            </button>
            {isVerified && <Link href="/login">Continue to Login</Link>}
        </div>
    )
}
