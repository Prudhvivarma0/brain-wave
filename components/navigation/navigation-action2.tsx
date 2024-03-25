"use client";

import { useModal } from "@/hooks/use-modal-store";

export const NavigationAction = () => {
    const { onOpen } = useModal();

    return (
        <div>
            <button
                onClick={() => onOpen("createChallenge")}
                className="group items-center"
                style={{ display: 'block', width: '150px', height: '40px', borderRadius: '12px', backgroundColor: 'rgb(102,26,138)', color: 'white', textAlign: 'center', lineHeight: '40px', cursor: 'pointer', border: 'none', outline: 'none' }}
            >
                <strong style={{ fontWeight: 'bold' }}>Host a Challenge</strong>
            </button>
        </div>
    );
};
