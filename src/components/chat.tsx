"use client";

interface ChatProps {
  activeChat: {
    _id: string;
    participants: {
      _id: string;
      username: string;
    }[];
  };
  currentUserId: string;
}

export default function Chat({ activeChat, currentUserId }: ChatProps) {
    const otherUser = activeChat.participants.find(
    (p) => p._id !== currentUserId
    );

return (
    <div className="pt-8 h-full mb-2 border border-gray-300 rounded-lg p-4 mt-8 w-full lg:w-1/2">
    <div className="border h-full w-full border-gray-300 rounded-lg pt-8 p-4">
        
        {/* Header */}
        <div className="flex gap-4 items-center border-b border-gray-300 pb-4">
        <img
            src="/default-avatar.svg"
            alt="icon"
            className="w-10 h-10 rounded-full"
        />

        <div className="flex flex-col flex-1">
            <p className="font-semibold text-lg">
            {otherUser?.username}
            </p>
            <p className="text-sm text-gray-500">Member</p>
        </div>

            <span className="text-green-600 text-sm">Online</span>
        </div>

        {/* Messages */}
        <div className="h-96 rounded-lg mt-4 p-4 overflow-y-auto">
          {/* messages go here */}
        </div>

        {/* Input */}
        <div className="mt-4 flex gap-2">
            <input
            type="text"
            placeholder="Type your message..."
            className="w-full border border-gray-300 rounded-lg p-2"
            />
            <button className="border border-blue-500 bg-blue-200 text-blue-500 rounded-lg p-2">
            Send
            </button>
        </div>

        </div>
    </div>
);
}
