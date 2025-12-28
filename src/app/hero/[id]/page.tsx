"use client"
import { useParams } from "next/navigation";
import Sidebar from "../../../components/sidebar";
import JoinTable from "../../../components/jointable";
import CreateTable from "../../../components/createtable";
import Chat from "../../../components/chat";
import { toast } from "react-hot-toast";
import {useState,useEffect} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
interface Member {
  user: {
    _id: string;
    username: string;
  };
  role: string;
}

interface Table {
  _id: string;
  tableName: string;
  coverImage: string;
  members: Member[];
}

interface Buddy {
    userId: string;
    username: string;
    role: string;
    tableName: string;
    tableId: string;
}

interface Pagination {
    page: number;
    totalPages: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
}

interface ChatType {
    chatId: string;
    participants: {
    _id: string;
    username: string;
}[];
}
export default function HeroPage() {
    console.log("🔥 HERO PAGE RUNNING");

    const router = useRouter();
    const [join, setJoin] = useState(false);
    const [create, setCreate] = useState(false);
    const [buddies, setBuddies] = useState<Buddy[]>([]);
    
    //fetching table data of the user
    const [tables, setTables] = useState<Table[]>([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const LIMIT = 6;
    
    // chat activities
    const [activeChat, setActiveChat] = useState<ChatType | null>(null);
    
    const params = useParams<{ id: string }>();
    const userId = params.id;
    // fetch buddies
    useEffect(() => {
        const getBuddies = async () => {
            try {
                const res = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/tables/getbuddies`,
                {withCredentials: true}
            )

            if (res) {
                console.log(res.data.buddies);
                setBuddies(res.data.buddies);
            }

            } catch (error) {
                throw new Error("Failed to fetch buddies");
            }
        }

        getBuddies();
    }, [])

    //fetch tables with pagination
    const fetchTables = async (pageNumber = 1) => {
        try {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/tables/getusertables?page=${pageNumber}&limit=${LIMIT}`,
                {
                    withCredentials: true,
                }
            )

            setTables(res.data.tables);
            setPagination(res.data.pagination);
            setPage(pageNumber);
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch table data");
        }
    }

    //fetch tables with pagination
    useEffect(() => {
        const loadTables = async () => {
            await fetchTables(1);
        };
        loadTables();
    }, []);

    const startChat = async (userId: string) => {
    alert("START CHAT CLICKED");
    console.log("START CHAT CLICKED", userId);
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/chat/create`,
            {recipientId: userId},
            {withCredentials: true}
        );
        console.log(res);
        
        setActiveChat(res.data);
        console.log(activeChat);
    }

    useEffect(() => {
  console.log("activeChat updated:", activeChat);
}, [activeChat]);


    // Mobile menu toggle handler (for hamburger menu)
    const handleMenuToggle = () => {
        // Logic to toggle the mobile menu
        console.log("Menu toggled");
        router.push("/sidebar"); // Navigate to the sidebar
    };

    const navigateTable = (tableId: string) => {
        router.push(`/dashboard/${tableId}`);
    }

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

                {tables.length === 0 && (
                    <p className="text-gray-500">You have not joined any tables yet.</p>
                )}

                {tables.map((table) => {
                    return (
                        <div key={table._id}
                        onClick={() => navigateTable(table._id)}
                        className="border border-gray-300 rounded-lg p-4"
                        >   
                        <img src={table.coverImage || "/next.svg"} 
                        alt="Cover Image"
                        className="w-10 h-10 rounded-full"
                        />

                        <h2 className="text-l mb-2">{table.tableName}</h2>
                        
                        <p className="mt-2 font-medium">Members:</p>
                        <div className="flex gap-2 flex-wrap">
                        {table.members.map((m) => (
                            <span key={m.user._id} className="bg-gray-200 px-2 py-1 rounded text-sm">
                                {m.user.username}
                            </span>
                        ))}
                        </div>
                        </div>
                    )
                })
                }
                </div>

                <div className="flex justify-center items-center gap-4 mt-6">
                    <button
                        disabled={!pagination?.hasPrevPage}
                        onClick={() => fetchTables(page - 1)}
                        className="px-4 py-2 border rounded disabled:opacity-50"
                    >
                    Previous
                    </button>

                    <span>
                        Page {pagination?.page} of {pagination?.totalPages}
                    </span>

                    <button
                        disabled={!pagination?.hasNextPage}
                        onClick={() => fetchTables(page + 1)}
                        className="px-4 py-2 border rounded disabled:opacity-50"
                    >
                        Next
                    </button>
            </div>

                <div className="mt-12"> {/* Added margin-top for spacing */}
                    <h1 className="text-3xl lg:text-4xl">Your Buddies</h1>
                    
                    {/* 3. Buddies/Chat Container: Stacks on mobile ('flex-col'), row on 'lg' */}
                    <div className="flex flex-col lg:flex-row gap-8 pt-8 ">
                        
                        {/* 3. Buddies List: Full width by default, half on 'lg' */}
                        <div className="flex flex-col w-full lg:w-1/2 pt-8 gap-4">
                            {/* Map through your buddies and display them here */}


                            {/* list the buddies in all tables */}
                            {buddies.length === 0 && (
                                <p className="text-gray-500">You have no buddies yet.</p>
                            )}

                            {buddies.map((buddy) => {
                                return (
                                    <div 
                                    key={buddy.userId}
                                    className="border flex flex-row items-center border-gray-300 rounded-lg p-4">

                                    {/* <img src="/path" alt="Icon of the buddy" /> */}
                                <div className="flex-1 flex-row mx-4">
                                    <h2 className="text-xl mb-2">{buddy.username}</h2>
                                    <div className="flex flex-row items-center">
                                        {buddy.role === "admin" ? "Admin" : "Member"}
                                    </div>
                                </div>

                                <button
                                onClick={() => startChat(buddy.userId)}
                                className="text-blue-500 p-2 h-10 bg-blue-300 rounded-lg flex-shrink-0"
                                >Chat
                                </button>
                            </div>
                                )
                            })}
                            
                        </div>

                        {/* 3. Chat Section: Full width by default, half on 'lg' */}
                        {activeChat != null ? (
                            <Chat activeChat={activeChat} currentUserId={userId}/>
                        ):(
                            <div className="pt-8 h-full mb-2 border border-gray-300 rounded-lg p-4 mt-8 w-full lg:w-1/2 flex items-center justify-center">
                                <p className="text-gray-500">Select a buddy to start chatting.</p>
                            </div>
                        )}
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