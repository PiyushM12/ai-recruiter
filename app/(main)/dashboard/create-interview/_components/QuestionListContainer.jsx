import React from 'react'
import QuestionList from './QuestionList'

function QuestionListContainer({ questionList }) {
  return (
    <div>
      <h2 className='font-bold text-primary text-lg'>
            Generated Interview Questions:
          </h2>
          <div className='p-5 border border-gray-300 rounded-xl'>
           
            {questionList.map((item,index)=>(

              <div key={index} className='p-3 mb-2 border border-gray-300 rounded-xl'>
                <h2 className='font-medium'>
                  {item.question}
                </h2>
                <h2 className='text-primary'>
                  Type: {item?.type}
                </h2>
                </div>
            ))}
            </div>
      
    </div>
  )
}

export default QuestionListContainer
