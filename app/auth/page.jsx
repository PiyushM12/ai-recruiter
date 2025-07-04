"use client"
import { Button } from '@/components/ui/button'
import { supabase } from '@/services/supabaseClient'
import Image from 'next/image'
import React from 'react'

function Login() {
  const signInWithGoogle= async ()=>{
    const {error} = await supabase.auth.signInWithOAuth({
      provider:'google'
    })
    if(error){
      console.error('Error:',error.message)
    }
  }
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='flex flex-col items-center border rounded-2xl p-3 '>
        <Image src={'/logo.png'} alt='logo' width={400} height={100} className='w-[180px]'/>

        <div className=' flex flex-col items-center'>
          <Image className='rounded-2xl' src={'/login.png'} alt='login' width={500} height={400} />
          <h2 className='text-2xl font-bold text-center mt-5'>Welcome to RecruitAI</h2>
          <h3 className='text-gray-500 text-center'>Sign In with Google Authentication  </h3>
          <Button onClick={signInWithGoogle} className="mt-6 w-full">Login with Google</Button>
        </div>
      </div>
    </div>
  )
}

export default Login
