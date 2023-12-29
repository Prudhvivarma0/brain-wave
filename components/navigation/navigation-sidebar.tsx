import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ModeToggle } from "../mode-toggle";
import { Separator } from "../ui/separator";
import Challenges from "./challenges";
import HomeButton from "./home";
import { NavigationAction } from "./navigation-action";
import VirtualExhibits from "./virtual-exhibits";

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

    return(
        <div className="space-y-4 flex flex-col items-center h-full text-white w-full bg-[#a733b9] dark:bg-[#4f2456] py-3">
            <NavigationAction />
            <Separator className="h-[2px] bg-[#c073bc] rounded-md w-20 mx-auto" />
            <div className="flex flex-col items-center gap-y-3 h-full">
                <HomeButton />
                <VirtualExhibits />
                <Challenges />
                <div className="mt-auto flex items-center flex-col gap-y-3">
                    <ModeToggle />
                    <UserButton
                        afterSignOutUrl="/"
                        appearance={{
                            elements: {
                                avatarBox: "h-[50px] w-[50px]",
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    )
}