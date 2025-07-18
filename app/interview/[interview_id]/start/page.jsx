"use client"

import { InterviewDataContext } from '@/context/InterviewDetailContext'
import { Mic, Phone, Timer } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import Vapi from '@vapi-ai/web'
import AlertConfirmation from './_components/AlertConfirmation'
import { toast } from 'sonner'

function StartInterview() {
  const { interviewInfo } = useContext(InterviewDataContext)

  const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY)

  const [activeUser,setActiveUser] = useState(false);

  useEffect(() => {
    if (interviewInfo) {
      startCall()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interviewInfo])

  const startCall = () => {
    const questionList = interviewInfo?.interviewData?.questionList
      ?.map((item) => item?.question)
      .join(', ')

    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage: `Hi ${interviewInfo?.userName}, how are you? Ready for your interview on ${interviewInfo?.interviewData?.jobPosition}?`,
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
      },
      voice: {
        provider: "playht",
        voiceId: "jennifer",
      },
      model: {
        provider: "openai",
        model: "gpt-4", // ✅ Correct provider & model!
        messages: [
          {
            role: "system",
            content: `
You are an AI voice assistant conducting interviews.
Your job is to ask candidates provided interview questions and assess their responses.

Begin the conversation with a friendly introduction, setting a relaxed yet professional tone.
Example: "Hey there! Welcome to your ${interviewInfo?.interviewData?.jobPosition} interview. Let's get started with a few questions!"

Ask one question at a time and wait for the candidate's response before proceeding. Keep the questions clear and concise.
Below are the questions to ask one by one:
Questions: ${questionList}

If the candidate struggles, offer hints or rephrase the question without giving away the answer.
Example: "Need a hint? Think about how React tracks component updates!"

Provide brief, encouraging feedback after each answer. Example:
"Nice! That's a solid answer."
"Hmm, not quite! Want to try again?"

Keep the conversation natural and engaging — use casual phrases like "Alright, next up..." or "Let's tackle a tricky one!"

After 5–7 questions, wrap up the interview smoothly by summarizing their performance.
Example: "That was great! You handled some tough questions well. Keep sharpening your skills!"

End on a positive note:
"Thanks for chatting! Hope to see you crushing projects soon!"

Key Guidelines:
- Be friendly, engaging, and witty.
- Keep responses short and natural, like a real conversation.
- Adapt based on the candidate’s confidence level.
- Ensure the interview remains focused on React.
            `.trim(),
          },
        ],
      },
    }

    vapi.start(assistantOptions)
  }

  const stopInterview = () => {
    vapi.stop()
  }
  vapi.on("call-start",()=>{
    console.log("Call has started.");
    toast("Call connected...");
  })
  vapi.on("speech-start",()=>{
    console.log("Assitant speech has started.");
    setActiveUser(false);

  });

vapi.on("speech-end",()=>{
  console.log("Assitant speech has ended.")
  setActiveUser(true);
})
vapi.on("call-end",()=>{
  console.log("call has ended")
  toast("Interview Ended")
})
  return (
    <div className='p-20 lg:px-40'>
      <h2 className='font-bold text-xl flex justify-between'>
        AI Interview Session
        <span className='flex gap-2 items-center'>
          <Timer />
          00:00:00
        </span>
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-5'>
        <div className='bg-white flex-col gap-3 h-[400px] rounded-lg flex items-center justify-center border'>
          <div className='relative'>
            {!activeUser && <span className='absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping' />}
            <Image
            src={'/ai.png'}
            alt='ai'
            width={100}
            height={100}
            className='w-[60px] h-[60px] rounded-full object-center'
          />

          </div>
          
          <h2>AI Recruiter</h2>
        </div>

        <div className='bg-white h-[400px] rounded-lg flex items-center flex-col gap-3 justify-center border'>
          <div className='relative'>
             {activeUser && <span className='absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping' />}

            <h2 className='text-2xl bg-primary text-white p-3 font-bold rounded-full px-5 '>
            {interviewInfo?.userName?.[0]}
          </h2>

          </div>
          
          <h2>{interviewInfo?.userName}</h2>
        </div>
      </div>

      <div className='flex items-center gap-5 justify-center mt-7'>
        <Mic className='h-12 w-12 p-3 text-white bg-gray-500 rounded-full cursor-pointer' />
        <AlertConfirmation stopInterview={stopInterview}>
          <Phone className='h-12 w-12 p-3 text-white bg-red-500 rounded-full cursor-pointer' />
        </AlertConfirmation>
      </div>

      <h2 className='text-sm text-gray-400 text-center mt-5'>
        Interview is in progress...
      </h2>
    </div>
  )
}

export default StartInterview
