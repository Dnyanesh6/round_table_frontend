import React from "react";
import { useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function JoinTable({ onClose }: { onClose: () => void }) {
  const [space, setSpace] = useState({
    code:"",
    role:"member",
    space_id:"",
    user_id:""
  });

  const handleJoin = async () => {
    try {
      const {data:spaceData, error} = await supabase
      .from('spaces')
      .select('*')
      .eq('invite_code', space.code)
      .single();

      if (error) {
        console.log("Error fetching space:", error);
        return;
      } else {
        return spaceData;
      }
    } catch (error) {
      console.log("Error joining space:", error);
    }

    setSpace({
    ...space,
    space_id: space.code,
    user_id: (await supabase.auth.getUser()).data.user?.id || ""
    });

    const { data, error } = await supabase
      .from('members')
      .insert([space]);

    if (error) {
      console.log("Error inserting member:", error);
    } else {
      console.log("Member inserted successfully:", data);
      onClose();
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
          className="border-2 border-gray-300 rounded-lg w-full p-3 "
          type="text"
        />

        <button
          onClick={handleJoin}
        className="bg-blue-200 rounded-full p-3 w-full text-blue-500 border-2 border-blue-500"
        >
          Continue
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
        <button className="bg-white rounded-full p-2 w-full text-blue-500 border-2 border-blue-500">
          Request to join
        </button>
      </div>
    </div>
    </div>
  )
}