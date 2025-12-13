"use client"

import Link from "next/link"
// import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Sidebar({className=""}) {
    // const router = useRouter();
    const [userId, setUser] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/users/me`,
                {withCredentials: true}
            )
            setUser(res.data.user._id);
        }

        loadUser();
    }, [])
    
    return (
        <div className={`flex flex-col w-64 h-full border-r border-gray-300 bg-white text-black p-4 ${className}`}>
            <h2>Roundtable</h2>
            <div className="flex flex-col justify-center">
                {/* <Link href={`/dashboard/${userId}`}>
                <div className="p-2">Goal Board</div>
                </Link> */}

                <Link href={`/hero/${userId}`}>
                <div className="p-2">Roundtables</div>
                </Link>
                
                <Link href={`/resources/${userId}`}>
                <div className="p-2">Resources</div>
                </Link>
                
                <Link href={`/showcase/${userId}`}>
                <div className="p-2">Showcase</div>
                </Link>
            </div>

            {/* <div className="mt-2 p-2">
                <div className="p-2">Settings</div>
                <div className="p-2">Profile</div>
            </div> */}
        </div>
    )
}


