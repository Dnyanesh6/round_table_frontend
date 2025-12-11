import React from "react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
export default function JoinTable({ onClose }: { onClose: () => void }) {
  const [code, setCode] = useState<string>("");

  const handleJoinTable = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/tables/join`,
        { inviteCode: code },
        { withCredentials: true }
      )

      if (res) {
        toast.success(`Successfully joined table: ${res.data.tableName}`);
        onClose();
      }
    } catch (error) {
      toast.error("Failed to join table. Please check the code and try again.");
      console.log("Error joining table:", error);
    }
  }
  
  return (
    <div
      className="flex justify-center w-screen items-center "
    >
    <div className="max-w-sm bg-white p-6 rounded-[30px] w-[500px]  text-black p-4">
      <div className="flex justify-between items-center flex flex-row gap-4">
        <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl">Join Table</h2>
      <button 
          onClick={onClose}
          className="bg-red-200 text-red-500 border-2 border-red-500 p-2 rounded-lg">
            Close
      </button>
      </div>

      <div className=" flex items-center justify-center flex-col gap-4 my-4">
        <input
          placeholder="Enter space code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border-2 border-gray-300 rounded-lg w-full p-3 "
          type="text"
        />

        <button
        onClick={handleJoinTable}
        className="bg-blue-200 rounded-full p-3 w-full text-blue-500 border-2 border-blue-500"
        >
          Join
        </button>
      </div>

      <div className="flex flex-row items-center justify-between mb-4">
        <hr />
        <span>Or</span>
        <hr />
      </div>

      <div 
      className="flex justify-center items-center"
      >
        <button 
        className="bg-white rounded-full p-2 w-full text-blue-500 border-2 border-blue-500">
          Request to join
        </button>
      </div>
    </div>
    </div>
  )
}