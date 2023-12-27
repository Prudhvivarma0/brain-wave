// This is root file

import { InitialModal } from "@/components/modals/initial-modal";
import { NavigationItem } from "@/components/navigation/navigation-item";
import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { currentProfile } from "@/lib/current-profile";
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
    const currprofile = await currentProfile();
    if (!currprofile) {
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

    // if server/s exist, return home page
    if (server) {
        // return redirect(`/servers/${server.id}`);
        return(
            <div className="h-full">
            <div className="hidden md:flex h-full w-[120px] z-30 flex-col fixed inset-y-0">
                <NavigationSidebar/>
            </div>
            <main className="md:pl-[120px] h-full">
                <div className="text-4xl">
                    Servers
                </div>
                
                <ScrollArea className="flex-1 w-full">
                    {servers.map((server) => (
                        <div key={server.id} className="mb-4">
                            <NavigationItem
                                id={server.id}
                                name={server.name}
                                imageUrl={server.imageUrl}
                            />
                        </div>
                    ))}
                </ScrollArea>
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