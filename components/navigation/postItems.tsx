"use client";

import { useParams, useRouter } from "next/navigation";
import { db } from "@/lib/db";
import { MoreVertical } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";
import LikeButton from "./likebutton";

interface PostItemProps {
    id: string;
    name: string;
    imageURL: string;
    description: string;
    pfp: string;
    currUser: string;
    postUser: string;
    post: string
    liked: boolean
};

export const PostItems = ({
    id,
    post,
    pfp,
    name,
    imageURL,
    description,
    currUser,
    postUser,
    liked
}: PostItemProps) => {
    // const params = useParams();
    // const router = useRouter();
    // const handleClick = () => {        
    //     router.push('/challenges/'+id);
    //     };
    const { onOpen } = useModal();

    return (
        <div className="flex flex-col h-50 w-50 rounded-[10px] overflow-hidden bg-[rgb(69,38,93)] sm:w-100 sm:h-100">
            <div className="p-4 text-white flex justify-between items-center" >
                <div className="flex items-center">
                    <img src={pfp} alt={name} className="w-[45px] h-[45px] rounded-full mr-2" />
                    {name.toUpperCase()}
                </div>
                {currUser === postUser && (
                    <button
                        onClick={() => onOpen("deletePost", { post })}
                    >
                        <MoreVertical className="hover:bg-[#7D0DC3] rounded" />
                    </button>
                )}
            </div>
            <a
                href={imageURL}
                target="_blank"
                rel="noopener noreferrer"
            >
                <img src={imageURL} alt={description} className="h-[350px] w-[400px] sm:w-100 sm:h-100" />
            </a>

            <div className="p-4 text-white flex justify-between items-center">
                <div>
                    {description.match(/.{1,35}/g)?.map((chunk, index) => (
                        <div key={index} className="whitespace-normal">{chunk}</div>
                    ))}
                </div>
                <LikeButton postId={id} state={liked}/>
            </div>
        </div>
    );
};
