import { ServerSidebar } from "@/components/server/server-sidebar";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const ServerIdLayout = async ({
    children, params
}: {children: React.ReactNode; 
    params: {serverId: string}}) => {
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
        
        <div className="h-full ">
            
            <div className="hidden md:flex h-full w-50 z-20 flex-col fixed inset-y-8 ml-8 mt-20 mb-20">
                <ServerSidebar serverId={params.serverId}/>
            </div>
            <main className="h-full md:pl-60 md:pt-20 mr-[30px]">
                {children}
            </main>     
        </div>
     );
}
 
export default ServerIdLayout;