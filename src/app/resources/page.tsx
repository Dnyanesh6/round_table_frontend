"use client"
import { useState } from "react";
import Sidebar from "../../components/sidebar"
import { useRouter } from "next/navigation";
import ShareResources from "../../components/shareResources";

export default function ResourcePage() {
    const [share,setShare] = useState(false);
    const router = useRouter();

    const handleMenuToggle = () => {
        // Logic to toggle the mobile menu
        console.log("Menu toggled");
        router.push("/sidebar"); // Navigate to the sidebar
    };
    return(
        <div className="flex flex-row h-screen w-screen bg-white">
            <Sidebar className="hidden md:flex h-full w-[200px] flex-shrink-0" />

            <div className="flex-1 p-4 h-full bg-white text-black overflow-y-auto">
                <button 
                onClick={handleMenuToggle}
                className="lg:hidden md:hidden p-2 mb-4 border rounded-lg text-black-700">
                    Menu
                </button>

                <div className="flex flex-col mt-4 sm:flex-row sm:items-center sm:justify-between">
                    {/* Mobile-first text size */}
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-[Instrument]">Resources</h1>
                    
                    {/* 2. Buttons: 'ml-130' removed, 'mt-4' for mobile stacking */}
                    <div className="flex flex-row mt-4 sm:mt-0 gap-2 md:gap-4 lg:gap-6 items-center">
                        <button
                        onClick={() => setShare(!share)}
                        className="mt-4 lg:p-2 bg-green-300 border p-2 border-green-500 rounded-lg text-green-700"> + Share Resources</button>
                    </div>
                </div>
            </div>

            {share && (
                        <div
                        className="fixed inset-0 flex items-center justify-center z-50">
                            {/* backdrop */}
                            <div 
                            onClick={() => setShare(false)}
                            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40">
                            </div>
            
                            {/* content */}
                        <div></div>
                            <div 
                            className="flex flex-col items-center w-screen m-20 mr-10 ml-10 justify-center inset-40  rounded-lg z-50">
                                <ShareResources onClose={() => setShare(false)} />
                            </div>
                        </div>
                    )}
        </div>
    )
}