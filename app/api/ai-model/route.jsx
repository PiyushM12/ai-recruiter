import { QUESTION_PROMPT } from "@/services/Constant";
import { NextResponse } from "next/server";
import OpenAI from "openai";


export async function POST(req){
    const {jobPosition, jobDescription,duration ,type} = await req.json();
    const FINAL_PROMPT = QUESTION_PROMPT.replace('{{jobTitle}}',jobPosition)
    .replace('{{jobDescription}}',jobDescription)
    .replace('{{duration}}',duration)
    .replace('{{type}}',type)

    console.log(FINAL_PROMPT);
    try{
    const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
  
});

const completion = await openai.chat.completions.create({
    model: 'google/gemma-3n-e4b-it:free',
    messages: [
      {
        role: 'user',
        content: FINAL_PROMPT,
      },
    ],
    max_tokens: 4000,
   // response_format:'json'
  });
  console.log(completion.choices[0].message);
  return NextResponse.json(completion.choices[0].message)
}

catch(e){
    console.log(e)
    return NextResponse.json(e)

}
}