"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Plus } from 'lucide-react';

export const NavigationAction = () => {
    const {onOpen} = useModal();
    return(
        <div>
            <button
            onClick={() => onOpen("createServer")}
            className="group relative flex flex-col items-center w-[220px] "
            >
                <div className="relative flex mx-9 h-[200px] w-[280px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center" style={{backgroundColor: 'rgb(229, 228, 231)'}}>
                    <div className="text-white transform group-hover:rotate-90 transition-transform duration-500"><Plus style={{color: 'rgb(118, 107, 217)'}} size={40} /></div>
                </div>
            </button>
            <div className="text-3x1 mt-6" style={{visibility: 'hidden'}}>. </div>
        </div>
    )
}
