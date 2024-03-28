'use client';
import { Tldraw, track, useEditor ,DefaultMainMenu,
	DefaultMainMenuContent,
	TLComponents,
	TldrawUiMenuGroup,
	TldrawUiMenuItem, Editor,TLShapeId,TLSvgOptions, exportAs} from '@tldraw/tldraw'
import '@tldraw/tldraw/tldraw.css'
// import '@tldraw/tldraw/ui.css'
import { useYjsStore } from './useYjsStore'
import './index.css'

export type TLExportType = 'svg' | 'png' | 'jpeg' | 'webp' | 'json'

const HOST_URL ='ws://localhost:1234';

function CustomMainMenu() {
	const editor = useEditor()
	return (
		
		<DefaultMainMenu>
			<div style={{ backgroundColor: 'white' }}>
				<TldrawUiMenuGroup id="example">
					<TldrawUiMenuItem
						id="export"
						label="Export As"
						icon="external-link"
						readonlyOk
						onSelect={() => {
							editor.selectAll();
							exportAs(editor,editor.getSelectedShapeIds(),'png','canvasimg');
						}}
					/>
				</TldrawUiMenuGroup>
			</div>
			<DefaultMainMenuContent />
		</DefaultMainMenu>
	)
}
const components: TLComponents = {
	MainMenu: CustomMainMenu,
}

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
					SharePanel: NameEditor, ...components
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
