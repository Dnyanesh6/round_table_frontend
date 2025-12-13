// import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import Link from "next/link"
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
        <div className={`flex flex-col w-64 h-full w-screen border-r border-gray-300 bg-white text-black p-4 ${className}`}>
            <div className="flex flex-row">
                <h2 className="text-lg font-bold mb-8 sm:text-4xl md:text-5xl">Roundtable</h2>
                {/* <button className="text-lg font-bold pl-24 pr-0 mb-8 w-screen sm:text-4xl md:text-5xl">Back </button> */}
            </div>
            <div className="flex flex-col justify-center items-center">
                <Link href={`/hero/${userId}`}>
                <div className="p-2">Roundtables</div>
                </Link>
                
                <Link href={`/resources/${userId}`}>
                <div className="p-2">Resources</div>
                </Link>
                
                <Link href={`/resourcecd/${userId}`}>
                <div className="p-2">Showcase</div>
                </Link>
            </div>

            {/* <div className="flex flex-col justify-center items-center">
                <div className="p-2 md:text-4xl">Settings</div>
                <div className="p-2 md:text-4xl">Profile</div>
            </div> */}
        </div>
    )
}


