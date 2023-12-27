"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";


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

    return(
            <button
            onClick={onClick}
            className="group relative flex items-center gap-y-3 w-[400px] hover:bg-purple-50 dark:hover:bg-purple-900"
            >
                <div className={cn(
                    "relative group flex mx-9 h-[120px] w-[120px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center",
                    params?.serverId === id && "bg-primary/10 text-primary"
                )}>

                    <Image
                    fill
                    src={imageUrl}
                    alt="Channel"
                    />
                </div>
                <div className="text-3xl ">
                    {name}
                </div>
                
            </button>
    )
}

