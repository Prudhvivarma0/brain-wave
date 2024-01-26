"use client"

import { Member, MemberRole, Profile, Server } from "@prisma/client";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { UserAvatar } from "../user-avatar";

interface ServerMemberProps {
    member: Member & {profile: Profile};
    server: Server;
}

const roleIconMap = {
    [MemberRole.GUEST]: null,
    [MemberRole.MODERATOR]: <ShieldCheck className="h-4 w-4 ml-2 text-green-500"/>,
    [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 text-rose-500"/>
}

export const ServerMember = ({
    member,
    server
}: ServerMemberProps) => {
    const params = useParams();
    const router = useRouter();
    const icon = roleIconMap[member.role];

    const onClick = () => {
        router.push(`/servers/${params?.serverId}/conversation/${member.id}`)
    }

    // Split the name into chunks of 10 letters
    const nameChunks = member.profile.name.match(/.{1,10}/g); 
    const nameDisplay = nameChunks.map((chunk, i) => <p key={i} className="line-clamp-1 font-semibold">{chunk}</p>);

    return (
        <div>
            <button
            onClick={onClick}
            className="group px-2 py-2 rounded-md flex items-center gap-x-2 w-full mb-1 hover:bg-purple-500"
            >
                <UserAvatar 
                src={member.profile.imageUrl}
                className="h-8 w-8"
                />
                <div className="text-overflow-ellipsis">
                    {nameDisplay}
                </div>
                {icon}
            </button>
        </div>
    )
}
