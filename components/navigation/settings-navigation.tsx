"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";
import { Home, Settings } from "lucide-react";

export const NavSettings = () => {
    const {onOpen} = useModal();
    return(
        <div>
            <Button
            onClick={() => onOpen("settings")}
            className='text-white'
            style={{ border: '1px solid transperant', padding: '2px 25px', borderRadius: '20px',backgroundColor:'#b754c9'}}
            >
                <Settings className='pr-2'/>
                    Settings
            </Button>
        </div>
    )
}
