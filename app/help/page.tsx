import { HomeMobileToggle } from "@/components/home-mobile-toggle";
import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
import { Separator } from "@/components/ui/separator";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChevronLeft, Contact } from "lucide-react";
import { redirect } from "next/navigation";
import { HelpItem, helpData, FAQItem, faqData } from "./helpData";
import { Button } from "@/components/ui/button";
// import Editor from "@/components/editor/editor";
// import { Editor } from '@tinymce/tinymce-react';

const Helpp = async () => {
    const server = await db.server.findFirst({

    });

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
            <div className="print-container">
            <div className="hidden md:flex h-full w-[155px] z-30 flex-col fixed inset-y-0">
                <NavigationSidebar/>
            </div> 
            </div>
            <main className="md:pl-[180px] pr-[20px] h-full">
            <div className="print-container">
            <HomeMobileToggle/>
            <div className="flex items-center justify-between mt-5">
                <div className="text-4xl ml-9">
                    <strong>HELP SAMPLE</strong>
                </div>
            </div>
            <Separator className="h-[3px] dark:bg-[rgb(92,41,96)] bg-[rgb(56,37,91)] w-full mt-4 mb-6" />
            <div>
            <div>
                <b className="text-xl">FAQs</b>
                {helpData.map((item: HelpItem, index: number) => (
                <div key={index}>
                    <h3><b>Q.</b>{item.title}</h3>
                    <p><b>A.</b>{item.content}</p>
                    <div className="mt-[8px]"/>
                </div>
                ))}
            </div>
            <div>
                {faqData.map((item: FAQItem, index: number) => (
                <div key={index}>
                    <h3><b>Q.</b> {item.question}</h3>
                    <p><b>A.</b> {item.answer}</p>
                    <div className="mt-[8px]"/>
                </div>
                ))}
            </div>
        </div>
    </div>
    <a className="text-blue-500 hover:underline" href="https://yoboz.github.io/CodeCraftSolutionsSite/">Contact Us Here</a>
    </main>        
    </div>      
    </>
        
     );
}
 
export default Helpp;
