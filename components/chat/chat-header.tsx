"use client"

import { MessageCircle, PenLine } from "lucide-react";
import { MobileToggle } from "../mobile-toggle";
import { SocketIndicator } from "../socket-indicator";
import { UserAvatar } from "../user-avatar";

interface ChatHeaderProps {
    serverId: string;
    name: string;
    type: "channel" | "conversation";
    imageUrl?: string;
}

export const ChatHeader = ({
    serverId,
    name,
    type,
    imageUrl
}: ChatHeaderProps) => {

    const handleButtonClick = () => {
        window.location.href = '/whiteboard';
    };

    return (
        <div className="text-md font-semibold px-3 flex items-center h-12 dark:border-white border-black border-b-2">
            <MobileToggle serverId={serverId}/>
            {type === "channel" && (
                <MessageCircle className="w-5 h-5 text-black dark:text-white mr-2"/>
            )}
            {type === "conversation" && (
                <UserAvatar src={imageUrl} className="h-8 w-8 md:h-8 md:w-8 mr-2"/>
            )}
            <p className="font-semibold text-md">
                {name}
            </p>
            <div className="ml-auto flex items-center">
                <button onClick = {handleButtonClick} className="rounded hover:text-gray-400">
                    <PenLine className="mr-3"/>
                </button>
                <SocketIndicator/>
            </div>
        </div>
    )
}