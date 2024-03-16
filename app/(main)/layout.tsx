import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";

const MainLayout = async ({
    children
}: {children: React.ReactNode}) => {
    return ( 
        <div className="h-full">
            <div className="hidden md:flex h-full w-[155px] z-30 flex-col fixed inset-y-0">
                <NavigationSidebar/>
            </div>
            <main className="pl-[20px] pr-[10px] pt-[10px] sm:pl-[50px] h-full md:pl-[200px] md:pr-[45px] md:pt-[45px] md:h-full">
                {children}
            </main>
        </div>
     );
}
 
export default MainLayout;