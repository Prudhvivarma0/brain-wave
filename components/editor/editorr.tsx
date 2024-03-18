'use client';
import React, { useEffect, useRef } from 'react';
import NewEditor from './cke'; // Adjust the import path as necessary

const CKEditorComponent: React.FC = () => {
 const editorRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
    let editorInstance: any = null;

    if (editorRef.current) {
      // Initialize the editor when the component mounts
      NewEditor.create(editorRef.current, {
        // Configuration options
        collaboration: {
          channelId: 'wss://107101.cke-cs.com/ws',
        },
      }).then((instance) => {
        editorInstance = instance;
      }).catch((error) => {
        console.error('There was a problem initializing the editor.', error);
        })
        .then((instance) => {
          editorInstance = instance;
        })
        .catch((error) => {
          console.error('There was a problem initializing the editor.', error);
        });
    }

    // Clean up the editor instance when the component unmounts
    return () => {
      if (editorInstance) {
        editorInstance.destroy();
      }
    };
 }, []);

 return <div ref={editorRef} />;
};

export default CKEditorComponent;
