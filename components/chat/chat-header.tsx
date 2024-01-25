import { MessageCircle, PenLine } from "lucide-react";
import { MobileToggle } from "../mobile-toggle";
import { SocketIndicator } from "../socket-indicator";
import { UserAvatar } from "../user-avatar";
import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { ServerHeader } from "../server/server-header";
import { Black_Han_Sans } from "next/font/google";

interface ChatHeaderProps {
    serverId: string;
    name: string;
    type: "channel" | "conversation";
    imageUrl?: string;
}

export const ChatHeader = async ({
    serverId,
    name,
    type,
    imageUrl
}: ChatHeaderProps) => {
    const profile = await currentProfile();
    if (!profile) {
        return redirect("/");
    }

    const server = await db.server.findUnique({
        where: {
            id: serverId,
        },
        include: {
            members: {
                include: {
                    profile: true,
                },
            },
        },
    });

    if (!server) {
        return redirect("/");
    }

    const role = server.members.find((member: { profileId: string; }) => member.profileId === profile.id)?.role;

    // const handleButtonClick = () => {
    //     window.location.href = '/whiteboard';
    // };

    return (
        <div className="text-md font-semibold px-3 flex items-center h-16 text-white" style={{ backgroundColor: 'rgb(116, 105, 217)', borderRadius: '10px', borderBlockColor:"black"}}>
            <MobileToggle serverId={serverId}/>
            {type === "channel" && (
                <MessageCircle className="w-5 h-5 text-white mr-2"/>
            )}
            {type === "conversation" && (
                <UserAvatar src={imageUrl} className="h-8 w-8 md:h-8 md:w-8 mr-2"/>
            )}
            <p className="font-semibold text-md">
                {name}
            </p>
            <div className="ml-auto flex items-center">
                <a href="/whiteboard" className="rounded hover:text-gray-400">
                    <PenLine className="mr-3" />
                </a>
                <ServerHeader server={server} role={role} />
                {/* <SocketIndicator/> */}
            </div>
        </div>
    )
}