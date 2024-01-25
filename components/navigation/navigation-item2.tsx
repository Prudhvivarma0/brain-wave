"use client";

import { useParams, useRouter } from "next/navigation";


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
            <div className="flex h-[70px] w-full  rounded-[10px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-right bg-[rgb(117,96,163)] group-hover:bg-[rgb(99,103,180)] ">
            <div className="text-white" style={{ fontSize: '40px', marginLeft: '20px' }}>{buttonName}</div>
        </div>
        </button>
        <button className="group relative flex flex-col items-right gap-y-3 w-full max-w-[100px]">
            <div className="flex h-[70px] w-full rounded-[10px]  transition-all overflow-hidden items-center justify-center bg-[rgb(117,96,163)] ">
            <div className="text-white">{buttonPrize}</div>
        </div>
        </button>
        <button className="group relative flex flex-col items-right gap-y-3 w-full max-w-[100px]">
            <div className="flex h-[70px] w-full rounded-[10px]  transition-all overflow-hidden items-center justify-center bg-[rgb(117,96,163)] ">
            <div className="text-white">{duration}</div>
        </div>
        </button>
        </div>
    );
};
