"use client"

import { useChatQuery } from "@/hooks/use-chat-query";
import { Member, Message, Profile } from "@prisma/client";
import { Frown, Loader2 } from "lucide-react";
import { Fragment, useRef, ElementRef } from "react";
import { ChatItem } from "./chat-item";
import {format} from "date-fns";
import { useChatSocket } from "@/hooks/use-chat-socket";
import { Button } from "../ui/button";
import { useChatScroll } from "@/hooks/use-chat-scroll";

const DATE_FORMAT = "d MMM yyyy, HH:mm";

type MessageWithMemberWithProfile = Message & {
    member: Member & {
        profile: Profile
    }
}

interface ChatMessagesProps {
    name: string;
    member: Member;
    chatId: string;
    apiUrl: string;
    socketUrl: string;
    socketQuery: Record<string, string>;
    paramKey: "channelId" | "conversationId"
    paramValue: string;
    type: "channel" | "conversation"
}

export const ChatMessages = ({
    name,
    member,
    chatId,
    apiUrl,
    socketUrl,
    socketQuery,
    paramKey,
    paramValue,
    type
}: ChatMessagesProps) => {
    const queryKey = `chat:${chatId}`;
    const addKey = `chat:${chatId}:messages`;
    const updateKey = `chat:${chatId}:messages:update`;
    const chatRef = useRef<ElementRef<"div">>(null);
    const bottomRef = useRef<ElementRef<"div">>(null);
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status
    } = useChatQuery({
        queryKey,
        apiUrl,
        paramKey,
        paramValue
    });
    useChatSocket({queryKey, addKey, updateKey});
    useChatScroll({
        chatRef,
        bottomRef,
        loadMore: fetchNextPage,
        shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
        count: data?.pages?.[0]?.items?.length ?? 0
    })
    if (status === "pending") {
        return (
            <div className="flex flex-col flex-1 justify-center items-center bg-[rgb(236,236,236)] dark:bg-[rgb(,,)]">
                <Loader2 className="h-7 w-7 animate-spin"/>
                <p>
                    Loading...
                </p>
            </div>
           
        )
    };
    if (status === "error") {
        return (
            <div className="flex flex-col flex-1 justify-center items-center bg-[rgb(236,236,236)] dark:bg-[rgb(99,102,106)]">
                <Frown className="h-7 w-7"/>
                <p>
                    Something went wrong
                </p>
            </div>
           
        )
    }
    return (
        <div ref={chatRef} className="flex-1 flex flex-col py-4 overflow-y-auto bg-[rgb(236,236,236)] dark:bg-gradient-to-t from-[rgba(53,37,91,0.5)] to-[rgba(93,42,96,0.5)]">
            {hasNextPage && (
                <div className="flex justify-center">
                    {isFetchingNextPage ? (
                        <Loader2 className="h-6 w-6 animate-spin my-4"/>
                    ) : (
                        <Button onClick={() => fetchNextPage()} variant="link" className="text-gray-500">
                            Load previous messages
                        </Button>
                    )}
                </div>
            )}
            <div className="flex-1 flex flex-col-reverse py-4 overflow-y-auto bg-[rgb(236,236,236)] dark:bg-gradient-to-t from-[rgba(53,37,91,0.5)] to-[rgba(93,42,96,0.5)] justify-end">
                {data?.pages?.map((group, i) => (
                    <Fragment key={i}>
                        {group.items.map((message: MessageWithMemberWithProfile) => (
                            // <div key={message.id}>
                            //     {message.content}
                            // </div>
                            <ChatItem
                                key={message.id}
                                id={message.id}
                                currentMember={member}
                                member={message.member}
                                content={message.content}
                                fileUrl={message.fileUrl}
                                deleted={message.deleted}
                                timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                                isUpdated={message.updatedAt !== message.createdAt}
                                socketUrl={socketUrl}
                                socketQuery={socketQuery}
                            />
                        ))}
                    </Fragment>
                ))}
            </div>
            <div ref={bottomRef}/>
        </div>
    )
}