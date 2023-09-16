import { AnimationContent, MessageModel, TextContent } from "../utils/models";

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
    if ("text" in content) {
        const textContent = content as TextContent;
        Content = <span className="ml-3 break-words text-white">{textContent.text}</span>;
    } else if ("fileId" in content) {
        const animationContent = content as AnimationContent;
        console.log(animationContent.file_name);

        Content = (
                <video className="ml-3" autoPlay={true} style={{
                    width: "30px",
                    height: "30px",
                }} src={animationContent.file_name} mime-type={animationContent.mime_type} loop />
        );
    } else {
        Content = <></>;
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