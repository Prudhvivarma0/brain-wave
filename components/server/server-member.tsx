"use client"

import { Member, MemberRole, Profile, Server } from "@prisma/client";
import { Badge, BadgeCheck, Crown, ShieldAlert, ShieldCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { UserAvatar } from "../user-avatar";

interface ServerMemberProps {
    member: Member & {profile: Profile};
    server: Server;
}

const roleIconMap = {
    [MemberRole.GUEST]: null,
    [MemberRole.MODERATOR]: <BadgeCheck className="h-4 w-4 ml-2 text-green-500"/>,
    [MemberRole.ADMIN]: <Crown className="h-4 w-4 ml-2 text-yellow-500"/>
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

    const nameChunks = member.profile.name.match(/.{1,10}/g); 
        let nameDisplay;

        if (nameChunks === null) {
            // TODO: Handle the case when no matches are found
        } else {
            nameDisplay = nameChunks.map((chunk, i) => <p key={i} className="line-clamp-1 font-semibold">{chunk}</p>);
        }
    

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
