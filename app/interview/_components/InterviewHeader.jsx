import Image from 'next/image'
import React from 'react'

function InterviewHeader() {
  return (
    <div className='p-4 shadow-sm'>
      <Image src={'/logo.png'} alt='logo' width={100} height={100} className='w-[140px]' />
    </div>
  )
}

export default InterviewHeader
