"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Plus } from "lucide-react";

export const NavigationAction = () => {
    const {onOpen} = useModal();
    return(
        <div>
            <button
            onClick={() => onOpen("createServer")}
            className="group items-center"
            >
                <div className="flex mx-3 h-[40px] w-[150px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-[#a733b9] group-hover:bg-[#b539cb]">
                    <div className="text-white">Create Team</div>
                </div>
            </button>
        </div>
    )
}
