'use client';
import { Tldraw, track, useEditor } from '@tldraw/tldraw'
import '@tldraw/tldraw/tldraw.css'
// import '@tldraw/tldraw/ui.css'
import { useYjsStore } from './useYjsStore'
import './index.css'

const HOST_URL ='ws://localhost:1234';

export default function YjsExample({ roomId }: { roomId: string }) {
	const store = useYjsStore({
		roomId: roomId,
		hostUrl: HOST_URL,
		version: 1,
		shapeUtils: [],
	})

	return (
		<div className="tldraw__editor">
			<Tldraw
				autoFocus
				store={store}
				components ={{
					SharePanel: NameEditor,
				}}
			/>
		</div>
	)
}

const NameEditor = track(() => {
	const editor = useEditor()

	const { color, name } = editor.user.getUserPreferences()

	return (
		<div style={{ pointerEvents: 'all', display: 'flex' }}>
			<input
				type="color"
				value={color}
				onChange={(e) => {
					editor.user.updateUserPreferences({
						color: e.currentTarget.value,
					})
				}}
			/>
			<input
				value={name}
				onChange={(e) => {
					editor.user.updateUserPreferences({
						name: e.currentTarget.value,
					})
				}}
			/>
		</div>
	)
})
