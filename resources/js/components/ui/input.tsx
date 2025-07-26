import * as React from 'react';

import { cn } from '../../lib/utils';
import { LucideProps } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	Icon?: React.FC<LucideProps>;
	iconposition?: 'start' | 'end';
	startLabel?: string;
	endLabel?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, Icon, iconposition, startLabel, endLabel, ...props }, ref) => {
		return (
			<div className='w-full relative'>
				{Icon && (
					<Icon
						className={cn(
							'absolute top-1/2 -translate-y-1/2 w-4 h-4',
							{ 'right-2': iconposition === 'end' },
							{ 'left-2': iconposition === 'start' }
						)}
					/>
				)}
				{startLabel && <span className={cn('text-sm absolute left-2 top-1/2 -translate-y-1/2')}>{startLabel}</span>}
				{endLabel && <span className={cn('text-sm absolute right-2 pl-2 top-1/2 -translate-y-1/2')}>{endLabel}</span>}
				<input
					type={type}
					className={cn(
						'flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300',
						className,
						{ 'pl-10': startLabel || iconposition === 'start' },
						{ 'pr-10': endLabel || iconposition === 'end' }
					)}
					ref={ref}
					{...props}
				/>
			</div>
		);
	}
);
Input.displayName = 'Input';

export { Input };
