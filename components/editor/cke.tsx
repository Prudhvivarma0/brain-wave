/**
 * @license Copyright (c) 2014-2024, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

import { ClassicEditor } from '@ckeditor/ckeditor5-editor-classic';

import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { CKBox } from '@ckeditor/ckeditor5-ckbox';
import { CloudServices } from '@ckeditor/ckeditor5-cloud-services';
import { Comments } from '@ckeditor/ckeditor5-comments';
import type { EditorConfig } from '@ckeditor/ckeditor5-core';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { ExportPdf } from '@ckeditor/ckeditor5-export-pdf';
import { ExportWord } from '@ckeditor/ckeditor5-export-word';
import { FontColor, FontFamily, FontSize } from '@ckeditor/ckeditor5-font';
import {
	Image,
	ImageCaption,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	PictureEditing
} from '@ckeditor/ckeditor5-image';
import { ImportWord } from '@ckeditor/ckeditor5-import-word';
import { Link } from '@ckeditor/ckeditor5-link';
import { List } from '@ckeditor/ckeditor5-list';
import { MediaEmbed } from '@ckeditor/ckeditor5-media-embed';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office';
import {
	RealTimeCollaborativeComments,
	RealTimeCollaborativeEditing,
	RealTimeCollaborativeRevisionHistory,
	RealTimeCollaborativeTrackChanges
} from '@ckeditor/ckeditor5-real-time-collaboration';
import { RevisionHistory } from '@ckeditor/ckeditor5-revision-history';
import { Table, TableToolbar } from '@ckeditor/ckeditor5-table';
import { TrackChanges } from '@ckeditor/ckeditor5-track-changes';
import { TextTransformation } from '@ckeditor/ckeditor5-typing';
import { Undo } from '@ckeditor/ckeditor5-undo';

// You can read more about extending the build with additional plugins in the "Installing plugins" guide.
// See https://ckeditor.com/docs/ckeditor5/latest/installation/plugins/installing-plugins.html for details.

class NewEditor extends ClassicEditor {
	public static override builtinPlugins = [
		Autoformat,
		BlockQuote,
		Bold,
		CKBox,
		CloudServices,
		Comments,
		Essentials,
		ExportPdf,
		ExportWord,
		FontColor,
		FontFamily,
		FontSize,
		Image,
		ImageCaption,
		ImageStyle,
		ImageToolbar,
		ImageUpload,
		ImportWord,
		Italic,
		Link,
		List,
		MediaEmbed,
		Paragraph,
		PasteFromOffice,
		PictureEditing,
		RealTimeCollaborativeComments,
		RealTimeCollaborativeEditing,
		RealTimeCollaborativeRevisionHistory,
		RealTimeCollaborativeTrackChanges,
		RevisionHistory,
		Table,
		TableToolbar,
		TextTransformation,
		TrackChanges,
		Undo
	];

	public static override defaultConfig: EditorConfig = {
		toolbar: {
			items: [
				'bold',
				'italic',
				'link',
				'bulletedList',
				'numberedList',
				'|',
				'imageUpload',
				'blockQuote',
				'insertTable',
				'mediaEmbed',
				'|',
				'fontFamily',
				'fontColor',
				'fontSize',
				'|',
				'exportPdf',
				'importWord',
				'exportWord',
				'|',
				'undo',
				'redo',
				'commentsArchive',
				'comment',
				'trackChanges',
				'revisionHistory'
			]
		},
		language: 'en',
		image: {
			toolbar: [
				'imageTextAlternative',
				'toggleImageCaption',
				'imageStyle:inline',
				'imageStyle:block',
				'imageStyle:side',
				'comment',
				'comment'
			]
		},
		table: {
			contentToolbar: [
				'tableColumn',
				'tableRow',
				'mergeTableCells'
			],
			tableToolbar: [
				'comment',
				'comment'
			]
		},
		comments: {
			editorConfig: {
				extraPlugins: [
					Autoformat,
					Bold,
					Italic,
					List
				]
			}
		}
	};
}

export default NewEditor;
