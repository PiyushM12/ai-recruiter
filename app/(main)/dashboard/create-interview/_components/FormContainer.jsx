import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InterviewType } from "@/services/Constant";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

function FormContainer({ onHandleInputChange , GoToNext}) {
  const [interviewType, setInterviewType] = useState([]);
  useEffect(() => {
    if (interviewType) {
      onHandleInputChange("type", interviewType);
    }
  }, [interviewType]);

  const AddInterviewType = (typeTitle) => {
  if (!interviewType.includes(typeTitle)) {
    setInterviewType((prev) => [...prev, typeTitle]);
  } else {
    const result = interviewType.filter((item) => item !== typeTitle);
    setInterviewType(result);
  }
};

  return (
    <div className="p-5 bg-white border  rounded-lg">
      <div>
        <h2 className="text-sm font-medium">Job Position</h2>
        <Input
          placeholder="e.g. Full Stack Developer"
          className="mt-5"
          onChange={(event) =>
            onHandleInputChange("jobPosition", event.target.value)
          }
        />
      </div>
      <div className="mt-5 ">
        <h2 className="text-sm font-medium">Job Description</h2>
        <Textarea
          className="mt-5 h-[200px]"
          placeholder="Enter Detailed Job Description"
          onChange={(event) =>
            onHandleInputChange("jobDescription", event.target.value)
          }
        />
      </div>
      <div className="mt-5 ">
        <h2 className="text-sm font-medium">Interview Duration</h2>
        <Select
          onValueChange={(value) => onHandleInputChange("duration", value)}
        >
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder="Select Interview Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5 Min">5 Min</SelectItem>
            <SelectItem value="15 Min">15 Min</SelectItem>
            <SelectItem value="30 Min">30 Min</SelectItem>
            <SelectItem value="45 Min">45 Min</SelectItem>
            <SelectItem value="60 Min">60 Min</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-5 ">
        <h2 className="text-sm font-medium">Interview Type</h2>
        <div className="flex flex-wrap gap-2 mt-2 ">
          {InterviewType.map((type, index) => (
            <div
              key={index}
              className={`flex gap-2 p-1 px-2 items-center border border-gray-300 rounded-lg cursor-pointer hover:bg-secondary 
                    ${
                      interviewType.includes(type.title) &&
                      "bg-blue-50 text-primary"
                    }`}
              onClick={() => AddInterviewType(type.title)}
            >
              <type.icon className="h-4 w-4 " />
              <span>{type.title}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-7 flex justify-end"  onClick={()=>GoToNext()} >
        <Button>
          Generate Question
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
}

export default FormContainer;
