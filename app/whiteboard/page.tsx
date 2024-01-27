import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
import Canvas from "@/components/canvascomp/canvas";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { HomeMobileToggle } from "@/components/home-mobile-toggle";

const Whiteboard = async ({
    children
}: {children: React.ReactNode}) => {
    const server = await db.server.findFirst({

    });
    const currprofile = await currentProfile();
    if (!currprofile) {
        return redirect("/")
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
            </div>
            <div className="text-1xl ml-9">
            {currprofile.name.split(' ')[0]}'s Whiteboard
            </div>
            <Separator className="h-[3px] dark:bg-[rgb(92,41,96)] bg-[rgb(56,37,91)] w-full mt-4" />
            <div className="mt-12" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80 vh' }}>
            <iframe
                src="https://excalidraw.com/"
                title="Web Whiteboard"
                width="1300"
                height="600"
            >
            </iframe>
            </div>
            </main>          
        </div>
          
      </>
     );
}
 
export default Whiteboard;