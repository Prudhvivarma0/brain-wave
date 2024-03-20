// app/editor/page.tsx
'use client';
import quill from 'quill';
import { useEffect, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface QuillState {
    quill: quill | null; // Initially can be null 
}

const Editor = () => {
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
    
            setQuillState(prevState => ({ ...prevState, quill: newQuill }));
        }
    }, [quillState.quill]); // Add quillState.quill to the dependency array to prevent re-initialization

    // ... rest of your Editor component 

    return (
            // <div ref={quillRef} className="quill-editor"/>
            <ReactQuill 
                modules={{ toolbar: toolbarOptions }}
                placeholder="write some text here...." 
                className="h-full"
            />
            
    );
}

export default Editor;
