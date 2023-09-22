import { useCallback, useEffect, useState } from "react";
import { MessageModel, MediaContent, TextContent } from "../utils/models";
import { faker } from "@faker-js/faker";
import useChatConnection from "./useChatConnection";

const MESSAGE_WINDOW = 30;

const welcomeMessage: MessageModel = {
  id: faker.number.int(),
  content: {
    chatId: faker.number.int(),
    type: faker.lorem.word(),
    date: faker.number.int(),
    text: "Welcome to Chat!",
  },
  author: {
    id: faker.number.int(),
    firstName: "Welcome Bot",
    username: "welcome_bot",
    isBot: faker.datatype.boolean(),
    currentBadge: faker.helpers.arrayElement(["mod", "host", "sub", "normal"]),
    color: faker.internet.color(),
  },
};

export default function useChatMessages() {
  const [messages, setMessages] = useState<Array<MessageModel>>([
    welcomeMessage,
  ]);
  const socket = useChatConnection();

  const appendNewMessages = useCallback(
    (newMessage: MessageModel) => {
      const nextMessages: Array<MessageModel> = [
        ...messages.slice(-MESSAGE_WINDOW),
        newMessage,
      ];
      setMessages(nextMessages);
    },
    [messages]
  );

  useEffect(() => {
    socket?.on("message", (msg: MessageModel) => {
      appendNewMessages(msg);
    });

    return () => {
      console.log("close socket.");
      socket?.off("message");
    };
  }, [appendNewMessages, socket]);

  return {
    messages,
  };
}
