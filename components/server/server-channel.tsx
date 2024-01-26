"use client"

import { ModalType, useModal } from "@/hooks/use-modal-store";
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
    const {onOpen} = useModal();

    const Icon = iconMap[channel.type];

    const onClick = () => {
        router.push(`/servers/${params?.serverId}/channels/${channel.id}`)
    }
    const onAction = (e: React.MouseEvent, action: ModalType) => {
        e.stopPropagation();
        onOpen(action, {channel, server});
    }

// Split the channel name by space and create a new paragraph for each word
const words = channel.name.split(' ').map((word, index) => {
    const chunks = word.match(/.{1,10}/g); // This splits the word into chunks of 10 letters
    return chunks.map((chunk, i) => <p key={`${index}-${i}`} className="line-clamp-1 font-semibold">{chunk}</p>);
}).flat();

return (
    <button
    onClick={onClick}
    className="group px-2 py-2 rounded-md flex relative items-center gap-x-2 w-full transition mb-1 hover:bg-purple-500 flex-col"
    >
        <div className="flex items-center gap-x-2 w-50">
            <Icon className="flex-shrink-0 w-5 h-5"/>
            <div className="text-overflow-ellipsis">
                {words}
            </div>
        </div>
        {channel.name !== "main" && role !== MemberRole.GUEST && (
            <div className="ml-auto flex flex-row items-center gap-x-1">
                <Edit2 onClick={(e) => onAction(e,"editChannel")} className="hidden group-hover:block w-4 h-4"/>
                <Trash2 onClick={(e) => onAction(e, "deleteChannel")} className="hidden group-hover:block w-4 h-4"/>
            </div>
        )}
    </button>
)}
