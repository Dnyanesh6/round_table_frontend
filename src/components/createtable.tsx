"use client";
import React, { useState } from "react";
import axios from "axios";

export default function CreateTable({ onClose }: { onClose: () => void }) {
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const [space, setSpace] = useState({
    name: "",
    description: "",
  });

  // Get selected file
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    if (f) setImage(URL.createObjectURL(f));
  };

  // SUBMIT FUNCTION
  const handleCreate = async () => {
    const formData = new FormData();

    // Append text fields
    formData.append("tableName", space.name);
    formData.append("description", space.description);

    // Append file ONLY IF exists
    if (file) {
      formData.append("image", file); // key must match multer.single("image")
    }

    const res = await axios.post("api/table/createTable", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res.data);
    onClose();

    if (!res) {
      onClose();
    }
  };

  return (
    <div className="max-w-sm bg-white p-6 rounded-[30px] w-[500px] text-black p-4">
      <div className="flex justify-between items-center flex-row gap-4">
        <h2 className="text-4xl font-[Instrument] mb-4">Create table</h2>
        <button 
          onClick={onClose}
          className="bg-red-200 text-red-500 border-2 border-red-500 p-2 rounded-lg">
            Close
        </button>
      </div>

      {/* Image Upload Section */}
      <div className="flex flex-row items-center justify-between mb-6">
        <div className="w-28 h-28 border-2 border-gray-300 rounded-xl flex items-center justify-center overflow-hidden">
          {image ? (
            <img src={image} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-400 text-sm">No image</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Add cover image</h3>

          <label className="cursor-pointer bg-blue-200 text-blue-500 rounded-md px-3 py-1">
            Upload
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
        </div>
      </div>

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

      <button
        onClick={handleCreate}
        className="bg-blue-200 border-2 border-blue-500 text-blue-500 w-full rounded-full py-2"
      >
        Create
      </button>
    </div>
  );
}