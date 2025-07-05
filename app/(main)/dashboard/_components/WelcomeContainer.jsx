"use client"
import { useUser } from '@/app/provider';
import Image from 'next/image';
import React from 'react'

function WelcomeContainer() {
    const  {user} = useUser();
  return (
    <div className='border p-3 rounded-xl flex justify-between items-center '>
      <div >
        <h2 className='text-lg font-bold'>
            Welcome back, {user?.name}
        </h2>
        <h2 className='text-gray-500'>
            AI-Driven Interviews Hassel-Free hiring
        </h2>
        
      </div>
      {user && <Image  className='rounded-full' src={user?.picture} alt='userAvatar' width={40} height={40}/>}
    </div>
  )
}

export default WelcomeContainer
