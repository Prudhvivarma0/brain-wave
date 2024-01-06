"use client";

import { useParams, useRouter } from "next/navigation";


interface NavigationItemProps {
    id: string;
    name: string;
    prize: string;
};

export const NavigationItem = ({
    id,
    name,
    prize
}: NavigationItemProps) => {
    const params = useParams();
    const router = useRouter();

    const buttonName = name;
    const buttonPrize = prize;
    const handleClick = () => {        
        router.push('/challenges/'+id);
        };
    return (
        <div style={{ display: 'flex' }}>
        <button
            onClick={handleClick}
            className="group relative flex flex-col items-left gap-y-3 w-[220px]"            
        >
            <div className="flex h-[70px] w-[900px] rounded-[18px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-right bg-[#a733b9] group-hover:bg-[#b539cb] ">
            <div className="text-white" style={{ fontSize: '40px', marginLeft: '20px' }}>{buttonName}</div>
        </div>
        </button>
        <button className="group relative flex flex-col items-right gap-y-3 w-[220px]" style={{ marginLeft: '866px' }}>
            <div className="flex h-[70px] w-[100px] rounded-[18px]  transition-all overflow-hidden items-center justify-center bg-[#a733b9] ">
            <div className="text-white">{buttonPrize}</div>
        </div>
        </button>
        </div>
    );
};