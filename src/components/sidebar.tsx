import Link from "next/link"
export default function Sidebar({className=""}) {
    return (
        <div className={`flex flex-col w-64 h-full border-r border-gray-300 bg-white text-black p-4 ${className}`}>
            <h2>Roundtable</h2>
            <div className="flex flex-col justify-center">
                <Link href='/dashboard[id]'>
                <div className="p-2">Goal Board</div>
                </Link>

                <Link href='/hero'>
                <div className="p-2">Roundtables</div>
                </Link>
                
                <Link href='/resources'>
                <div className="p-2">Resources</div>
                </Link>
                
                <Link href='/showcase'>
                <div className="p-2">Showcase</div>
                </Link>
            </div>

            <div className="mt-2 p-2">
                <div className="p-2">Settings</div>
                <div className="p-2">Profile</div>
            </div>
        </div>
    )
}


