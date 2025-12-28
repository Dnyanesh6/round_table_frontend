function getCookie(name: string) {
  return document.cookie
    .split("; ")
    .find(row => row.startsWith(name + "="))
    ?.split("=")[1];
}

import { io } from "socket.io-client";
export const socket = io(process.env.NEXT_PUBLIC_CHAT_API_URL!, {
  withCredentials: true,
  auth: {
    token: getCookie("token"),
  },
});
