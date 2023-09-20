import React, { forwardRef, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useChatMessages from "../hooks/useChatMessages";
import { checkMediaTypeByUrl } from "../utils/helpers";

type ReactionComponentProps = {
    x: number;
    y: number;
};

type MediaComponentProps = {
    source: string;
    author: string;
};

export interface ReactionComponentRef {
    showAlert: () => void;
}

const MediaComponent: React.FC<MediaComponentProps> = ({ source, author }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    const handleVideoLoadedData = () => {
        setIsLoaded(true);
    };

    const handleVideoEnded = () => {
        toast.dismiss();
    };

    useEffect(() => {
        if (isLoaded) {
            toast(<><video autoPlay style={{ width: "250px", height: "250px" }} onEnded={handleVideoEnded} src={source} /><p className="font-bold text-white text-stroke-black text-stroke-2 my-1 text-center">{`${author} Redeemed: Oh nooo!`}</p></>, {
                position: "top-right",
                className: "toast-message",
                autoClose: false,
                hideProgressBar: true,
                closeOnClick: true,
                rtl: false,
                pauseOnFocusLoss: true,
                draggable: true,
                pauseOnHover: true,
            });
        }
    }, [isLoaded, source]);

    return (
        <>
            <video
                autoPlay={false} // Set to false initially
                style={{ width: "250px", height: "250px", display: "none" }}
                onLoadedData={handleVideoLoadedData}
                onEnded={handleVideoEnded}
                src={source}
            />
        </>
    );
};

function notifyVideo(url: string, author: string) {
    toast(<MediaComponent source={url} author={author} />, {
        position: "top-right",
        className: "toast-message",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
    });
}

const ReactionComponent = forwardRef<ReactionComponentRef, ReactionComponentProps>((props, ref) => {
    const { messages } = useChatMessages();

    useEffect(() => {
        console.log("received inside reaction");
        const lastElement = messages[messages.length - 1];

        if ("fileId" in lastElement.content && checkMediaTypeByUrl(lastElement.content.file_name) === "video") {
            notifyVideo(lastElement.content.file_name, lastElement.author.firstName);
        }
    }, [messages]);

    const style: React.CSSProperties = {
        position: "absolute",
        left: `${props.x}px`,
        top: `${props.y}px`,
    };

    return (
        <div style={style}>
            <ToastContainer />
        </div>
    );
});

export default ReactionComponent;