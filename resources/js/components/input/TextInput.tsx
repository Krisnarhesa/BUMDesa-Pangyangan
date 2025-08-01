'use client';

import { FC, InputHTMLAttributes } from 'react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { LucideProps } from 'lucide-react';

interface TextInputProps {
	label: string;
	en?: boolean;
	idProps?: InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>;
	enProps?: InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>;
	idError?: string;
	enError?: string;
	type?: 'input' | 'textarea';
	Icon?: React.FC<LucideProps>;
	iconposition?: 'start' | 'end';
	startLabel?: string;
	endLabel?: string;
}

const TextInput: FC<TextInputProps> = ({
	label,
	en = true,
	idProps,
	enProps,
	idError,
	enError,
	type = 'input',
	Icon,
	iconposition,
	startLabel,
	endLabel,
}) => {
	return (
		<div className="after:bg-pertamina-blue relative space-y-3 after:top-0 after:left-20 after:h-full after:w-1 after:rounded-lg after:content-[''] lg:px-28 lg:after:absolute">
			<label className='font-semibold'>{label}</label>
			<div className='grid w-full items-center gap-1.5'>
				{type === 'textarea' ? (
					<Textarea className='border-slate-300' {...idProps} />
				) : (
					<Input
						type='text'
						Icon={Icon}
						iconposition={iconposition}
						startLabel={startLabel}
						endLabel={endLabel}
						className='border-slate-300'
						{...idProps}
						onWheel={(e) => {
							if (e.target instanceof HTMLInputElement && idProps?.type === 'number') {
								e.target.blur();
							}
						}}
						onKeyDown={(e) => {
							if (idProps?.type === 'number') {
								if (['e', 'E', '+', '-'].includes(e.key)) {
									e.preventDefault();
								}
							}
						}}
					/>
				)}

				{idError && <span className='mt-2 text-xs text-red-500 italic'>{idError}</span>}
			</div>
			{en && (
				<div className='grid w-full items-center gap-1.5'>
					<span className='w-fit rounded bg-gray-200/80 px-3 py-1 text-sm text-gray-500'>en</span>
					{type === 'textarea' ? (
						<Textarea className='border-slate-300' {...enProps} />
					) : (
						<Input
							type='text'
							Icon={Icon}
							iconposition={iconposition}
							startLabel={startLabel}
							endLabel={endLabel}
							className='border-slate-300'
							{...enProps}
							onWheel={(e) => {
								if (e.target instanceof HTMLInputElement && enProps?.type === 'number') {
									e.target.blur();
								}
							}}
							onKeyDown={(e) => {
								if (enProps?.type === 'number') {
									if (['e', 'E', '+', '-'].includes(e.key)) {
										e.preventDefault();
									}
								}
							}}
						/>
					)}
					{enError && <span className='mt-2 text-xs text-red-500 italic'>{enError}</span>}
				</div>
			)}
		</div>
	);
};

export default TextInput;
