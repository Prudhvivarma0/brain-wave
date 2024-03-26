import { HomeMobileToggle } from "@/components/home-mobile-toggle";
import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
import { Separator } from "@/components/ui/separator";
import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { PostButton } from "@/components/navigation/postButton";
import { PostItems } from "@/components/navigation/postItems";
import { db } from "@/lib/db";

const VirtualExhibits = async ({
    children
}: {children: React.ReactNode}) => {
    const posts = await db.post.findMany({
        include: {
            profile: {
                select: { id:true,name: true ,imageUrl: true, userId:true }
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
            <main className="pl-[10px] md:pl-[170px] pr-[40px] h-full">
            <HomeMobileToggle/>
                <div className="flex items-center justify-between mt-5">
                    <div className="text-4xl ml-9 mb-5 ">
                        <strong>VIRTUAL EXHIBITS</strong>
                    </div>
                </div>
                <Separator className="h-[3px] dark:bg-[rgb(92,41,96)] bg-[rgb(56,37,91)] w-full mt-2 mb-6" />
                <div className="pl-[1px] justify-center md:pl-[140px]">
                <div className="flex items-center flex-wrap gap-10 mt-8 ml-5 md:flex items-center flex-wrap gap-20 mt-8 ml-10">
                    {posts.map((post) => (
                                <div key={post.id}>
                                    <PostItems
                                        id = {post.id}
                                        pfp = {post.profile.imageUrl}
                                        name = {post.profile.name}
                                        imageURL={post.imageURL}
                                        description={post.description}    
                                        currUser={currprofile.userId}
                                        postUser={post.profile.userId}    
                                        post={post.id}        
                                        liked={post.liked}
                                        isAdmin = {currprofile.isAdmin}                                                   
                                    />
                                </div>
                            ))}
                    </div>
                    </div>
                <div className="flex items-center">
                            <PostButton/>
                </div>  
            </main>
        </div>
     );
}
 
export default VirtualExhibits;
