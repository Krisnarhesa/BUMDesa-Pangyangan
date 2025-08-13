import { cn } from '@/lib/utils';
import {
	ContentBlock,
	DraftBlockType,
	DraftInlineStyleType,
	Editor,
	EditorCommand,
	EditorState,
	getDefaultKeyBinding,
	RichUtils,
} from 'draft-js';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { BlockStyleControls, InlineStyleControls } from './StyleControls';

import 'draft-js/dist/Draft.css';

export default function MyEditor({
	editorState,
	onChange,
	readOnly = false,
	textAlignment = 'left',
}: {
	editorState: EditorState;
	onChange: (state: EditorState) => void;
	readOnly?: boolean;
	textAlignment?: 'left' | 'right' | 'center';
}) {
	const [hidePlaceholder, setHidePlaceholder] = useState(false);
	const editorRef = useRef<Editor | null>(null);

	const focus = () => {
		if (editorRef.current) {
			editorRef.current.focus();
		}
	};
	const handleKeyCommand = (command: EditorCommand, editorState: EditorState) => {
		const newState = RichUtils.handleKeyCommand(editorState, command);
		if (newState) {
			onChange(newState);
			return 'handled';
		}
		return 'not-handled';
	};
	const mapKeyToEditorCommand = (e: KeyboardEvent) => {
		if (e.key === 'Tab' /* TAB */) {
			const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */);
			if (newEditorState !== editorState) {
				onChange(newEditorState);
			}
			return 'tab';
		}
		return getDefaultKeyBinding(e);
	};
	const toggleBlockType = (blockType: DraftBlockType) => {
		onChange(RichUtils.toggleBlockType(editorState, blockType));
	};
	const toggleInlineStyle = (inlineStyle: DraftInlineStyleType | DraftBlockType) => {
		onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
	};

	useEffect(() => {
		const contentState = editorState.getCurrentContent();
		if (!contentState.hasText()) {
			if (contentState.getBlockMap().first().getType() !== 'unstyled') {
				setHidePlaceholder(true);
			}
		}
	}, [editorState]);

	const styleMap = {
		CODE: {
			backgroundColor: 'rgba(0, 0, 0, 0.05)',
			fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
			fontSize: 16,
			padding: 2,
		},
	};

	function getBlockStyle(block: ContentBlock) {
		switch (block.getType()) {
			case 'blockquote':
				return 'border-l-[5px] text-[#666] italic mx-4 px-[10px] py-[20px] font-crimson';
			case 'header-six':
				return 'text-lg font-bold';
			case 'header-five':
				return 'text-xl font-bold';
			case 'header-four':
				return 'text-2xl font-bold';
			case 'header-three':
				return 'text-3xl font-bold';
			case 'header-two':
				return 'text-4xl font-bold';
			case 'header-one':
				return 'text-5xl font-bold';
			default:
				return 'null';
		}
	}

	return (
		<div
			className={cn('border-[1px] border-[#ddd] bg-[#fff] p-[15px] text-sm', {
				'm-0 border-none p-0 text-base': readOnly,
			})}
		>
			{!readOnly && (
				<>
					<BlockStyleControls editorState={editorState} onToggle={toggleBlockType} />
					<InlineStyleControls editorState={editorState} onToggle={toggleInlineStyle} />
				</>
			)}
			<div
				className={cn('mt-[10px] cursor-text border-t-[1px] border-[#ddd] pt-4', { 'm-0 border-none p-0': readOnly })}
				onClick={focus}
			>
				<Editor
					blockStyleFn={getBlockStyle}
					customStyleMap={styleMap}
					editorState={editorState}
					handleKeyCommand={handleKeyCommand}
					keyBindingFn={mapKeyToEditorCommand}
					onChange={onChange}
					placeholder={hidePlaceholder ? '' : 'Ketik disini...'}
					ref={editorRef}
					spellCheck={true}
					readOnly={readOnly}
					textAlignment={textAlignment}
				/>
			</div>

			<p className='text-'></p>
		</div>
	);
}
