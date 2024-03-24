// import WhiteBoard from "@/components/board/server-whiteboard";
// import { ChatHeader } from "@/components/chat/chat-header";
// import { ChatInput } from "@/components/chat/chat-input";
// import { ChatMessages } from "@/components/chat/chat-messages";
// import { currentProfile } from "@/lib/current-profile";
// import { db } from "@/lib/db";
// import { redirectToSignIn } from "@clerk/nextjs";
// import { redirect } from "next/navigation";

// interface ChannelPageProps {
//     params: {
//         serverId: string;
//         channelId: string;
//     }
// }

// const ChannelPage = async ({
//     params
// }: ChannelPageProps) => {

//     const profile = await currentProfile();
//     if (!profile) {
//         return redirectToSignIn()
//     }

//     const channel = await db.channel.findUnique({
//         where: {
//             id: params.channelId
//         }
//     });

//     const member = await db.member.findFirst({
//         where: {
//             serverId: params.serverId,
//             profileId: profile.id
//         }
//     });

//     if (!channel || !member) {
//         redirect("/")
//     }


//     return (
//         <div className="flex flex-col h-full">
//             <ChatHeader
//                 name={channel.name}
//                 serverId={channel.serverId}
//                 type="channel"
//             />
//             <div
//                 className="mt-6"
//                 style={{
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     height: '80vh',
//                     width: '86vw',
//                     position: 'relative',
//                 }}
//             >
//                 {/* <div style={{ width: '90%', height: '90%', position: 'relative', paddingRight: '50px' }}>
//                     <Editor />
//                 </div> */}
//                 {/* <iframe
//                     src="https://sketch.io/sketchpad/"
//                     width="100%"
//                     height="100%"
//                     title="Embedded Editor"
//                     >
//                 </iframe> */}
                
//                 <WhiteBoard/>
                
//                 <div>
//                     <div className="mt-5 bg-[rgb(236,236,236)] dark:bg-gradient-to-t from-[rgba(53,37,91,0.5)] to-[rgba(93,42,96,0.5)]]" style={{ height: '600px', width: '450px', maxHeight: '600px', overflowY: 'auto' }}>
//                         <ChatMessages
//                             member={member}
//                             name={channel.name}
//                             chatId={channel.id}
//                             type="channel"
//                             apiUrl="/api/messages"
//                             socketUrl="/api/socket/messages"
//                             socketQuery={{
//                                 channelId: channel.id,
//                                 serverId: channel.serverId
//                             }}
//                             paramKey="channelId"
//                             paramValue={channel.id}
//                         />
//                     </div>
//                     <ChatInput
//                         name={channel.name}
//                         type="channel"
//                         apiUrl="/api/socket/messages"
//                         query={{
//                             channelId: channel.id,
//                             serverId: channel.serverId
//                         }}
//                     />
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ChannelPage;

import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

interface ChannelPageProps {
    params: {
        serverId: string;
        channelId: string;
    }
}

const ChannelPage = async ({
    params
}: ChannelPageProps) => {

    const profile = await currentProfile();
    if (!profile) {
        return redirectToSignIn()
    }

    const channel = await db.channel.findUnique({
        where: {
            id: params.channelId
        }
    });

    const member = await db.member.findFirst({
        where: {
            serverId: params.serverId,
            profileId: profile.id
        }
    });

    if (!channel || !member) {
        redirect("/")
    }

    const Editor = dynamic(
        async () => import('@/components/board/board'),
        { ssr: false }
    );

    return (
        <div className="flex flex-col h-full">
            <ChatHeader
                name={channel.name}
                serverId={channel.serverId}
                type="channel"
            />
            <div
                className="mt-6"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '80vh',
                    width: '86vw',
                    position: 'relative',
                }}
            >
                <div style={{ width: '90%', height: '90%', position: 'relative', paddingRight: '50px' }}>
                    <Editor roomId ={channel.serverId} />
                </div>
                <div>
                    <div className="bg-[rgb(236,236,236)] dark:bg-gradient-to-t from-[rgba(53,37,91,0.5)] to-[rgba(93,42,96,0.5)]]" style={{ height: '500px', width: '450px', maxHeight: '500px', overflowY: 'auto' }}>
                        <ChatMessages
                            member={member}
                            name={channel.name}
                            chatId={channel.id}
                            type="channel"
                            apiUrl="/api/messages"
                            socketUrl="/api/socket/messages"
                            socketQuery={{
                                channelId: channel.id,
                                serverId: channel.serverId
                            }}
                            paramKey="channelId"
                            paramValue={channel.id}
                            userName={profile.name}
                        />
                    </div>
                    <ChatInput
                        name={channel.name}
                        type="channel"
                        apiUrl="/api/socket/messages"
                        query={{
                            channelId: channel.id,
                            serverId: channel.serverId
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default ChannelPage;
