"use client";

import { useModal } from "@/hooks/use-modal-store";

export const NavigationAction = () => {
    const {onOpen} = useModal();
    return(
        <div style={{position: 'fixed', bottom: '20px', right: '20px' }}>
            <button
            onClick={() => onOpen("createChallenge")}
            className="group items-center"
            >
                <div className="flex h-[40px] w-[150px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-[#a733b9] group-hover:bg-[#b539cb]">
                    <div className="text-white">Create Challenge</div>
                </div>
            </button>
        </div>
    )
}
