import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const ENDPOINT = import.meta.env.VITE_SOCKET_ENDPOINT;
console.log(ENDPOINT);

const connect = () => {
  const socket = io(ENDPOINT, {
    reconnectionAttempts: 5,
  });

  console.log("trying to connect.. ");

  socket.on("connect_error", (error) => {
    console.error("Connection error:", error);
  });

  return socket;
};

export default function useChatConnection() {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    console.log("Connecting...");
    const socket = connect();
    console.log("isConnected: ", socket.connected);

    setSocket(socket);

    return () => {
      console.log("Disconnecting...");
      socket.close();
    };
  }, []);

  return socket;
}