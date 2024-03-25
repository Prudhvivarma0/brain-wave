"use client";

import { useParams, useRouter } from "next/navigation";
import { Trophy, Clock } from 'lucide-react';
import React from "react";

interface NavigationItemProps {
    id: string;
    name: string;
    prize: string;
    duration: string;
    by: string;
    img: string | undefined;
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

    const handleClick = () => {
        router.push('/challenges/' + id);
    };

    return (
        <div onClick={handleClick} className="bg-[rgb(69,38,93)] group-hover:bg-[rgb(89,58,113)] rounded-[10px] group-hover:rounded-[20px] border border-gray-300 mt-9 mb-4 h-[450px] flex flex-col">
            <button onClick={handleClick} className="flex-1">
                <div className="image-container w-[180px] h-[180px] rounded-[10px] group-hover:rounded-[20px] border border-gray-200 mb-2 mx-auto">
                    <img src={img} alt="challenge" className="w-full h-full rounded-[10px]" />
                </div>
                <div className="text-white text-center">{name}</div>
            </button>
            <div className="pl-[20px] pb-[20px]">
                <div className="text-white mb-[10px] h-[110px] overflow-hidden">Objective: {by}</div>
                <div className="text-white flex justify-center items-center">
                    <div className="flex flex-col items-center mr-12">
                        <Trophy size={24} />
                        <span className="mt-[5px] text-lg">{prize}</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <Clock size={24} />
                        <span className="mt-[5px] text-lg">{duration.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                    </div>
                </div>
            </div>

        </div>
    );
};

