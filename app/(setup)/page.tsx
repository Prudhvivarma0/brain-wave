// This is root file

import { InitialModal } from "@/components/modals/initial-modal";
import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
import { db } from "@/lib/db";
import { initailProfile } from "@/lib/initial-profile";
import { redirect } from "next/navigation";

const SetupPage = async () => {
    // Loads the profile of the user
    const profile = await initailProfile();

    // Looking for collabs the user is in
    const server = await db.server.findFirst({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    // if server/s exist, return home page
    if (server) {
        // return redirect(`/servers/${server.id}`);
        return(
            <div className="h-full">
            <div className="hidden md:flex h-full w-[120px] z-30 flex-col fixed inset-y-0">
                <NavigationSidebar/>
            </div>
            <main className="md:pl-[120px] h-full">
                Server Area
            </main>
        </div>
        )
    }

    // else prompt to make a server
    return ( 
        <InitialModal/>
    );
}
 
export default SetupPage;