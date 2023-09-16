import React from "react";
import useChatLiveModelScrolling from "../hooks/useChatLiveModeScrolling";
import useChatMessages from "../hooks/useChatMessages";
import { MessageModel } from "../utils/models";
import ChatMessage from "./ChatMessage";

type ChatProps = {
    className?: string;
};


const Chat: React.FC<ChatProps> = ({ className }) => {
    const { messages } = useChatMessages();
    const { chatMessageBoxRef } = useChatLiveModelScrolling<HTMLDivElement>(messages);


    return (
        <div className={`w-full max-w-[370px] px-4 py-3 rounded-lg bg-gray-700 m-5 ${className}`}>            
            <ChatMessagesBox ref={chatMessageBoxRef} messages={messages} />
        </div>
    );
};

const ChatMessagesBox = React.forwardRef<
    HTMLDivElement,
    { messages: MessageModel[] }
>(({ messages }, ref) => {
    const MessageList = messages.map((message) => (
        <ChatMessage key={message.id} className="mb-1" message={message} />
    ))

    return (
        <div ref={ref} className="h-[70vh] overflow-auto no-scrollbar">
            {MessageList}
        </div>
    )
});


export default Chat;