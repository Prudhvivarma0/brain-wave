'use client';
import { Tldraw } from '@tldraw/tldraw'
import '@tldraw/tldraw/tldraw.css'
// import '@tldraw/tldraw/ui.css'

export default function White() {
	return (
		<div
			style={{
				position: 'fixed',
				inset: 0,
			}}
		>
			<Tldraw />

		</div>
	)
}