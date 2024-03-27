import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface ServerPageProps {
    params: {
        serverId: string
    }
}

const ServerPage = async ({
    params
}: ServerPageProps) => {
    const profile = await currentProfile();
    if (!profile) {
        return redirectToSignIn();
    } 
    if (profile.isBanned) {
        return redirect("/banned"); // replace "/banned" with the path to your banned page
    }

    const server = await db.server.findUnique({
        where: {
            id: params.serverId,
            members: {
                some: {
                    profileId: profile.id
                }
            }
        },
        include: {
            channels: {
                where: {
                    name: "main"
                },
                orderBy: {
                    createdAt: "asc"
                }
            }
        }
    });

    const initialChannel = server?.channels[0];
    if (initialChannel?.name !== "main") {
        return null;
    }
    return ( 
        redirect(`/servers/${params.serverId}/channels/${initialChannel?.id}`)
     );
}
 
export default ServerPage;