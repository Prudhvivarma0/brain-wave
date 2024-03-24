import { HomeMobileToggle } from "@/components/home-mobile-toggle";
import { NavigationAction } from "@/components/navigation/navigation-action2";
import { NavigationItem } from "@/components/navigation/navigation-item2";
import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
import { ServerSearch } from "@/components/server/server-main_search";
import { Separator } from "@/components/ui/separator";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface ChallengesProps {
    params: {
        challengeId: string;
    }
}

const Challenges = async ({ params }: ChallengesProps) => {
    const server = await db.server.findMany({
        select: { id: true}
    });
    const currprofile = await currentProfile();
    if (!currprofile) {
        return redirect("/")
    }
    const challenges = await db.challenge.findMany({
    });

    

    return (
        <div className="h-full">
            <div className="hidden md:flex h-full w-[155px] z-30 flex-col fixed inset-y-0">
                <NavigationSidebar />
            </div>
            <main className="pl-[10px] pr-[10px] h-full md:pl-[170px] pr-[40px] h-full">
                <HomeMobileToggle />
                <div className="flex flex-row items-center justify-between mt-5">
                    <div className="text-4xl ml-9 mb-5">
                        <strong>CHALLENGES</strong>
                    </div>
                    <ServerSearch
                        data={[
                            {
                                label: "Challenges",
                                type: "challenge",
                                data: challenges.filter(challenge => server.some(server => server.id === challenge.serverId))
                                    .map(challenge => ({
                                        id: challenge.id,
                                        name: challenge.name,
                                    }))
                            }
                        ]} />
                </div>


                <Separator className="h-[3px] dark:bg-[rgb(92,41,96)] bg-[rgb(56,37,91)] w-full mt-2" />

                <div style={{ paddingTop: '20px', paddingLeft: '30px' }}>
                    {/* Text to be added */}
                    <p className="text-black" style={{ fontWeight: 'bold' }}>Grow your skills by competing in our exciting competitions.
                        <br />Find help in the documentation or learn about Community Competitions.</p>
                </div>





                <div className="flex flex-wrap gap-2 p-9 justify-center">
                    {challenges.filter(challenge => server.some(server => server.id === challenge.serverId))
                        .map((challenge) => (
                            <div key={challenge.id} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
                                <NavigationItem
                                    id={challenge.id}
                                    name={challenge.name}
                                    prize={challenge.prize}
                                    duration={challenge.duration}
                                    by={challenge.objective}
                                    img={challenge.imgUrl}
                                />
                            </div>
                        ))}
                </div>
                <div className="flex items-center">
                    <NavigationAction />
                </div>
            </main>
        </div>
    );
}

export default Challenges;
