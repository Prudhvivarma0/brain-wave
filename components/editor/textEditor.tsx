'use client';
import Heading from '@tiptap/extension-heading';
import { EditorContent, EditorProvider, useCurrentEditor, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const extensions = [
  StarterKit,
  Heading
]

const content = ''

const Tiptap = () => {

  const editor = useEditor({
    extensions,
    content
  })

  if (!editor) {
    return null
  }
  return (
    <div>
      <div>
        <button onClick={() => editor.chain().focus().toggleBold().run()} disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
          style={{ 
            backgroundColor: 'lightgray', /* A lighter shade of gray */
            color: 'black',  
            padding: '5px 10px', /* Adds padding of 10px top/bottom, 15px left/right */
            /* ... rest of your styles ... */
          }}>B</button>
          <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
        className={editor.isActive('italic') ? 'is-active' : ''}
        style={{ 
          backgroundColor: 'lightgray', /* A lighter shade of gray */
          color: 'black',  
          padding: '5px 10px', /* Adds padding of 10px top/bottom, 15px left/right */
          /* ... rest of your styles ... */
        }}
      >
        I
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleStrike()
            .run()
        }
        className={editor.isActive('strike') ? 'is-active' : ''}
        style={{ 
          backgroundColor: 'lightgray', /* A lighter shade of gray */
          color: 'black',  
          padding: '5px 10px', /* Adds padding of 10px top/bottom, 15px left/right */
          /* ... rest of your styles ... */
        }}
      >
        S
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .toggleCode()
            .run()
        }
        className={editor.isActive('code') ? 'is-active' : ''}
        style={{ 
          backgroundColor: 'lightgray', /* A lighter shade of gray */
          color: 'black',  
          padding: '5px 10px', /* Adds padding of 10px top/bottom, 15px left/right */
          /* ... rest of your styles ... */
        }}
      >
        C
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? 'is-active' : ''}
        style={{ 
          backgroundColor: 'lightgray', /* A lighter shade of gray */
          color: 'black',  
          padding: '5px 10px', /* Adds padding of 10px top/bottom, 15px left/right */
          /* ... rest of your styles ... */
        }}
      >
        P
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
        style={{ 
          backgroundColor: 'lightgray', /* A lighter shade of gray */
          color: 'black',  
          padding: '5px 10px', /* Adds padding of 10px top/bottom, 15px left/right */
          /* ... rest of your styles ... */
        }}
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
        style={{ 
          backgroundColor: 'lightgray', /* A lighter shade of gray */
          color: 'black',  
          padding: '5px 10px', /* Adds padding of 10px top/bottom, 15px left/right */
          /* ... rest of your styles ... */
        }}
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
        style={{ 
          backgroundColor: 'lightgray', /* A lighter shade of gray */
          color: 'black',  
          padding: '5px 10px', /* Adds padding of 10px top/bottom, 15px left/right */
          /* ... rest of your styles ... */
        }}
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
        style={{ 
          backgroundColor: 'lightgray', /* A lighter shade of gray */
          color: 'black',  
          padding: '5px 10px', /* Adds padding of 10px top/bottom, 15px left/right */
          /* ... rest of your styles ... */
        }}
      >
        h4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
        style={{ 
          backgroundColor: 'lightgray', /* A lighter shade of gray */
          color: 'black',  
          padding: '5px 10px', /* Adds padding of 10px top/bottom, 15px left/right */
          /* ... rest of your styles ... */
        }}
      >
        h5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
        style={{ 
          backgroundColor: 'lightgray', /* A lighter shade of gray */
          color: 'black',  
          padding: '5px 10px', /* Adds padding of 10px top/bottom, 15px left/right */
          /* ... rest of your styles ... */
        }}
      >
        h6
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
        style={{ 
          backgroundColor: 'lightgray', /* A lighter shade of gray */
          color: 'black',  
          padding: '5px 10px', /* Adds padding of 10px top/bottom, 15px left/right */
          /* ... rest of your styles ... */
        }}
      >
        bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
        style={{ 
          backgroundColor: 'lightgray', /* A lighter shade of gray */
          color: 'black',  
          padding: '5px 10px', /* Adds padding of 10px top/bottom, 15px left/right */
          /* ... rest of your styles ... */
        }}
      >
        ordered list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
        style={{ 
          backgroundColor: 'lightgray', /* A lighter shade of gray */
          color: 'black',  
          padding: '5px 10px', /* Adds padding of 10px top/bottom, 15px left/right */
          /* ... rest of your styles ... */
        }}
      >
        code block
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive('blockquote') ? 'is-active' : ''}
        style={{ 
          backgroundColor: 'lightgray', /* A lighter shade of gray */
          color: 'black',  
          padding: '5px 10px', /* Adds padding of 10px top/bottom, 15px left/right */
          /* ... rest of your styles ... */
        }}
      >
        blockquote
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}
      style={{ 
        backgroundColor: 'lightgray', /* A lighter shade of gray */
        color: 'black',  
        padding: '5px 10px', /* Adds padding of 10px top/bottom, 15px left/right */
        /* ... rest of your styles ... */
      }}>
        horizontal rule
      </button>
      <button onClick={() => editor.chain().focus().setHardBreak().run()}
      style={{ 
        backgroundColor: 'lightgray', /* A lighter shade of gray */
        color: 'black',  
        padding: '5px 10px', /* Adds padding of 10px top/bottom, 15px left/right */
        /* ... rest of your styles ... */
      }}>
        hard break
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .undo()
            .run()
        }
        style={{ 
          backgroundColor: 'lightgray', /* A lighter shade of gray */
          color: 'black',  
          padding: '5px 10px', /* Adds padding of 10px top/bottom, 15px left/right */
          /* ... rest of your styles ... */
        }}
      >
        undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .redo()
            .run()
        }
        style={{ 
          backgroundColor: 'lightgray', /* A lighter shade of gray */
          color: 'black',  
          padding: '5px 10px', /* Adds padding of 10px top/bottom, 15px left/right */
          /* ... rest of your styles ... */
        }}
      >
        redo
      </button>
      </div>
      <div>
        <EditorContent editor={editor}/>
      </div>
    </div>
  )
}

export default Tiptap