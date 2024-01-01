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
    return (
        <div className="flex items-center justify-between py-2">
            
            <p className="font-bold">
                {label}:
            </p>
            
            {role !==MemberRole.GUEST && sectionType === "channels" &&
                <button onClick={() => onOpen("createChannel", {channelType})}>
                    <PlusCircle className="h-5 w-5"/>
                </button>
            }
            
            {role === MemberRole.ADMIN && sectionType === "members" &&
                <button onClick={() => onOpen("members", {server})}>
                    <Settings className="h-5 w-5"/>
                </button>
            }
        </div>
    )
}