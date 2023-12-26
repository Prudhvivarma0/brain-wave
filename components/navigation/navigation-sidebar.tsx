import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ModeToggle } from "../mode-toggle";
import { Button } from "../ui/button";
import { NavigationAction } from "./navigation-action";

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
            <NavigationAction/>
            <div className=" pb-3 mt-auto flex items-center flex-col gap-y-3">
            <Button variant="link" className="text-white">Home</Button>
                    <Button variant="link" className="text-white">Virtual Exhibits</Button>
                    <Button variant="link" className="text-white">Challenges</Button>
                    <ModeToggle/>
                    <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                        elements: {
                            avatarBox: "h-[50px] w-[50px]"
                        }
                    }}
                    />
            </div>
        </div>
    )
}