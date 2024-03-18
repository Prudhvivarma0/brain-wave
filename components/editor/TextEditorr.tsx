"use client";
import React, { useCallback, useEffect, useRef, useState } from 'react'
import "quill/dist/quill.snow.css"
import Quill from 'quill'
import './styles.css'
import { io, Socket } from 'socket.io-client';

const toolbarOptions = [
  [{header:[1,2,3,4,5,6,false]}],
  [{font:[]}],
  [{list:"ordered"},{list:"bullet"}],
  ["bold","italic","underline"],
  [{color:[]},{background:[]}],
  [{script:"sub"},{script:"super"}],
  [{align:[]}],
  ["image","blackquote","code-block"],
  ["clean"],
]

export default function TextEditors() {

  const [socket, setSocket] = useState<Socket | undefined>();
  const [quill,setQuill] = useState()

const urlSegments = window.location.pathname.split('/');
const documentId = urlSegments[urlSegments.length - 1];
console.log(documentId);

  useEffect(()=>{
   const s = io("http://localhost:3001")
   setSocket(s)

   return () => {
    s.disconnect()
   }
  },[])

  useEffect(()=>{

    if(socket == null || quill == null) return

    socket.once("load-document", document => {
      quill.setContents(document)
      quill.enable()
    })
    socket.emit('get-document',documentId)

  },[socket,quill,documentId])

  useEffect(() => {
    if(socket==null || quill==null) return
    
    const handler = (delta) => {
      quill.updateContents(delta)

    }

    socket.on('recive-changes', handler)

    return () => {
      socket.off('recive-changes',handler)
    }
  },[socket,quill])

  useEffect(() => {
    if(socket==null || quill==null) return

    const handler = (delta,oldDelta,source) => {
      if (source !== 'user') return
      socket.emit("send-changes",delta)

    }

    quill.on('text-change', handler)

    return () => {
      quill.off('text-change',handler)
    }
  },[socket,quill])


  const wrapperRef= useCallback((wrapper) => {
    if (wrapper == null) return
    wrapper.innerHTML = ''
    const editor = document.createElement('div')
    wrapper.append(editor)
    const q = new Quill(editor, {theme: "snow", modules:{toolbar:toolbarOptions}})
    q.disable()
    q.setText("Loading...")
    setQuill(q)
  },[])

  return (
    <div className="container" ref={wrapperRef}></div>
  )
}


