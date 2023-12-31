import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";

const VirtualExhibits = async ({
    children
}: {children: React.ReactNode}) => {
    return ( 
        <div className="h-full">
            <div className="hidden md:flex h-full w-[135px] z-30 flex-col fixed inset-y-0">
                <NavigationSidebar/>
            </div>
            <main className="md:pl-[135px] h-full">
                Virtual Exhibits
            </main>
        </div>
     );
}
 
export default VirtualExhibits;