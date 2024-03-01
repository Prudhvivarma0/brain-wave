"use client";

import { useParams, useRouter } from "next/navigation";
import { db } from "@/lib/db";


interface NavigationItemProps {
    id: string;
    name: string;
    prize: string;
    duration: string;
    by: string;
    img: string;
};

export const NavigationItem = ({
    id,
    name,
    prize,
    duration,
    by,
    img
}: NavigationItemProps) => {
    const params = useParams();
    const router = useRouter();

    const buttonName = name;
    const buttonPrize = prize;
    const handleClick = () => {        
        router.push('/challenges/'+id);
        };
    
        
        return (
                <div className="flex-col bg-[rgb(69,38,93)] group-hover:bg-[rgb(89,58,113)] rounded-[10px] group-hover:rounded-[20px]" > {/* Add onClick to the container */}
                <button onClick={handleClick}>
                <div className="flex flex-col items-left gap-y-3 w-full max-w-[400px] group relative group-hover:rounded-[16px] transition-all overflow-hidden">
                    <div className="text-white" style={{ fontSize: '40px', marginLeft: '20px' }}>{name}</div>
                </div>
                </button>
                <div onClick={handleClick} className="pl-[20px] pb-[3px]">
                    <div className=" text-white justify-start">Prize: {prize}</div>
                    <div className="text-white">Duration: {duration.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</div>
                    <div className="text-white mb-[20px]">Objective: {by}</div>
                    </div>    
                </div>
          );
        };
