"use client"

import { useModal } from "@/hooks/use-modal-store";
import { ServerWithMembersWithProfiles } from "@/types";
import { ChannelType, MemberRole } from "@prisma/client";
import { PlusCircle, Settings } from "lucide-react";

interface ServerSectionProps {
    label: string;
    role?: MemberRole;
    sectionType: "channels" | "members";
    channelType?: ChannelType;
    server?: ServerWithMembersWithProfiles;
}

export const ServerSection = ({
    label,
    role,
    sectionType,
    channelType,
    server
}: ServerSectionProps) => {
    const {onOpen} = useModal();

    const words = label.split(' ').map((word, index, array) => {
        // Add colon only to the last word
        return <span key={index} className="font-bold">{word}{index === array.length - 1 ? ':' : ''} </span>;
    });
    

    return (
        <div className="flex items-center justify-between py-2">
            
            <div>
                {words}
            </div>
            
            {role !==MemberRole.GUEST && sectionType === "channels" &&
                <button onClick={() => onOpen("createChannel", {channelType})}>
                    <PlusCircle className="h-4 w-4"/>
                </button>
            }
            
            {role === MemberRole.ADMIN && sectionType === "members" &&
                <button onClick={() => onOpen("members", {server})}>
                    <Settings className="h-4 w-4"/>
                </button>
            }
        </div>
    )
}
