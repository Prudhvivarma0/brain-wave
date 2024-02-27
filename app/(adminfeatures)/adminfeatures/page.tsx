import { HomeMobileToggle } from "@/components/home-mobile-toggle";
import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
import { Separator } from "@/components/ui/separator";
import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { PostButton } from "@/components/navigation/postButton";
import { PostItems } from "@/components/navigation/postItems";
import { db } from "@/lib/db";

const AdminFeatures = async ({
    children
}: {children: React.ReactNode}) => {
    const posts = await db.post.findMany({
        include: {
            profile: {
                select: { name: true ,imageUrl: true, userId:true }
            }
}});

    const currprofile = await currentProfile();
    if (!currprofile) {
        return redirect("/")
    }

    return ( 
        <div className="h-full">
            <div className="hidden md:flex h-full w-[155px] z-30 flex-col fixed inset-y-0">
                <NavigationSidebar/>
            </div>
            <main className="md:pl-[180px] pr-[20px] h-full">
            <HomeMobileToggle/>
                <div className="flex items-center justify-between mt-5">
                    <div className="text-4xl ml-9 mb-5 ">
                        <strong>Admin Features</strong>
                    </div>
                </div>
                <Separator className="h-[3px] dark:bg-[rgb(92,41,96)] bg-[rgb(56,37,91)] w-full mt-2 mb-6" />
                
            </main>
        </div>
     );
}
 
export default AdminFeatures;