import { MenuIcon } from "lucide-react"
import { NavigationSidebar } from "./navigation/navigation-sidebar"
import { ServerSidebar } from "./server/server-sidebar"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Separator } from "./ui/separator"

export const MobileToggle = ({
    serverId
}: {serverId: string}) => {
    return(
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <MenuIcon/>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 flex gap-0">
                <div className="w-[155px]">
                    <NavigationSidebar/>
                </div>
                <div className="border-l border-black"></div>
                <div className="w-full">
                    <ServerSidebar
                    serverId={serverId}
                />
                </div>
            </SheetContent>
        </Sheet>
    )
}