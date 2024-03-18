'use client';
import { Tldraw } from '@tldraw/tldraw'
import '@tldraw/tldraw/tldraw.css'
import { useMediaQuery } from 'react-responsive';
// import '@tldraw/tldraw/ui.css'

export default function White() {
	const isMdOrLarger = useMediaQuery({ minWidth: 768 });
	
	return (
		<>
		{isMdOrLarger && (
		<div
			style={{
				position: 'absolute',
				inset: 10,
				zIndex: 1, // Increase the z-index value
			}}
		>
			<Tldraw />

		</div>)}
		</>
	)
}