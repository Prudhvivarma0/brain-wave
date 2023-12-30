"use client"

import { useModal } from "@/hooks/use-modal-store";
import { useOrigin } from "@/hooks/use-origin";
import axios from "axios";
import { Check, Clipboard, QrCode, RefreshCw } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import QRcode from "qrcode";



export const InviteModal = () => {

    const [src, setSrc] = useState<string>('')

    const generate = () => {
        QRcode.toDataURL(`${inviteUrl}`).then(setSrc)
    }

    const { onOpen, isOpen, onClose, type, data } = useModal();

    const origin = useOrigin();

    const isModalOpen = isOpen && type === "invite";

    const {server} = data;

    const [copied, setCopied] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1000);
    };

    const onNew = async () => {
        try {
            setIsLoading(true);
            const response = await axios.patch(`/api/servers/${server?.id}/invite-code`)
            onOpen("invite", {server: response.data});
        } catch (error){
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog open = {isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-purple-500 dark:bg-[#301934] text-white p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Invite People
                    </DialogTitle>
                    <DialogDescription className="text-center text-white">
                        Send an invitation link to your friends and collegues to start collabing
                    </DialogDescription>
                </DialogHeader>
            <div className="p-6">
                <Label className="uppercase text-xs font-bold ">
                    Server Invite Link
                </Label>
                <div className="flex items-center mt-2 gap-x-2">
                    <Input disabled={isLoading} className="text-black dark:bg-white" value={inviteUrl}/>
                    <Button disabled={isLoading} onClick={onCopy} size="icon" className="bg-transparant">
                        {copied 
                        ? <Check className="w-4 h-4 text-white"/> 
                        : <Clipboard className="w-5 h-5 text-white"/>}
                    </Button>
                    <Button disabled={isLoading} onClick={generate} size="icon" className="bg-transparant">
                        <QrCode className="text-white"/>
                    </Button>
                </div>
                <Button onClick={onNew} disabled={isLoading} variant="link" size="sm" className="text-white mt-4">
                    <RefreshCw className="w-4 h-4 mr-2"/>
                    Generate new link
                </Button>
            </div>
            <div className="flex justify-center mb-0">
                <img className="rounded-[10px] mb-5" src={src}/>
            </div>
            </DialogContent>
        </Dialog>
    )
}
