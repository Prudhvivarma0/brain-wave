import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
import dynamic from "next/dynamic";


const MainLayout = async ({
    children
}: {children: React.ReactNode}) => {
    
    return (
        <div className="h-full">
          <div className="hidden md:flex h-full w-[155px] z-30 flex-col fixed inset-y-0">
            <NavigationSidebar />
          </div>
          <main className="md:pl-[180px] md:pr-[45px] md:pt-[30px]">
              {children}
            {/* </div> */}
          </main>
        </div>
      );
      
}
 
export default MainLayout;