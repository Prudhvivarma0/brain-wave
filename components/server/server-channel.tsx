"use client"

import { Channel, ChannelType, MemberRole, Server } from "@prisma/client";
import { Edit2, Mic2, Text, Trash2, Video } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

interface ServerChannelProps {
    channel: Channel;
    server: Server;
    role?: MemberRole;
}

const iconMap = {
    [ChannelType.TEXT]: Text,
    [ChannelType.AUDIO]: Mic2,
    [ChannelType.VIDEO]: Video,

}

export const ServerChannel = ({
    channel,
    server,
    role
}: ServerChannelProps) => {
    const params = useParams();
    const router = useRouter();

    const Icon = iconMap[channel.type];
        
    return (
        <button
        onClick={() => {}}
        className="group px-2 py-2 rounded-md flex items-center gap-x-2 w-full transition mb-1 hover:bg-purple-500"
        >
            <Icon className="flex-shrink-0 w-5 h-5"/>
            <p className="line-clamp-1 font-semibold">
                {channel.name}
            </p>
            {channel.name !== "main" && role !== MemberRole.GUEST && (
                <div className="ml-auto flex items-center gap-x-2">
                    <Edit2 className="hidden group-hover:block w-4 h-4"/>
                    <Trash2 className="hidden group-hover:block w-4 h-4"/>
                </div>
            )}
        </button>
    )
}