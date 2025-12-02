"use client"

import React, { useState } from 'react';

// --- Helper SVGs for the UI ---


// Icon for the dropdown arrow
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

// Icon for the description box (as seen in mockup)
const AvatarIcon = (props: React.HTMLProps<HTMLDivElement>) => (
  <div
    className="relative w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-xl shadow-sm"
    {...props}
  >
    😎
  </div>
);

// --- Updated Niche Options ---
// The 'className' now styles the *tag* instead of the whole box.
const nicheOptions = [
  { value: 'niche', label: 'Niche', className: '' }, // Default
  { value: 'dev', label: 'Dev', className: 'bg-purple-100 text-purple-700' },
  { value: 'design', label: 'Design', className: 'bg-blue-100 text-blue-700' },
  { value: 'content', label: 'Content', className: 'bg-yellow-100 text-yellow-700' },
  { value: 'editing', label: 'Editing', className: 'bg-pink-100 text-pink-700' },
];

export default function AddGoals({ onClose }: { onClose: () => void }) {
  const [selectedNiche, setSelectedNiche] = useState('niche');
  const [priority, setPriority] = useState(false);

  // Find the full object for the currently selected niche
  const selectedOption = nicheOptions.find(
    (option) => option.value === selectedNiche
  );
  return (
    // Backdrop: Covers the entire screen, blurs the background
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      {/* Modal Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm text-black rounded-2xl bg-white p-6 shadow-lg"
      >
        {/* Title */}
         <div className="flex justify-between items-center flex flex-row gap-4">
        <h1 className="font-[Instrument] text-4xl mb-6">Add goal</h1>
      <button 
          onClick={onClose}
          className="bg-red-200 text-red-500 border-2 border-red-500 p-2 rounded-lg">
            Close
      </button>
      </div>
        
        
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            className="w-full rounded-lg border border-gray-300 p-3"
          />
          
          {/* Description Textarea with Icon */}
          <div className="relative">
            <textarea
              placeholder="Description"
              className="w-full rounded-lg border border-gray-300 p-3"
              rows={4} // Increased height
            />
            {/* This places the icon in the middle, purely visual */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <AvatarIcon />
            </div>
          </div>

          <input
            type="text"
            placeholder="Due date"
            className="w-full rounded-lg border border-gray-300 p-3"
          />

          {/* Updated Custom Select Component */}
          <div className="relative ">
            {/* Hidden 'select' for logic */}
            <select
              id="niche"
              value={selectedNiche}
              onChange={(e) => setSelectedNiche(e.target.value)}
              className="absolute w-full inset-0 z-10 h-full w-full cursor-pointer opacity-0"
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

          {/* Set Priority Checkbox */}
          <div className="w-full rounded-lg border border-gray-300 p-3 flex items-center gap-3">
            <input
              type="checkbox"
              id="priority"
              checked={priority}
              onChange={(e) => setPriority(e.target.checked)}
              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="priority" className="text-gray-700">
              Set priority
            </label>
          </div>

          {/* Upload Resources Button */}
          <input
            type="file"
            className="w-full rounded-lg border border-gray-300 p-3 flex items-center justify-center gap-2 text-gray-700 hover:bg-gray-50"
          />
          

          {/* Add Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-blue-400 text-white p-3 font-semibold hover:bg-blue-500"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}