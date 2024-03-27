// This is root file

import { HomeMobileToggle } from "@/components/home-mobile-toggle";
import Help from "@/components/navigation/help";
import { NavigationAction } from "@/components/navigation/navigation-action";
import { NavigationItem } from "@/components/navigation/navigation-item";
import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
import { ServerSearch } from "@/components/server/server-main_search";
import { Separator } from "@/components/ui/separator";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { initailProfile } from "@/lib/initial-profile";
import { UserButton } from "@clerk/nextjs";
import { Bell, MessageCircleQuestion } from "lucide-react";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";
import car1 from "./imgs/car-1.jpg"
import car2 from "./imgs/car-2.jpg"
import car3 from "./imgs/car-3.jpg"
import car4 from "./imgs/car-4.jpg"
import car5 from "./imgs/car-5.jpg"
import ImageSlider from "@/components/navigation/imageslider";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import Joyride, { STATUS } from "react-joyride";
import { Button } from "@/components/ui/button";


const IMAGES = [
    { url: car1, alt: "Car One" },
    { url: car2, alt: "Car Two" },
    { url: car5, alt: "Car Three" },
    { url: car4, alt: "Car Four" },
    { url: car3, alt: "Car Five" },
];


const SetupPage = async () => {
    // // Loads the profile of the user
    // const profile = await initailProfile();

    // // Looking for collabs the user is in
    // const server = await db.server.findFirst({
    //     where: {
    //         members: {
    //             some: {
    //                 profileId: profile.id
    //             }
    //         }
    //     }
    // });
    const currprofile = await currentProfile();
    if (!currprofile) {
        return redirect("/")
    }
    if (currprofile.isBanned) {
        return redirect("/banned"); // replace "/banned" with the path to your banned page
    }
    const servers = await db.server.findMany({
        where: {
            members: {
                some: {
                    profileId: currprofile.id
                }
            }
        }
    });


    // if server/s exist, return home page
    // if (server) {
    // return redirect(`/servers/${server.id}`);

    

    return (
        <div className="h-full">
            <div id="nav" className="hidden md:flex h-full w-[145px] z-30 flex-col fixed inset-y-0 ">
                <NavigationSidebar />
            </div>
            <main className="pl-[10px] md:pl-[170px] pr-[40px] h-full">
                <HomeMobileToggle />
                <div id={"welcome"} className="flex justify-between items-center mt-7">
                    <div className="text-left">
                        <div className={`text-4xl ml-4`}>
                            Welcome <strong>{currprofile.name !== "null" ? currprofile.name.split(' ')[0].toUpperCase() : 'User'}</strong>!
                        </div>
                        <div className="text-1xl ml-5">
                            My Teams
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div id="search" className="mt-4 pr-6">
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
                                    // {
                                    // label: "Challenges", 
                                    // type: "challenge", 
                                    // data: challenges.map(challenge => ({ 
                                    //     id: challenge.id,
                                    //     name: challenge.name,                            
                                    // }))
                                    // }
                                ]} />
                        </div>
                        <Bell className="mr-4 mt-4 w-6 h-6" />
                        <div id="profile">
                        <UserButton
                            afterSignOutUrl="/sign-in"
                            appearance={{
                                elements: {
                                    avatarBox: "h-[50px] w-[50px]",
                                },
                            }}
                        />
                        </div>
                    </div>
                </div>

                <Separator className="h-[3px]  dark:bg-[rgb(92,41,96)] bg-[rgb(56,37,91)] w-full mt-5" />
                <div className="text-zinc-500 mt-3 ml-5">
                    {servers?.length} {servers?.length === 1 ? 'Team' : 'Teams'}
                </div>

                {/* <div
                    style={{
                        maxWidth: "1200px",
                        width: "100%",
                        aspectRatio: "10 / 6",
                        margin: "0 auto",
                    }}
                >
                    <ImageSlider images={IMAGES} />
                </div> */}
                {/* <div className="mt-5" style={{ marginBottom: '4rem' }}>
                <ImageSlider/>
                </div> */}

                <div id={"servers"} className="md:flex items-center flex-wrap gap-20 mt-8 ml-16">
                    {servers.map((server) => (
                        <div key={server.id} >
                            <NavigationItem
                                id={server.id}
                                name={server.name}
                                imageUrl={server.imageUrl}
                            />
                        </div>
                    ))}
                    <div id="create">
                    <NavigationAction />
                    </div>
                </div>
                <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
                    <Help/>
                </div>

            </main>
        </div>
    )
}

// // else prompt to make a server
// return (
//     <InitialModal />
// );
// }

export default SetupPage;