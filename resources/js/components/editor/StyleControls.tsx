import { BLOCK_TYPES, INLINE_STYLES } from '@/lib/draft-js/styles';
import { DraftBlockType, DraftInlineStyleType, EditorState } from 'draft-js';
import StyleButton from './StyleButton';

export const InlineStyleControls = ({
	editorState,
	onToggle,
}: {
	editorState: EditorState;
	onToggle: (inlineStyle: DraftInlineStyleType | DraftBlockType) => void;
}) => {
	const currentStyle = editorState.getCurrentInlineStyle();

	return (
		<div className='RichEditor-controls'>
			{INLINE_STYLES.map((type) => (
				<StyleButton
					key={type.label}
					active={currentStyle.has(type.style)}
					label={type.label}
					onToggle={onToggle}
					style={type.style as DraftInlineStyleType}
				/>
			))}
		</div>
	);
};

export const BlockStyleControls = ({
	editorState,
	onToggle,
}: {
	editorState: EditorState;
	onToggle: (inlineStyle: DraftInlineStyleType | DraftBlockType) => void;
}) => {
	const selection = editorState.getSelection();
	const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

	return (
		<div className='RichEditor-controls'>
			{BLOCK_TYPES.map((type) => (
				<StyleButton
					key={type.label}
					active={type.style === blockType}
					label={type.label}
					onToggle={onToggle}
					style={type.style as DraftBlockType}
				/>
			))}
		</div>
	);
};
