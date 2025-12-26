import { io } from "socket.io-client";

export const socket = io(
  process.env.NEXT_PUBLIC_CHAT_API_URL!,
  { withCredentials: true,
    auth:{
      token: document.cookie
    }
  },
);
