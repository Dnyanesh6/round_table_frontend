// components/TaskItem.jsx
"use client";

import React, { useState } from "react";
import Comments from "./comments"; // Make sure this path is correct

// A simple SVG for the chevron arrow
const ChevronDownIcon = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
    />
  </svg>
);

// A simple SVG for the status dot
const StatusDot = ({ colorClassName = "bg-gray-400" }) => (
  <div className={`w-3.5 h-3.5 ${colorClassName} rounded-full flex-shrink-0`} />
);

// Placeholder for a user/assignee avatar
const AssigneeAvatar = () => (
  <div className="relative w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-xl shadow-sm">
    😎
  </div>
);

export default function TaskItem({ task }: { task: { description: string } }) {
  const [check, setCheck] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    // 🔹 FIX 1: The border and rounded styles are now on the *root* div.
    // 'overflow-hidden' makes the content respect the rounded corners.
    <div className="flex flex-col text-black border border-gray-300 rounded-lg overflow-hidden shadow-sm">
      
      {/* 🔹 FIX 1: The border styles were removed from here */}
      <div className="flex flex-row text-black p-4 gap-4">
        {/* 🔹 Replaced 'space-x-4' with responsive 'gap' */}
        <div className="flex flex-row gap-2 sm:gap-4 w-full">
          
          <div className="flex flex-col gap-2">
            {/* 🔹 Tailwind Purge-Safe Class: Uses the full class name */}
            <StatusDot colorClassName={check ? "bg-green-500" : "bg-yellow-500"} />
            <input 
              onClick={() => setCheck(!check)}
              type="checkbox" 
              // 🔹 Responsive Checkbox Size
              className="size-4 sm:size-5" 
              name="" 
              id="" 
            />
          </div>

          {/* 🔹 Added 'flex-1' to this wrapper to ensure it takes available space */}
          <div className="flex flex-col gap-1 flex-1">
            {/* 🔹 Responsive Text: Mobile-first (text-xl), larger on sm/lg */}
            <h1 className="font-bold text-xl sm:text-2xl lg:text-3xl">Task heading</h1>
            {/* 🔹 Responsive Text */}
            <div className="text-gray-500 text-sm sm:text-base">Due date: 28-10-25</div>
          </div>

          {/* 🔹 Responsive Gaps: Replaced fixed margins (m-2, ml-4) */}
          <div className="flex flex-row ml-auto items-center gap-2 sm:gap-4">
            {check ? (
              // 🔹 Responsive Text & Padding
              <div className="text-green-500 border border-green-500 flex items-center justify-between rounded-lg px-2 py-1 text-xs sm:text-sm bg-green-200/50">
                In Progress
              </div>
            ) : (
              // 🔹 Responsive Text & Padding
              <div className="text-yellow-500 border border-yellow-500 flex items-center justify-center rounded-lg px-2 py-1 text-xs sm:text-sm bg-yellow-200/50">
                To do
              </div>
            )}

            {/* 🔹 Responsive Layout: "Niche" is hidden on mobile */}
            <div className="hidden sm:flex items-center text-sm sm:text-base">
              Niche
            </div>
            
            {/* 🔹 Removed fixed margin, parent 'gap' handles it */}
            <div className="flex items-center cursor-pointer">
              <ChevronDownIcon 
                onClick={() => setIsExpanded(!isExpanded)}
                className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${isExpanded ? "rotate-180" : "rotate-0"}`} 
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* 🔹 FIX 2: Expanded content is now *inside* the main div */}
      {isExpanded && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Column: Description & Resources */}
            <div className="w-full lg:w-2/3">
              <div className="mb-6">
                <h3 className="text-base sm:text-lg font-semibold mb-2 flex items-center justify-between">
                  About the task
                  <div className="flex items-center text-sm text-gray-500 gap-2">
                    Given by
                    <AssigneeAvatar />
                  </div>
                </h3>
                {/* 🔹 Responsive Text */}
                <p className="text-sm sm:text-base text-gray-700 whitespace-pre-line leading-relaxed">
                  {task.description}
                </p>
              </div>

              <div>
                {/* 🔹 Responsive Text */}
                <h3 className="text-base sm:text-lg font-semibold mb-2">Resources</h3>
                <div className="flex flex-wrap gap-2">
                  {/* ... resources links ... */}
                  <a
                    href="#"
                    className="flex items-center gap-1 bg-gray-100 p-2 rounded-lg text-sm text-gray-700 hover:bg-gray-200 transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3V1.5"
                      />
                    </svg>
                    file_name
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-1 bg-gray-100 p-2 rounded-lg text-sm text-gray-700 hover:bg-gray-200 transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.125a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3V1.5"
                      />
                    </svg>
                    file_name
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Comments Section */}
            <div className="w-full lg:h-2/3 lg:w-1/3">
              <Comments />
            </div>
          </div>
        </div>
      )}
    </div> // 🔹 This is the single, correct closing div
  );
}