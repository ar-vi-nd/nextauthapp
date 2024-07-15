'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const signup = () => {

    const [formData,setFormData] = useState({email:"",password:""})
    const [shouldFormSubmit,setShouldFormSubmit] = useState(false)

    const router = useRouter()

    const handleChangeFormData = (e:any)=>{
        setFormData({...formData, [e.target.name]: e.target.value})
    }


    const formSubmitHandler = async(e:any)=>{
        e.preventDefault()


        try {
            setShouldFormSubmit(false)
            const response =await  axios.post("/api/users/login",formData)
            if(response.status===400){
                throw new Error(response.data.message)
            }
            console.log("signup successfully")
            router.push("/login")
            

            
        } catch (error:any) {
            if(error.response){
                console.log("error while signing in ",error.response.data.message)
                toast.error(error.response.data.message)
            }
            else{
                console.log("error while signing in ",error.message)
                toast.error(error)
            }
        }finally{
            setFormData({email:"",password:""})
        }
    }

    useEffect(()=>{
        if( formData.email.length>0 && formData.password.length>0){
            setShouldFormSubmit(true)
        }else{
            setShouldFormSubmit(false)
        }
    },[formData])
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
        Login
        <form className='flex flex-col justify-center items-center' onSubmit={formSubmitHandler}>

           <label htmlFor="email">email</label> <input className='text-black p-2' type="email" value={formData.email} placeholder='email' onChange={handleChangeFormData} name='email'/>
           <label htmlFor="password">password</label> <input className='text-black p-2' type="password" value={formData.password} placeholder='password' onChange={handleChangeFormData} name='password'/>
           <button type='submit' disabled={!shouldFormSubmit} className='text-black bg-white mt-2 p-2' >Login</button>
        </form>
    </div>
  )
}

export default signup