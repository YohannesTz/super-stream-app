import { useCallback, useEffect, useState } from "react";
import useChatConnection from "./useChatConnection";
import { MessageModel } from "../utils/models";

const MESSAGE_WINDOW: number = 3;

export default function useReactionMessage() {
  const [reactions, setReactions] = useState<Array<MessageModel>>([]);
  const socket = useChatConnection();

  const appendNewReactions = useCallback(
    (newMessage: MessageModel) => {
      const nextReactions: Array<MessageModel> = [
        ...reactions.slice(-MESSAGE_WINDOW),
        newMessage,
      ];
      setReactions(nextReactions);
    },
    [reactions]
  );

  useEffect(() => {
    socket?.on("reaction", (msg: MessageModel) => {
      console.log("rxn recieved!");
      appendNewReactions(msg);
    });

    return () => {
      console.log("close socket.");
      socket?.off("reaction");
    };
  }, [appendNewReactions, socket]);

  return {
    reactions,
  };
}
