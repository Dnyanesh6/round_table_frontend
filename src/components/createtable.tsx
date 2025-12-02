"use client";
import React, { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/navigation";

export default function CreateTable({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  // const [inviteCode, setInviteCode] = useState("");
  const [image, setImage] = useState<string | null>(null); // store preview
  const [file, setFile] = useState<File | null>(null); // store actual file
  const [space, setSpace] = useState({
    name: "",
    description: "",
    imageUrl: "",
    invite_code:"",
    created_by:""
  })

  // Handle file upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    setFile(file || null);
    if (file) {
      setImage(URL.createObjectURL(file)); // create a preview URL
    }
  };

  const handleCreate = async () => {
    // Logic to create the table/space goes here
    const imageUrl = image
    console.log(imageUrl);
    console.log(file);
    
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    if (file) {
      const fileName = `${Date.now()}_${file.name}`;
      const { data, error } = await supabase.storage
        .from("Roundtable")
        .upload(`space_cover/${fileName}`, file);

        if (error) {
          console.error("Error uploading image:", error);
          return;
        } else {
          console.log("Image uploaded successfully:", data);
        }
    }

    console.log(space,{
      name: space.name,
      description: space.description,
      imageUrl: imageUrl,
      invite_code: code
    });

    const {data:{user},error} = await supabase.auth.getUser();
    console.log(user?.id);

    const { data: sessionData } = await supabase.auth.getSession();
  console.log("Session:", sessionData);


    if(!user || error){
      console.log("User not logged in");
      return;
    }

    const {data, error:insertError} = await supabase
      .from("spaces")
      .insert([{
        name: space.name,
        description: space.description,
        image_path: imageUrl,
        invite_code: code,
        created_by: user.id
      }])
      .select();

  console.log("Payload inserting into spaces:", {
  name: space.name,
  description: space.description,
  image_path: imageUrl,
  invite_code: code,
  created_by: user.id
});


      console.log("Insert response:", { data, insertError });
      if (data) {
        console.log("Space created successfully:", data);
        router.push(`/dashboard/${data[0].invite_code}`);
        onClose();
        return data;
      } else {
        console.log("Error creating space:", insertError);
      }
  }

  return (
    <div className="max-w-sm bg-white p-6 rounded-[30px] w-[500px] text-black p-4">
      <div className="flex justify-between items-center flex flex-row gap-4">
        <h2 className="text-4xl font-[Instrument] mb-4">Create table</h2>
      <button 
          onClick={onClose}
          className="bg-red-200 text-red-500 border-2 border-red-500 p-2 rounded-lg">
            Close
      </button>
      </div>
      
      {/* Image Upload Section */}
      <div className="flex flex-row items-center justify-between mb-6">
        {/* Preview box */}
        <div className="w-28 h-28 border-2 border-gray-300 rounded-xl flex items-center justify-center overflow-hidden">
          {image ? (
            <img
              src={image}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-400 text-sm">No image</span>
          )}
        </div>

        {/* Upload section */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Add cover image</h3>

          {/* Hidden input + styled label */}
          <label className="cursor-pointer bg-blue-200 text-blue-500 rounded-md px-3 py-1">
            Upload
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Name and Description Inputs */}
      <input
        type="text"
        placeholder="Give your Space a name"
        className="border-2 border-gray-300 rounded-xl p-3 w-full mb-3"
        value={space.name}
        onChange={(e) => setSpace({ ...space, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        className="border-2 border-gray-300 rounded-xl p-3 w-full mb-4"
        value={space.description}
        onChange={(e) => setSpace({ ...space, description: e.target.value })}
      />

      {/* Create Button */}
      <button 
        onClick={handleCreate}
        className="bg-blue-200 border-2 border-blue-500 text-blue-500 w-full rounded-full py-2">
        Create
      </button>
    </div>
  );
}