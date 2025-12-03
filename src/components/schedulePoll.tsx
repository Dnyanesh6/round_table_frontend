"use client";
import { useState } from "react";
// const CheckIcon = () => (
//   <svg
//     className="w-5 h-5 text-blue-600"
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 20 20"
//     fill="currentColor"
//   >
//     <path
//       fillRule="evenodd"
//       d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm3.707-9.293a1 1 0 0 0-1.414-1.414L9 10.586 7.707 9.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4z"
//       clipRule="evenodd"
//     />
//   </svg>
// );

// Info Icon
const InfoIcon = () => (
  <svg
    className="w-5 h-5 text-gray-400"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
    />
  </svg>
);

export default function SchedulePoll({onClose}: {onClose: () => void}) {
  
    const [PollOptions, setPollOptions] = useState<string[]>([]);
  
  return (
    <div>
      <div className="rounded-lg flex flex-col gap-4 p-6 bg-white text-black font-bold">
        <div className="flex justify-between items-center flex flex-row gap-4">
          <div>At what time works best for you?</div>
          <button 
          onClick={onClose}
          className="bg-red-200 text-red-500 border-2 border-red-500 p-2 rounded-lg">
            Close
          </button>
        </div>
        <div className="mt-2 flex items-center gap-2 text-gray-500">
          <InfoIcon />
          <span>Select One</span>
        </div>

        <div className="mt-4 flex flex-col gap-3">
              {PollOptions.length ? (PollOptions.map((option, index) => {
                return (
                  <div key={index} className="flex items-center border-2 border-gray-300 gap-3">
                    <input 
                    // onClick={() => handleVote(option.id)}
                    type="radio" name="pollOption" value={option} className="w-5 h-5 text-blue-600"/>
                    <span>{option}</span>
                  </div>
                )
              })) : (
                <div>No options available</div>
              )}
        </div>
      </div>
    </div>
  )
}