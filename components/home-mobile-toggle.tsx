import { MenuIcon } from "lucide-react"
import { NavigationSidebar } from "./navigation/navigation-sidebar"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"

export const HomeMobileToggle = () => {
    return(
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <MenuIcon/>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 flex gap-0 w-[130px]">
                <div className="w-[155px]">
                    <NavigationSidebar/>
                </div>
            </SheetContent>
        </Sheet>
    )
}