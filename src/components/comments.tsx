// components/Comments.jsx
"use client"; // If this is a client component

import React, { useState } from 'react';

export default function Comments() {
  const [comment, setComment] = useState('');
  const [commentsList, setCommentsList] = useState([{}]);

  const handleAddComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment.trim()) {
      const newComment = {
        id: commentsList.length + 1,
        author: "Current User", // Replace with actual user info
        date: new Date().toLocaleDateString('en-GB'),
        text: comment.trim(),
      };
      setCommentsList([...commentsList, newComment]);
      setComment('');
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 mt-6">
      <h3 className="text-lg font-semibold mb-3 flex items-center justify-between">
        Comments
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0H15M21 3v6" />
        </svg>
      </h3>

      <div className="space-y-4 max-h-60 overflow-y-auto pr-2"> {/* Added max-h and overflow for scroll */}
        {commentsList.map((c) => (
          <div key={c.id} className="flex gap-3 items-start">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex-shrink-0" /> {/* User avatar */}
            <div>
              <p className="font-semibold text-sm">{} <span className="text-xs text-gray-500 ml-1">{c.date}</span></p>
              <p className="text-sm text-gray-700">{c.text}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleAddComment} className="mt-4 pt-4 border-t border-gray-200 flex items-center gap-2">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Type here..."
          className="flex-1 border border-gray-300 rounded-lg p-2 text-sm focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-lg p-2 text-sm hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  );
}