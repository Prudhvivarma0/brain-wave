import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";

const MainLayout = async ({
    children
}: {children: React.ReactNode}) => {
    return ( 
        <div className="h-full">
            <div className="hidden md:flex h-full w-[155px] z-30 flex-col fixed inset-y-0">
                <NavigationSidebar/>
            </div>
            <main className="pt-[30px] pr-[65px] md:pl-[200px] pr-[20px] h-full">
                {children}
            </main>
        </div>
     );
}
 
export default MainLayout;