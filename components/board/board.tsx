'use client';
import { Tldraw } from '@tldraw/tldraw'
import '@tldraw/tldraw/tldraw.css'
// import '@tldraw/tldraw/ui.css'

export default function White() {
	return (
		<div
			style={{
				position: 'absolute',
				inset: 10,
				zIndex: 1, // Increase the z-index value
			}}
		>
			<Tldraw />

		</div>
	)
}