"use client"

// 🔹 Added 'useState' for the mobile menu
import React, { useState } from "react"; 
import { useRouter } from "next/navigation";
import Sidebar from "../../components/sidebar";
import TaskItem from "../../components/taskItem";
import AddGoals from "../../components/addGoals";
import SchedulePoll from "../../components/schedulePoll";

// 🔹 Import the TaskItem component you created
// import TaskItem from "@/components/TaskItem";

// 🔹 Mock data for the task list
const tasks = [
  {
    id: 1,
    title: "Grok based n8n agents",
    dueDate: "July 15, 2025",
    statusColor: "bg-purple-500",
    tags: [
      { name: "To do", bgColor: "bg-yellow-100", textColor: "text-yellow-700" },
      { name: "Dev", bgColor: "bg-purple-100", textColor: "text-purple-700" },
    ],
    description: "Design and implement intelligent task agents using n8n...",
  },
  {
    id: 2,
    title: "Complete n8n workflow",
    dueDate: "July 15, 2025",
    statusColor: "bg-purple-500",
    tags: [
      { name: "To do", bgColor: "bg-yellow-100", textColor: "text-yellow-700" },
      { name: "Dev", bgColor: "bg-purple-100", textColor: "text-purple-700" },
    ],
    description: "This is the description for the second task...",
  },
];


export default function DashboardPage() {
    const router = useRouter();
    const [add, setAdd] = useState(false);
    const [schedule, setSchedule] = useState(false);
    const [isAdmin, setIsAdmin] = useState(true); // Mock admin status
    
    // 🔹 State to control the mobile menu
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // 🔹 Updated handler to toggle the state
    const handleMenuToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        /* 🔹 Removed p-4, as content div already has it */
        <div className="flex flex-col md:flex-row h-screen w-screen bg-white">
            
            {/* Sidebar (Desktop) */}
            <Sidebar className="hidden md:flex h-full w-[200px] flex-shrink-0" />
            
            {/* 🔹 Mobile Sidebar Menu (Conditionally Rendered) */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-50 flex">
                    {/* The Sidebar */}
                    <Sidebar className="h-full w-[200px] flex-shrink-0 bg-white shadow-lg z-10" />
                    
                    {/* Backdrop to close menu */}
                    <div 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex-1 bg-black/30 backdrop-blur-sm"
                    ></div>
                </div>
            )}

            <div className="flex-1 p-4 md:p-6 h-full bg-white text-black overflow-y-auto">

                {/* Mobile Menu Button */}
                <button 
                    onClick={handleMenuToggle}
                    className="md:hidden p-2 mb-4 border rounded-lg border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                >
                    Menu
                </button>

                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[Instrument]">
                        Good Morning, Captain
                    </h1>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                    <div className="border-2 p-4 rounded-lg border-gray-300 text-center">
                        <div className="text-2xl font-semibold">1</div>
                        <div className="mt-2 text-gray-600 text-sm sm:text-base">Tasks Due</div>
                    </div>

                    <div className="border-2 p-4 rounded-lg border-gray-300 text-center">
                        <div className="text-2xl font-semibold">1</div>
                        <div className="mt-2 text-gray-600 text-sm sm:text-base">Tasks in progress</div>
                    </div>

                    <div className="border-2 p-4 rounded-lg border-gray-300 text-center">
                        <div className="text-2xl font-semibold">1</div>
                        <div className="mt-2 text-gray-600 text-sm sm:text-base">Tasks completed</div>
                    </div>

                    <div className="border-2 p-4 rounded-lg border-gray-300 text-center">
                        <div className="text-2xl font-semibold">1</div>
                        <div className="mt-2 text-gray-600 text-sm sm:text-base">Upcoming meetings</div>
                    </div>
                </div>

                {/* Charts & Meetings Section */}
                <div className="mt-12 flex flex-col lg:flex-row gap-6">
                    
                    {/* Calendar */}
                    <div className="w-full lg:w-1/3">
                        <h1 className="text-xl sm:text-2xl font-semibold">Schedule</h1>
                        {isAdmin ? (
                            <button 
                        onClick={() => setSchedule(true)}
                        className="mt-4 p-2 w-full sm:w-auto border rounded-lg text-blue-500 border-blue-500 bg-blue-100 hover:bg-blue-200 transition">
                            + Schedule meeting
                        </button>
                        ): (
                            <button 
                        onClick={() => setSchedule(true)}
                        className="mt-4 p-2 w-full sm:w-auto border rounded-lg text-blue-500 border-blue-500 bg-blue-100 hover:bg-blue-200 transition">
                            Vote
                        </button>
                        )}
                    </div>

                    {/* Meeting details */}
                    <div className="w-full lg:w-2/3">
                        <div className="border-2 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-lg border-gray-300 gap-4 sm:gap-6">
                            
                            <div className="flex flex-col">
                                <h1 className="font-semibold text-lg">Title</h1>
                                <span className="text-sm text-gray-500">date</span>
                            </div>

                            <div className="text-sm sm:text-base text-gray-700">meet code</div>

                            <button 
                                className="bg-blue-300 border-2 border-blue-500 text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-400 transition"
                            >
                                Join via Meet
                            </button>
                        </div>
                    </div>
                </div>

                {/* Goals Section */}
                {/* 🔹 Changed to flex-col to stack header and list */}
                <div className="mt-12 flex flex-col gap-4">
                    <div className="flex w-full flex-row justify-between items-center">
                        {/* 🔹 Renamed title to match the section */}
                        <h1 className="text-xl sm:text-2xl font-semibold">Your Goals</h1>
                        <button 
                        onClick={() => setAdd(true)}
                        className="border-2 p-2 border-green-500 text-green-500 bg-green-300 rounded-lg">+ Add Goals</button>
                    </div>

                    {/* tasks list */}
                    {/* 🔹 Added the task list implementation (assuming TaskItem component exists) */}
                    <div className="flex flex-col gap-4">
                        {tasks.map((task, index) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                // The first item will be open by default
                            />
                        ))}
                        
                        {/* 🔹 Placeholder if TaskItem is not ready: */}
                        {!tasks.length && <div className="p-4 border rounded-lg border-gray-300">Task list goes here...</div>}
                        
                    </div>
                </div>
            </div>

            {add && (
                        <div
                        className="fixed inset-0 flex items-center justify-center z-50">
                            {/* backdrop */}
                            <div 
                            onClick={() => setAdd(false)}
                            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40">
                            </div>
            
                            {/* content */}
                            <div 
                            className="flex flex-col items-center w-screen m-20 mr-10 ml-10 justify-center inset-40  rounded-lg z-50">
                                <AddGoals  onClose={() => setAdd(false)}/>
                            </div>
                        </div>
            
            )}

            {schedule && (
                        <div
                        className="fixed inset-0 flex items-center justify-center z-50">
                            {/* backdrop */}
                            <div 
                            onClick={() => setSchedule(false)}
                            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40">
                            </div>
            
                            {/* content */}
                        <div></div>
                            <div 
                            className="flex flex-col items-center w-screen m-20 mr-10 ml-10 justify-center inset-40  rounded-lg z-50">
                                <SchedulePoll onClose={() => setSchedule(false)} />
                            </div>
                        </div>            
            )}
        </div>
    );
}