"use client";

import { Plus } from "lucide-react";

export const NavigationAction = () => {
    return(
        <div>
            <button
            className="group items-center"
            >
                <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-[#b754c9] group-hover:bg-[#b539cb]">
                    <Plus className="group-hover:text-white transition text-white"/>
                </div>
            </button>
        </div>
    )
}
