"use client"
import { useMediaQuery } from 'react-responsive';

const WhiteBoard = () => {
    const isMdOrLarger = useMediaQuery({ minWidth: 768 }); // 768px is typically the breakpoint for md devices

    return (
        <>
            {isMdOrLarger && (
                <iframe
                className=""
                src="https://excalidraw.com/"
                width="100%"
                height="100%"
                title="Embedded Editor"
                />
            )}
        </>
    )
}

export default WhiteBoard;