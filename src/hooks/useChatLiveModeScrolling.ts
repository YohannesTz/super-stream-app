import { useCallback, useEffect, useRef, useState } from "react";
import { MessageModel } from "../utils/models";

export default function useChatLiveModelScrolling<T extends HTMLElement>(
  messages: MessageModel[]
) {
  const [isLiveModeEnabled, setIsLiveModelEnabled] = useState(false);
  const chatMessageBoxRef = useRef<T | null>(null);

  const scrollNewMessages = useCallback(() => {
    chatMessageBoxRef.current?.lastElementChild?.scrollIntoView();
  }, []);

  useEffect(() => {
    //if (isLiveModeEnabled) {
      scrollNewMessages();
    //}
  }, [messages, isLiveModeEnabled, scrollNewMessages]);

  return {
    chatMessageBoxRef,
    isLiveModeEnabled,
    scrollNewMessages,
  };
}
