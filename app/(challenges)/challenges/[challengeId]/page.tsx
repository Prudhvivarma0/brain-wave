import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
import { Separator } from "@/components/ui/separator";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface ChallengePageProps {
    params: {
        challengeId: string;
    }
}

const ChallengePage = async ({
    params
}: ChallengePageProps) => {

    const profile = await currentProfile();
    if (!profile){
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
    
    let link  = '#';
    if(alreadyJoined) {
        link = `/servers/${server?.id}`;
    } else if(server?.inviteCode) {
        link = `/invite/${server?.inviteCode}`;
    }

    return ( 
        <div className="h-full">
            <div className="hidden md:flex h-full w-[155px] z-30 flex-col fixed inset-y-0">
                <NavigationSidebar/>
            </div>
            <main className="md:pl-[180px] pr-[20px] h-full">

            <div className="flex items-center justify-between mt-5">
                        <div className="text-4xl ml-9 mb-4">
                Welcome to <strong>{challenge.name}</strong>!
                        </div>
                </div>
                <Separator className="h-[3px] bg-[rgb(56,37,91)] w-full mt-3 mb-10" />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="w-[450px] mb-3" style={{ display: 'flex ', justifyContent: 'center' }}>
                <img src = {ChallengeImage.imageUrl} style={{ borderRadius: '10px' }}/>
                </div>
                <div className="text-1xl ml-9 mb-3" style={{ alignSelf: 'flex-start' }}>
                        <strong>Objective:</strong><br/> {challenge.objective.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </div>
                <div className="text-1xl ml-9 mb-3" style={{ alignSelf: 'flex-start' }}>
                        <strong>Duration:</strong><br/> {challenge.duration.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </div>
                <div className="text-1xl ml-9 mb-3" style={{ alignSelf: 'flex-start' }}>
                        <strong>Prize:</strong><br/> {challenge.prize}
                </div>
                <div className="text-1xl ml-9 mb-3" style={{ alignSelf: 'flex-start' }}>
                        <strong>Terms & Conditions:</strong><br/> {challenge.terms.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </div>

                
                <a href={link} className="group relative flex flex-col items-right gap-y-3 w-[220px] ml-9 mt-10 mb-10">
                    <div className="flex h-[70px] w-[200px] rounded-[18px]  transition-all overflow-hidden items-center justify-center bg-[rgb(102,26,138)] group-hover:bg-[rgb(122,46,158)]">
                        <div className="text-white">{alreadyJoined ? "Go to challenge": "Join this challenge"}</div>
                    </div>
                </a>
            </main>
        </div>
     );
}
 
export default ChallengePage;