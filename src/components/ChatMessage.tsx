import { MediaContent, MessageModel, TextContent } from "../utils/models";
import { checkMediaTypeByUrl } from "../utils/helpers";

type MessageProps = {
    message: MessageModel
} & React.ComponentPropsWithRef<'div'>

const ChatMessage = ({
    message: { author, content },
    className,
}: MessageProps) => {
    const badges = author.currentBadge;
    let badgeImage: string;

    if (badges === "mod") {
        badgeImage = "mod-badge.png";
    } else if (badges === "host") {
        badgeImage = "host-badge.png";
    } else if (badges === "sub") {
        badgeImage = "sub-badge.png";
    } else if (badges === "normal") {
        badgeImage = "normal-badge.png";
    } else {
        // Default image if the badge type is not recognized
        badgeImage = "default-badge.png";
    }

    const Badge = (
        <img className="mr-1" />
    )

    let Content: JSX.Element;
    const mediaContent = content as MediaContent;

    if ("text" in content) {
        const textContent = content as TextContent;
        Content = <span className="ml-3 break-words text-white">{textContent.text}</span>;
    } else if ("fileId" in content && checkMediaTypeByUrl(mediaContent.file_name) == "video") {
        Content = (
            <video className="ml-3 rounded-md" autoPlay={true} style={{
                width: "30px",
                height: "30px",
            }} src={mediaContent.file_name} mime-type={mediaContent.mime_type} loop />
        );
    } else if ("fileId" in content && checkMediaTypeByUrl(mediaContent.file_name) == "img") {
        Content = (
            <img className="ml-3 rounded-md" style={{
                width: "30px",
                height: "30px",
            }} src={mediaContent.file_name} />
        );
    } else {
        Content = (
            <img className="ml-3" style={{
                width: "30px",
                height: "30px",
            }} src="https://img.icons8.com/color/48/error--v1.png" />
        );
    }


    const Author = (
        <span className="font-semibold" style={{ color: author.color }}>
            {author.firstName}
        </span>
    )

    return (
        <div className={`text-[15px] py-1 rounded leading-6 ${className}`}>
            {("text" in content) ? (
                <div className="flex items-center">
                    <p>
                        {Badge}
                        {Author}
                        {Content}
                    </p>
                </div>
            ) : (
                <div className="flex items-center">
                    {Author}
                    {Content}
                </div>
            )}
        </div>
    );
}

export default ChatMessage