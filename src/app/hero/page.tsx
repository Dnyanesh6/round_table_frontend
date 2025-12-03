"use client"
import Sidebar from "../../components/sidebar";
import JoinTable from "../../components/jointable";
import CreateTable from "../../components/createtable";
import React from "react";
import {useState,useEffect} from "react";
import { useRouter } from "next/navigation";

export default function HeroPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [join, setJoin] = useState(false);
    const [create, setCreate] = useState(false);


    // getting session info



    // Mobile menu toggle handler (for hamburger menu)
    const handleMenuToggle = () => {
        // Logic to toggle the mobile menu
        console.log("Menu toggled");
        router.push("/sidebar"); // Navigate to the sidebar
    };

    // If loading session info, you might want to show a loading state
    
    return (
        // 1. Main layout: flex-row for desktop, but flex (col) for mobile is
        // handled by hiding the sidebar.
        <div className="flex flex-row h-screen w-screen bg-white">
            
            {/* 1. Sidebar: Hidden by default, shown on 'md' screens and up */}
            {/* 'flex-shrink-0' prevents it from shrinking */}
            <Sidebar className="hidden md:flex h-full w-[200px] flex-shrink-0" />

            {/* 1. Main Content: Takes full width, scrolls vertically */}
            <div className="flex-1 p-4 h-full bg-white text-black overflow-y-auto">
                
                {/* 1. Mobile Hamburger Menu (requires state to be functional) */}
                <button 
                onClick={handleMenuToggle}
                className="lg:hidden md:hidden p-2 mb-4 border rounded-lg text-black-700">
                    Menu
                </button>

                {/* 2. Header: Stacks on mobile, row on 'sm' and up */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    {/* Mobile-first text size */}
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-[Instrument]">Your collaborative Tables</h1>
                    
                    {/* 2. Buttons: 'ml-130' removed, 'mt-4' for mobile stacking */}
                    <div className="flex flex-row mt-4 sm:mt-0 gap-2 md:gap-4 lg:gap-6 items-center">
                        <button
                        onClick={() => setJoin(true)}
                        className="mt-4 lg:p-2 bg-blue-300 p-2 border border-blue-500 rounded-lg text-blue-700">Join table</button>
                        <button 
                        onClick={() => setCreate(true)}
                        className="mt-4 lg:p-2 bg-green-300 border p-2 border-green-500 rounded-lg text-green-700"> + Create table</button>
                    </div>
                </div>

                <div className="bg-black/30 h-px w-full my-6">
                </div>

                {/* Your collaborative tables will be displayed here */}
                {/* This grid is already responsive, which is great! */}
                <div className="grid pt-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Map through your collaborative tables and display them here */}

                    <div className="border border-gray-300 rounded-lg p-4">
                        <img src="/path" alt="Icon of the organization" />
                        <h2 className="text-2xl mb-2">Org</h2>
                        <p>Details</p>
                        <div className="flex flex-row items-center">
                            Members
                        </div>
                    </div>
                    {/* ...other table cards... */}

                    <div className="border border-gray-300 rounded-lg p-4">
                        <img src="/path" alt="Icon of the organization" />
                        <h2 className="text-2xl mb-2">Org</h2>
                        <p>Details</p>
                        <div className="flex flex-row items-center">
                            Members
                        </div>
                    </div>
                </div>


                <div className="mt-12"> {/* Added margin-top for spacing */}
                    <h1 className="text-3xl lg:text-4xl">Your Buddies</h1>
                    
                    {/* 3. Buddies/Chat Container: Stacks on mobile ('flex-col'), row on 'lg' */}
                    <div className="flex flex-col lg:flex-row gap-8 pt-8 ">
                        
                        {/* 3. Buddies List: Full width by default, half on 'lg' */}
                        <div className="flex flex-col w-full lg:w-1/2 pt-8 gap-4">
                            {/* Map through your buddies and display them here */}

                            <div className="border flex flex-row items-center border-gray-300 rounded-lg p-4">
                                <img src="/path" alt="Icon of the buddy" />
                                <div className="flex-1 flex-row mx-4">
                                    <h2 className="text-2xl mb-2">Buddy</h2>
                                    <div className="flex flex-row items-center">
                                        Members
                                    </div>
                                </div>
                                <button className="text-blue-500 p-2 h-10 bg-blue-300 rounded-lg flex-shrink-0">Chat</button>
                            </div>
                            {/* ...other buddy cards... */}
                        </div>

                        {/* 3. Chat Section: Full width by default, half on 'lg' */}
                        <div className="pt-8 h-full mb-2 border border-gray-300 rounded-lg p-4 mt-8 w-full lg:w-1/2">
                            {/* Removed extra w-1/2 and wrapper div */}
                            <div className="border h-full w-full border-gray-300 rounded-lg pt-8 p-4">
                                {/* 4. Chat header */}
                                <div className="flex h-full gap-4 items-center border-b border-gray-300 pb-4">
                                    <img src="/path/to/chat/image" alt="icon" />
                                    {/* 4. 'flex-1' to push button to the right */}
                                    <div className="flex flex-col flex-1">
                                        <p>Name</p>
                                        <p>Member</p>
                                    </div>
                                    <button className="border border-2 border-green-500 p-2 text-green-500 bg-green-200 rounded-lg flex-shrink-0">Online</button>
                                </div>

                                <div className="h-96 rounded-lg mt-4 p-4 overflow-y-auto">
                                    {/* chat messages will go here */}
                                </div>

                                <div className="mt-4 flex flex-row gap-2">
                                    <input
                                        type="text"
                                        placeholder="Type your message..."
                                        className="w-full border border-gray-300 rounded-lg p-2"
                                    />
                                    <button className="border border-2 border-blue-500 bg-blue-200 text-blue-500 rounded-lg p-2">Send</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* // pop up model for joining a table */}
        {join && (
            <div
            className="fixed inset-0 flex items-center justify-center z-50">
                {/* backdrop */}
                <div 
                onClick={() => setJoin(false)}
                className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40">
                </div>

                {/* content */}
            <div></div>
                <div 
                className="flex flex-col items-center w-screen m-20 mr-10 ml-10 justify-center inset-40  rounded-lg z-50">
                    <JoinTable onClose={() => setJoin(false)} />
                </div>
            </div>
        )}

        {/* // pop up model for creating a table */}
        {create && (
            <div
            className="fixed inset-0 flex items-center justify-center z-50">
                {/* backdrop */}
                <div 
                onClick={() => setCreate(false)}
                className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40">
                </div>

                {/* content */}
            <div></div>
                <div 
                className="flex flex-col items-center w-screen m-20 mr-10 ml-10 justify-center inset-40  rounded-lg z-50">
                    <CreateTable onClose={() => setCreate(false)} />
                </div>
            </div>
        )}
            </div>
        </div>
    );
}