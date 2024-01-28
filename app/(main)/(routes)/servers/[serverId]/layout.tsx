import { ServerSidebar } from "@/components/server/server-sidebar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const ServerIdLayout = async ({
    children, 
    params
}: {
    children: React.ReactNode; 
    params: {serverId: string}
}) => {
    const profile = await currentProfile();
    if (!profile){
        return redirectToSignIn();
    }

    const server = await db.server.findUnique({
        where: {
            id: params.serverId,
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });
    if (!server) {
        return redirect("/");
    }
    return ( 
        <div className="h-full flex">
            <div className="w-50 z-20 flex-col fixed inset-y-8 ml-3 mt-20 mb-20 md:block hidden mr-4">
                <ServerSidebar serverId={params.serverId}/>
            </div>
            <main className="h-full md:pl-56 md:pt-20 mr-[30px] flex-grow">
                {children}
            </main>     
        </div>
    );
}
 
export default ServerIdLayout;

