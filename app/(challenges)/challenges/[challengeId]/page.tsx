import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
import { Separator } from "@/components/ui/separator";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Trophy, Clock } from 'lucide-react';
import React from "react";

interface ChallengePageProps {
    params: {
        challengeId: string;
    }
}

const ChallengePage = async ({
    params
}: ChallengePageProps) => {

    const profile = await currentProfile();
    if (!profile) {
        return redirectToSignIn()
    }

    const challenge = await db.challenge.findUnique({
        where: {
            id: params.challengeId
        }
    });

    if (!challenge) {
        redirect("/challenges")
    }

    const server = await db.server.findUnique({
        where: {
            id: challenge.serverId
        }
    });

    const ChallengeImage = await db.server.findUnique({
        where: {
            id: challenge.serverId
        },
        select: {
            imageUrl: true
        }
    });

    const alreadyJoined = await db.server.findUnique({
        where: {
            id: challenge.serverId,
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    let link = '#';
    if (alreadyJoined) {
        link = `/servers/${server?.id}`;
    } else if (server?.inviteCode) {
        link = `/invite/${server?.inviteCode}`;
    }

    return (
        <div className="h-full">
            <div className="hidden md:flex h-full w-[155px] z-30 flex-col fixed inset-y-0">
                <NavigationSidebar />
            </div>
            <main className="md:pl-[180px] pr-[20px] h-full">

                <div className="flex items-center justify-between mt-5">
                    <div className="text-4xl ml-9 mb-4">
                        Welcome to <strong>{challenge.name}</strong>!
                    </div>
                </div>
                <Separator className="h-[3px] bg-[rgb(56,37,91)] w-full mt-3 mb-10" />
                <div className="flex items-center justify-center">
                    <div className="challenge-box w-[450px] h-[500px] mb-3 flex flex-col items-center"
                        style={{
                            backgroundColor: 'rgb(69, 38, 93)',
                            borderRadius: '10px',
                            padding: '30px',
                            marginBottom: '20px',
                            marginRight: 'auto',
                            marginLeft: '0',
                            marginTop: '-30px',
                            textAlign: 'center'
                        }}
                    >
                        <div className="challenge-box w-[500px] h-[700px] mb-3 flex flex-col items-center overflow-hidden">
                            <div className="image-box">
                                <img src={ChallengeImage ? ChallengeImage.imageUrl : 'defaultImageUrl'} className="challenge-image" style={{ width: '400px', height: '250px' }} />
                                <div className="challenge-name text-white text-lg font-bold pt-4">{challenge.name}</div>
                            </div>
                            <div className="challenge-details mt-3 text-white">
                                <div className="text-1xl mb-3"><strong>Objective:</strong> {challenge.objective}</div>
                                <div className="flex justify-center">
                                    <div className="text-1xl mb-3 mr-6">
                                        <div className="flex items-center">
                                            <Trophy size={24} className="mr-2" />
                                            <span className="text-lg">{challenge.prize}</span>
                                        </div>
                                    </div>
                                    <div className="text-1xl mb-3">
                                        <div className="flex items-center">
                                            <Clock size={24} className="mr-2" />
                                            <span className="text-lg">{challenge.duration}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
                <div>
                    <div className="text-1xl mb-3" style={{ position: 'absolute', top: '120px', right: '400px', color: 'black' }}>
                        <strong style={{ fontSize: '20px', fontWeight: 'bold' }}>Terms & Conditions:</strong><br />
                        <span>{challenge.terms.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                    </div>
                    <div className="text-1xl mb-3" style={{ position: 'absolute', top: '220px', right: '480px', color: 'black' }}>
                        <strong style={{ fontSize: '20px', fontWeight: 'bold' }}>Description</strong><br />
                        <span>{challenge.description.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                    </div>
                </div>

                <a href={link} className="group relative flex flex-col items-right gap-y-3 w-[220px] ml-17 mt-1 mb-3">
                    <div className="flex h-[70px] w-[455px] rounded-[18px] transition-all overflow-hidden items-center justify-center bg-[rgb(102,26,138)] group-hover:bg-[rgb(102,26,138)]">
                        <div className="text-white" style={{ fontSize: '18px', fontWeight: 'bold' }}>
                            {alreadyJoined ? "Go to challenge" : "Join this challenge"}
                        </div>
                    </div>
                </a>


            </main>
        </div>
    );
}

export default ChallengePage;
