"use client"
import { Button } from '@/components/ui/button';
import { Camera, Plus, Video } from 'lucide-react';
import React, { useState } from 'react'

function LatestInterviewList() {
    const [interviewList,setInterviewList] = useState([]);
  return (
    <div className='my-5'>
      <h2 className='font-bold text-2xl'>Previously Created Interviews</h2>

      {interviewList?.length==0 &&
       <div className='my-5 flex flex-col border p-5 rounded-lg gap-3 items-center'>
        <Video className='h-10 w-10 text-primary'/>
        <h2>You don't have any interview created </h2>
        <Button> <Plus/> Create New Interview</Button>
       
        </div> }
    </div>
  )
}

export default LatestInterviewList
