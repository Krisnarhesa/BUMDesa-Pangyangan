import { cn } from '@/lib/utils';
import { DraftBlockType, DraftInlineStyleType } from 'draft-js';

export default function StyleButton({
	active,
	label,
	onToggle,
	style,
}: {
	active: boolean;
	label: string;
	onToggle: (inlineStyle: DraftInlineStyleType | DraftBlockType) => void;
	style: DraftInlineStyleType | DraftBlockType;
}) {
	return (
		<span
			className={cn('mr-4 inline-block cursor-pointer px-[2px] text-[#999]', { 'text-[#5890ff]': active })}
			onMouseDown={(e) => {
				e.preventDefault();
				onToggle(style);
			}}
		>
			{label}
		</span>
	);
}
