"use client"
import React, { useContext, useEffect, useState } from 'react'

import Image from 'next/image'
import { Clock, Info, Loader2Icon, Video } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/services/supabaseClient'
import { toast } from 'sonner'

import { InterviewDataContext } from '@/context/InterviewDetailContext'

function Interview() {
    const  {interview_id} = useParams();
    console.log(interview_id);
    const [interviewData,setInterviewData] = useState();
    const [userName,setUserName]=useState();
    const[loading,setLoading]= useState(false);
    const {interviewInfo,setInterviewInfo}=useContext(InterviewDataContext);
    const router = useRouter();
   // const [loading,setL]
    useEffect(()=>{
      interview_id&&GetInterviewDetails();
    },[interview_id])
    const GetInterviewDetails= async ()=>{
      setLoading(true);
      try{let{data:interviews,error}= await supabase
        .from('interviews')
        .select("jobPosition,jobDescription,duration,type")
        .eq('interview_id',interview_id)
        setInterviewData(interviews[0]);
        setLoading(false);
      if(interviews?.length==0){
        toast('Incorrect')
      }
      }
        catch(e){
          setLoading(false);
          toast("Incorrect Interview Link")
        }
        
        
       
    }
    const onJoinInterview = async()=>{
      setLoading(true);
          let {data:interviews,error}= await supabase 
          .from('interviews')
          .select('*')
          .eq('interview_id',interview_id);
          console.log(interviews[0]);
          setInterviewInfo({
            userName:userName,
            interviewData : interviews[0]
          });
          router.push('/interview/'+interview_id+'/start')
          setLoading(false);
        }
  return (
    <div className='px-10 md:px-28 lg:px-48 xl-px-64 mt-16 '>
      <div className='flex flex-col items-center justify-center border  rounded-lg bg-white p-7 lg:px-33 xl:px-52 mb-20'>
        <Image src={'/logo.png'} alt='logo' width={100} height={100} className='w-[140px]' />
        <h2 className='mt-3'>
            AI-Powered Interview Platform
        </h2>
        <Image src={'/interview.png'} alt='interview' width={500} height={500} className='w-[280px] my-6' />
        <h2 className='font-bold text-xl '>{interviewData?.jobPosition}</h2>
        <h2 className='flex gap-2 items-center text-gray-500 mt-3 '><Clock className='h-4 w-4'/> {interviewData?.duration} </h2>
        
        <div className='w-full '>
            <h2>Enter your full name</h2>
            <Input className="mt-3 mb-3" placeholder='e.g. Jhon Smith' onChange={(event)=>setUserName(event.target.value)}/>
        </div>
        <div className='p-3 bg-blue-100 flex flex-col gap-4 rounded-xl'>
            <div className='flex gap-2'>
                <Info className='text-primary'/>

               <h2 className='font-bold'>Before you begin</h2>

            </div>
            
            <ul className='text-primary'>
                <li className='text-primary'>
            - Test your camera and microphone
                </li >
                <li className='text-primary'>
            - Ensure you have a stable internet connection
                </li>
                <li className='text-primary'>
           - Find a Quiet place for interview.
                </li>
            </ul>
        </div>
        <Button className="w-full font-bold mt-5" disabled={loading||!userName}
       onClick= {()=>onJoinInterview()}>
        {loading &&<Loader2Icon/>}
        <Video/>Join Interview</Button>
      </div>
      
    </div>
  )
}

export default Interview
