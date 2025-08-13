export const INLINE_STYLES = [
	{ label: 'Bold', style: 'BOLD' },
	{ label: 'Italic', style: 'ITALIC' },
	{ label: 'Underline', style: 'UNDERLINE' },
	{ label: 'Monospace', style: 'CODE' },
];

export const BLOCK_TYPES = [
	{ label: 'H1', style: 'header-one' },
	{ label: 'H2', style: 'header-two' },
	{ label: 'H3', style: 'header-three' },
	{ label: 'H4', style: 'header-four' },
	{ label: 'H5', style: 'header-five' },
	{ label: 'H6', style: 'header-six' },
	{ label: 'Blockquote', style: 'blockquote' },
	{ label: 'UL', style: 'unordered-list-item' },
	{ label: 'OL', style: 'ordered-list-item' },
	{ label: 'Code Block', style: 'code-block' },
];

export const ALIGNMENT_STYLES = [
	{ label: 'Left', style: 'left' },
	{ label: 'Center', style: 'center' },
	{ label: 'Right', style: 'right' },
];

export const emptyContent = {
	blocks: [
		{
			key: 'initial',
			text: '',
			type: 'unstyled',
			depth: 0,
			inlineStyleRanges: [],
			entityRanges: [],
			data: {},
		},
	],
	entityMap: {},
};
