import { MessageCircle, Mic, PenLine, PhoneCall, ShieldAlert, ShieldCheck, Text, Video } from "lucide-react";
import { MobileToggle } from "../mobile-toggle";
import { SocketIndicator } from "../socket-indicator";
import { UserAvatar } from "../user-avatar";
import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { ServerHeader } from "../server/server-header";
import { Black_Han_Sans } from "next/font/google";
import { ScrollArea } from "../ui/scroll-area";
import { ServerSearch } from "../server/server-search";
import { ChannelType, MemberRole } from "@prisma/client";

interface ChatHeaderProps {
    serverId: string;
    name: string;
    type: "channel" | "conversation";
    imageUrl?: string;
}

const iconMap = {
    [ChannelType.TEXT]: <Text className="mr-2 h-4 w-4"/>,
    [ChannelType.AUDIO]: <Mic className="mr-2 h-4 w-4"/>,
    [ChannelType.VIDEO]: <Video className="mr-2 h-4 w-4"/>
}
const roleIconMap = {
    [MemberRole.GUEST]: null,
    [MemberRole.MODERATOR]: <ShieldCheck className="text-green-500 h-4 w-4 mr-2"/>,
    [MemberRole.ADMIN]: <ShieldAlert className="text-red-500 h-4 w-4 mr-2"/>
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
            channels: {
                orderBy: {
                    createdAt: "asc",
                },
            },
            members: {
                include: {
                    profile: true,
                },
                orderBy: {
                    role: "asc"
                }
            }
        }
    });

    if (!server) {
        return redirect("/");
    }
    const textChannels = server?.channels.filter((channel) => channel.type === ChannelType.TEXT);
    const audioChannels = server?.channels.filter((channel) => channel.type === ChannelType.AUDIO);
    const videoChannels = server?.channels.filter((channel) => channel.type === ChannelType.VIDEO);
    const members = server?.members.filter((member) => member.profileId !== profile.id);

    const role = server.members.find((member: { profileId: string; }) => member.profileId === profile.id)?.role;

    // const handleButtonClick = () => {
    //     window.location.href = '/whiteboard';
    // };

    return (
        <div className="text-md font-semibold px-3 flex items-center h-16 text-white " style={{ backgroundColor: 'rgb(81,40,94)' , borderRadius: '10px', borderBlockColor:"black"}}>
            <MobileToggle serverId={serverId}/>
            <p className="font-semibold" style={{ fontSize: '1.5rem' }}>
                {server.name} -&nbsp; 
            </p>
            {type === "channel" && (
                <MessageCircle className="w-4 h-4 text-white mr-2"/>
            )}
            {type === "conversation" && (
                <UserAvatar src={imageUrl} className="h-4 w-4 md:h-8 md:w-8 mr-2"/>
            )}
            <p className="font-semibold text-md">
                {name}
            </p>
            <div className="ml-auto flex items-center">
                <ScrollArea className="flex-1 px-5">
                    <div>
                        <ServerSearch 
                        
                            data={[
                                {
                                    label: "Text Channels",
                                    type: "channel",
                                    data: textChannels?.map((channel) => ({
                                        id: channel.id,
                                        name: channel.name,
                                        icon: iconMap[channel.type]
                                    }))
                                },
                                {
                                    label: "Audio Channels",
                                    type: "channel",
                                    data: audioChannels?.map((channel) => ({
                                        id: channel.id,
                                        name: channel.name,
                                        icon: iconMap[channel.type]
                                    }))
                                },
                                {
                                    label: "Video Channels",
                                    type: "channel",
                                    data: videoChannels?.map((channel) => ({
                                        id: channel.id,
                                        name: channel.name,
                                        icon: iconMap[channel.type]
                                    }))
                                },
                                {
                                    label: "Members",
                                    type: "member",
                                    data: members?.map((member) => ({
                                        id: member.id,
                                        name: member.profile.name,
                                        icon: roleIconMap[member.role]
                                    }))
                                }
                            ]}
                        />
                    </div>
                </ScrollArea>
                <a href="/videocall" target="_blank" className="rounded hover:text-gray-400">
                    <PhoneCall className="mr-3" />
                </a>
                <a href="/whiteboard" className="rounded hover:text-gray-400">
                    <PenLine className="mr-3" />
                </a>
                <ServerHeader server={server} role={role} />
                {/* <SocketIndicator/> */}
            </div>
        </div>
    )
}