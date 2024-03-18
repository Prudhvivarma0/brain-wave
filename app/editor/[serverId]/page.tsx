import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
import Canvas from "@/components/canvascomp/canvas";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { HomeMobileToggle } from "@/components/home-mobile-toggle";
import { ChevronLeft } from "lucide-react";
// import Editor from "@/components/editor/editor";
import Tiptap from "@/components/editor/textEditor";
// import { Editor } from '@tinymce/tinymce-react';
import NewTextEditor from "@/components/editor/newTextEditor";
import App from "@/components/editor/cke";
import NewEditor from "@/components/editor/cke";
import CKEditorComponent from "@/components/editor/editorr";
import Editor from "@/components/editor/editor";
import TextEditors from "@/components/editor/TextEditorr";

const TextEditor = async ({
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
                    <strong>TEXT EDITOR</strong>
                </div>
            </div>
            <Separator className="h-[3px] dark:bg-[rgb(92,41,96)] bg-[rgb(56,37,91)] w-full mt-4 mb-6" />
            {/* <Editor children={undefined}/> */}
            {/* <Tiptap/> */}
            {/* <NewTextEditor /> */}
            {/* <CKEditorComponent/> */}
            <TextEditors/>
            </main>          
        </div>
          
      </>

        
     );
}
 
export default TextEditor;