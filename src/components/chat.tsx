"use client";

import { use, useEffect, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { socket } from "../utils/socket";
import { Socket } from "socket.io-client";

interface Participant {
  _id: string;
  username: string;
}

interface ChatType {
  chatId: string;
  participants: Participant[];
}

interface MessageType {
  _id: string;
  text: string;
  sender: {
    _id: string;
    username: string;
  };
  createdAt: string;
}

interface ChatProps {
  activeChat: ChatType;
  currentUserId: string;
}

export default function Chat({ activeChat, currentUserId }: ChatProps) {
  /* ---------------- DERIVED DATA ---------------- */
  const otherUser = activeChat?.participants?.find(
    (p) => p._id !== currentUserId
  );

  const [messages, setMessages] = useState<MessageType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [inputMessage, setInputMessage] = useState<string>("");

  const socketRef = useRef<Socket>(null);

  //  socket connection for receiving new messages
  useEffect(() => {
    if(!activeChat?.chatId) return;
    
    socketRef.current = socket;
    
    socket.on("connect", () => {
      console.log("Connected to chat socket",socket.id);
      socket.emit("joinChat", { chatId: activeChat.chatId });
    })
    
    socket.on("newMessage", (messages: MessageType) => {
      setMessages((prevMessages) => [...prevMessages, messages]);
    })
    
    socket.on("connect_error", () => {
      toast.error("Chat connection failed");
    })
    
    return () => {
      socket.disconnect();
      socketRef.current = null;
    }
  },[activeChat?.chatId]);
  
  // Fetch messages when activeChat changes
  useEffect(() => {
    if(!activeChat?.chatId) return;

    const fetchMessages = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/chat/${activeChat.chatId}/messages`,
          { withCredentials: true }
        )

        setMessages(res.data.messages);
      } catch (error) {
        toast.error("Failed to load messages.");
      } finally {
        setLoading(false);
      }
    }
    fetchMessages();
  }, [activeChat?.chatId]);

//  Send message function
const sendMessage = async () => {
  console.log("clicked send message");
    if(inputMessage.trim() === "" || !activeChat?.chatId) return;

    const tempMessage: MessageType = {
    _id: crypto.randomUUID(),          // temporary id
    text: inputMessage,
    sender: {
      _id: currentUserId,
      username: "You",
    },
    createdAt: new Date().toISOString(),
  };

      setMessages((prev) => [...prev, tempMessage]);

    try {
      const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/chat/create-message`,
      {
        chatId: activeChat.chatId,
        text: inputMessage,
      },
      { withCredentials: true }
    )
    } catch (error) {
      toast.error("Failed to send message.");
      console.log(error);
    }

    if(socketRef.current) {
      socketRef.current.emit("sendMessage", {
        chatId: activeChat.chatId,
        text: inputMessage,
        senderId: currentUserId,
      })

      setInputMessage("");
    }
}
 
  return (
    <div className="pt-8 h-full mb-2 rounded-lg p-4 mt-8 w-full lg:w-1/2">
      <div className="border h-full w-full border-gray-300 rounded-lg pt-6 p-4 flex flex-col">

        {/* HEADER */}
        <div className="flex gap-4 items-center border-b border-gray-300 pb-4">
          <img
            src="/next.svg"
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col flex-1">
            <p className="font-semibold text-gray-700 text-lg">
              {otherUser?.username}
            </p>
            <p className="text-sm text-gray-500">Member</p>
          </div>
          <span className="text-green-600 text-sm">Online</span>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto mt-4 p-2">
          {loading && (
            <p className="text-gray-400 text-center">Loading messages…</p>
          )}

          {!loading && messages.length === 0 && (
            <p className="text-gray-400 text-center">No messages yet</p>
          )}

          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`mb-2 ${
                msg.sender._id === currentUserId
                  ? "text-right"
                  : "text-left"
              }`}
            >
              <span
                className={`inline-block px-3 py-2 rounded-lg text-sm ${
                  msg.sender._id === currentUserId
                    ? "bg-blue-200 text-blue-900"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </span>
            </div>
          ))}
        </div>

        {/* INPUT */}
        <div className="mt-4 flex gap-2">
          <input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            type="text"
            placeholder="Type your message..."
            className="w-full border border-gray-300 rounded-lg p-2"
          />
          <button
            onClick={sendMessage}
            className="border border-blue-500 bg-blue-200 text-blue-500 rounded-lg px-4"
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
}
