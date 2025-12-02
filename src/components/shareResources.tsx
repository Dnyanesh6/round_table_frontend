"use client";
import React, { useState } from "react";

const nicheOptions = [
  { value: 'niche', label: 'Niche', className: '' }, // Default
  { value: 'dev', label: 'Dev', className: 'bg-purple-100 text-purple-700' },
  { value: 'design', label: 'Design', className: 'bg-blue-100 text-blue-700' },
  { value: 'content', label: 'Content', className: 'bg-yellow-100 text-yellow-700' },
  { value: 'editing', label: 'Editing', className: 'bg-pink-100 text-pink-700' },
];

const ChevronDownIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
    />
  </svg>
);

export default function ShareResources({ onClose }: { onClose: () => void }) {
    const [selectedNiche, setSelectedNiche] = useState('niche');

    const selectedOption = nicheOptions.find(
    (option) => option.value === selectedNiche
    );

    return (
        <div className="max-w-sm bg-white p-6 rounded-[30px] w-[500px] text-black p-4">
            <div className="flex justify-between items-center flex flex-row gap-4">
        <h2 className="text-4xl font-[Instrument] mb-4">Share a resource</h2>
      <button 
          onClick={onClose}
          className="bg-red-200 text-red-500 border-2 border-red-500 p-2 rounded-lg">
            Close
      </button>
      </div>

        <div className="flex flex-col items-center justify-between mb-6">
            <input
            type="text"
            placeholder="Title"
            className="border-2 border-gray-300 rounded-xl p-3 w-full mb-3"
            />

            <textarea 
            placeholder="Description"
            className="border-2 border-gray-300 rounded-xl p-3 w-full mb-3"
            name="" id=""></textarea>

            <input
            type="text"
            placeholder="Links"
            className="border-2 border-gray-300 rounded-xl p-3 w-full mb-3"
            />

            <div className="relative w-full mb-4">
            {/* Hidden 'select' for logic */}
            <select
              id="niche"
              value={selectedNiche}
              onChange={(e) => setSelectedNiche(e.target.value)}
              className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
            >
              {nicheOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Visible 'div' styled like an input */}
            <div className="w-full rounded-lg border border-gray-300 p-3 flex justify-between items-center">
              <span className="text-gray-500">Niche</span>
              
              {/* Show the selected tag OR the arrow */}
              {selectedOption && selectedOption.value !== 'niche' ? (
                <span className={`text-sm font-medium px-2.5 py-0.5 rounded-full ${selectedOption.className}`}>
                  {selectedOption.label}
                </span>
              ) : (
                <ChevronDownIcon className="w-5 h-5 text-gray-400" />
              )}
            </div>
          </div>

        {/* Upload Resources Button */}
        <input
            type="file"
            className="w-full mb-4 rounded-lg border border-gray-300 p-3 flex items-center justify-center gap-2 text-gray-700 hover:bg-gray-50"
        />

        <button 
        type="submit"
        className="w-full rounded-lg bg-blue-200 border-2 border-blue-500 text-blue-500 p-3 font-semibold "
        >
            Share
        </button>
        </div>
        </div>
    )
}