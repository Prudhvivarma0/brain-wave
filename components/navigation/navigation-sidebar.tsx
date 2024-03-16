import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { ModeToggle } from "../mode-toggle";
import Challenges from "./challenges";
import HomeButton from "./home";
import VirtualExhibits from "./virtual-exhibits";
import EditorButton from "./editor";
import { ServerSearch } from "../server/server-main_search";
import { useState } from 'react';

export const NavigationSidebar = async () => {
    const profile = await currentProfile();
    if (!profile) {
        return redirect("/")
    }
    const servers = await db.server.findMany({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });
    const challenges = await db.challenge.findMany({
    });

    return (
        <div className="space-y-4 flex flex-col items-center h-full text-white w-[155px] bg-gradient-to-t from-[rgb(53,37,91)] to-[rgb(93,42,96)] py-9 ">
            <img src="/brain.jpg" alt="Brain Wave" width="100" height="100" />
            {/* <Separator className="h-[2px] bg-[#c073bc] rounded-md w-20 mx-auto" /> */}
            <div style={{height: '50px'}}></div> {/* This div creates the space after the separator */}
            <div className="flex flex-col items-center gap-y-4 h-full ">
                <HomeButton />
                <VirtualExhibits />
                <Challenges />
                {/* <EditorButton/> */}
                <div className="mt-auto flex items-center flex-col gap-y-3">
                <ServerSearch 
                    data={[
                        {
                        label: "Teams", 
                        type: "server", 
                        data: servers.map(server => ({ 
                            id: server.id,
                            name: server.name,
                        }))
                        },
                        {
                        label: "Challenges", 
                        type: "challenge", 
                        data: challenges.map(challenge => ({ 
                            id: challenge.id,
                            name: challenge.name,                            
                        }))
                        }
                    ]}
                                />
                    <ModeToggle />
                </div>
            </div>
        </div>
    )
}
