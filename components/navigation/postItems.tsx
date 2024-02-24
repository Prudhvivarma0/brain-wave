"use client";

import { useParams, useRouter } from "next/navigation";
import { db } from "@/lib/db";
import { MoreVertical } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";

interface PostItemProps {
    name: string;
    imageURL: string;
    description: string;
    pfp: string;
    currUser: string;
    postUser: string;
    post: string
};

export const PostItems = ({
    post,
    pfp,
    name,
    imageURL,
    description,
    currUser,
    postUser,
}: PostItemProps) => {
    // const params = useParams();
    // const router = useRouter();
    // const handleClick = () => {        
    //     router.push('/challenges/'+id);
    //     };
    const {onOpen} = useModal();

    return (
        <div className="flex flex-col w-[500px] rounded-[10px] overflow-hidden bg-[rgb(69,38,93)]" style={{ marginBottom: '20px' }}>
            <div className="p-4 text-white flex justify-between items-center" >
                <div className="flex items-center">
                    <img src={pfp} alt={name} className="w-[45px] h-[45px] rounded-full mr-2" />
                    {name.toUpperCase()}
                </div>
                {currUser === postUser && (
                    <button
                    onClick={() => onOpen("deletePost",{post})}
                    >
                        <MoreVertical className="hover:bg-[#7D0DC3] rounded"/>
                    </button>
                )}
            </div>
            <div>
                <img src={imageURL} alt={description} className="w-full" />
            </div>

            <div className="p-4 text-white">
                {description}
            </div>
        </div>
    );
};
