export default function Sidebar({className=""}) {
    return (
        <div className={`flex flex-col w-64 h-full border-r border-gray-300 bg-white text-black p-4 ${className}`}>
            <h2>Roundtable</h2>
            <div className="flex flex-col justify-center">
                <div className="p-2">Goal Board</div>
                <div className="p-2">Roundtables</div>
                <div className="p-2">Resources</div>
                <div className="p-2">Showcase</div>
            </div>

            <div className="mt-2 p-2">
                <div className="p-2">Settings</div>
                <div className="p-2">Profile</div>
            </div>
        </div>
    )
}


