export default function Sidebar({className=""}) {
    return (
        <div className={`flex flex-col w-64 h-full w-screen border-r border-gray-300 bg-white text-black p-4 ${className}`}>
            <div className="flex flex-row">
                <h2 className="text-lg font-bold mb-8 sm:text-4xl md:text-5xl">Roundtable</h2>
                {/* <button className="text-lg font-bold pl-24 pr-0 mb-8 w-screen sm:text-4xl md:text-5xl">Back </button> */}
            </div>
            <div className="flex flex-col justify-center items-center">
                <div 
                
                className="p-2 md:text-4xl">Dashboard</div>
                <div 
                
                className="p-2 md:text-4xl">Goal Board</div>
                <div 
                
                className="p-2 md:text-4xl">Roundtables</div>
                <div 
                
                className="p-2 md:text-4xl">Resources</div>
                <div className="p-2 md:text-4xl">Showcase</div>
            </div>

            <div className="flex flex-col justify-center items-center">
                <div className="p-2 md:text-4xl">Settings</div>
                <div className="p-2 md:text-4xl">Profile</div>
            </div>
        </div>
    )
}


