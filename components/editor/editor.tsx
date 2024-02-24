// app/editor/page.tsx
'use client';
import { NavigationSidebar } from "@/components/navigation/navigation-sidebar";
import Canvas from "@/components/canvascomp/canvas";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { HomeMobileToggle } from "@/components/home-mobile-toggle";
import { ChevronLeft } from "lucide-react";
import React, { useState, useEffect, useRef } from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill, { Quill } from 'react-quill';
interface QuillState {
    quill: Quill | null; // Initially can be null 
}

const Editor = ({
    children
}: { children: React.ReactNode }) => {
    const [quillState, setQuillState] = useState<QuillState>({ quill: null });
    const quillRef = useRef(null);
    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        ['link', 'image', 'video', 'formula'],
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
      
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
      
        ['clean']                                         // remove formatting button
      ];

    useEffect(() => {
        if (quillRef.current && !quillState.quill) {
            const newQuill = new Quill(quillRef.current, {
                modules: {
                    toolbar: toolbarOptions
                },
                theme: 'snow'
            });

            setQuillState(prevState => ({ ...prevState, quill: newQuill })); // Update using setter
        }
    }, []);

    // ... rest of your Editor component 

    return (
            <div ref={quillRef}/>
            
    );
}

export default Editor;
