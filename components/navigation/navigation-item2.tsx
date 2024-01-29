"use client";

import { useParams, useRouter } from "next/navigation";
import { db } from "@/lib/db";


interface NavigationItemProps {
    id: string;
    name: string;
    prize: string;
    duration: string;
};

export const NavigationItem = ({
    id,
    name,
    prize,
    duration
}: NavigationItemProps) => {
    const params = useParams();
    const router = useRouter();

    const buttonName = name;
    const buttonPrize = prize;
    const handleClick = () => {        
        router.push('/challenges/'+id);
        };
    
        
    return (
        <div className="flex grow justify-between">
        <button
            onClick={handleClick}
            className="group relative flex flex-col items-left gap-y-3 w-full max-w-[400px]"            
        >
            <div className="flex h-[70px] w-full  rounded-[10px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-right bg-[rgb(69,38,93)] group-hover:bg-[rgb(89,58,113)] ">
            <div className="text-white" style={{ fontSize: '40px', marginLeft: '20px' }}>{buttonName}</div>
        </div>
        </button>
        <button className="group relative flex flex-col items-right gap-y-3 w-full max-w-[100px]">
            <div className="flex h-[70px] w-full rounded-[10px]  transition-all overflow-hidden items-center justify-center bg-[rgb(69,38,93)] ">
            <div className="text-white">{buttonPrize}</div>
        </div>
        </button>
        <button className="group relative flex flex-col items-right gap-y-3 w-full max-w-[100px]">
            <div className="flex h-[70px] w-full rounded-[10px]  transition-all overflow-hidden items-center justify-center bg-[rgb(69,38,93)] ">
            <div className="text-white">{duration.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</div>
        </div>
        </button>
        </div>
    );
};
