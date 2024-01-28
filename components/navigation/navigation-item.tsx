"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React from "react";


interface NavigationItemProps {
    id: string;
    imageUrl: string;
    name: string;
};

export const NavigationItem = ({
    id,
    imageUrl,
    name
}: NavigationItemProps) => {
    const params = useParams();
    const router = useRouter();
    const onClick = () => {
        router.push(`/servers/${id}`)
    }

    return (
        <button
            onClick={onClick}
            className="group relative flex flex-col items-center gap-y-3 w-[220px] transition-transform duration-200 ease-in-out transform hover:scale-105"
        >
            <div
                className={cn(
                    "relative flex mx-9 h-[200px] w-[280px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden shadow-md hover:shadow-xl",
                    params?.serverId === id && "bg-primary/10 text-primary"
                )}
            >
                <Image fill src={imageUrl} alt="Channel" />
            </div>
            <div className="text-2x1">
                {name.split('\n').map((item, index) => (
                    <React.Fragment key={index}>
                        {item}
                        {index < name.split('\n').length - 1 && <br />}
                    </React.Fragment>
                ))}
            </div>
        </button>
    );
};
