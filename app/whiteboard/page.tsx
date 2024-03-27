//raiqah commit testing
import { HomeMobileToggle } from "@/components/home-mobile-toggle";
import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
import { Separator } from "@/components/ui/separator";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChevronLeft } from "lucide-react";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

const Whiteboard = async () => {
    const server = await db.server.findFirst({

    });
    const Editor = dynamic(
        async () => import('@/components/board/board'),
        { ssr: false }
    );
    const currprofile = await currentProfile();
    if (!currprofile) {
        return redirect("/")
    }
    if (currprofile.isBanned) {
        return redirect("/banned"); // replace "/banned" with the path to your banned page
    }
    const servers = await db.server.findMany({
    });
    return ( 
      <>
        <div className="h-full">
            <div className="hidden md:flex h-full w-[155px] z-30 flex-col fixed inset-y-0">
                <NavigationSidebar/>
            </div> 
            <main className="md:pl-[180px] pr-[20px] h-full">
            <HomeMobileToggle/>
            <div className="flex items-center justify-between mt-5">
                <div className="text-4xl ml-9">
                    <strong>WHITEBOARD</strong>
                </div>
                <button>
                <ChevronLeft className="pr-1"/>
                </button>
            </div>
            <div className="text-1xl ml-9">
            {currprofile.name.split(' ')[0]}'s Whiteboard
            </div>

            <Separator className="h-[3px] dark:bg-[rgb(92,41,96)] bg-[rgb(56,37,91)] w-full mt-4" />
            <div className="mt-6" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', width: '86vw', position: 'relative' }}>
                <div style={{ width: '90%', height: '90%', position: 'relative', paddingLeft:'50px' }}>
                    <Editor roomId=""/>
                </div>
                </div>
            </main>          
        </div>
          
      </>
     );
}
 
export default Whiteboard;
