"use client"
import { InterviewDataContext } from '@/context/InterviewDetailContext'
import { Mic, Phone, Timer } from 'lucide-react'
import Image from 'next/image'
import React, { useContext } from 'react'

function StartInterview() {
  const {interviewInfo,setInterviewInfo}= useContext(InterviewDataContext)
  return (
    <div className='p-20 lg:px-40'>
      <h2 className='font-bold text-xl flex justify-between'>
        AI Interview Session
        <span className='flex gap-2 items-center'>
          <Timer/>
          00:00:00
        </span>
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-5'>
        <div className='bg-white flex-col gap-3 h-[400px] rounded-lg flex items-center justify-center border'>
            <Image src={'/ai.png'} alt='ai' width={100} height={100} className='w-[60px] h-[60px] rounded-full object-center'  />
            <h2>AI Recruiter</h2>
        </div>
         <div className='bg-white h-[400px] rounded-lg flex items-center flex-col gap-3 justify-center border'>
            <h2 className='text-2xl bg-primary text-white p-3 font-bold rounded-full px-5 '>{interviewInfo?.userName[0]}</h2>
            <h2>{interviewInfo?.userName}</h2>
        </div>
        <div>

        </div>

      </div>
      <div className='flex items-center gap-5 justify-center mt-7 '>
        <Mic className=' h-12 w-12 p-3 text-white bg-gray-500 rounded-full cursor-pointer '/>
        <Phone className=' h-12 w-12 p-3 text-white bg-red-500 rounded-full cursor-pointer '/>
      </div>
      <h2 className='text-sm text-gray-400 text-center mt-5'>
        Interview is in progress...
      </h2>
    </div>
  )
}

export default StartInterview
