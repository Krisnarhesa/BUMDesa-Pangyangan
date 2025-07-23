import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';

import { cn } from '../../lib/utils';
import { buttonVariants } from './button';
import { getDate } from 'date-fns';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
	return (
		<DayPicker
			showOutsideDays={showOutsideDays}
			className={cn('px-8 py-3', className)}
			classNames={{
				button_previous: cn(
					buttonVariants({ variant: 'outline' }),
					'absolute left-1 top-1/2 -translate-y-1/2 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
				),
				button_next: cn(
					buttonVariants({ variant: 'outline' }),
					'absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
				),
				month_caption: 'flex justify-center items-center',
				months_dropdown: 'border-none',
				years_dropdown: 'border-none',
				caption_label: 'hidden',
				table: 'w-full border-collapse space-y-1',
				head_row: 'flex',
				head_cell: 'text-slate-500 rounded-md w-9 font-normal text-[0.8rem] dark:text-slate-400',
				row: 'flex w-full mt-2',
				cell: 'text-center text-sm p-0 relative [&:has([aria-selected])]:bg-slate-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 dark:[&:has([aria-selected])]:bg-slate-800',
				day: 'w-9 h-9 text-center font-normal aria-selected:opacity-100',
				selected:
					'bg-slate-900 text-slate-50 hover:bg-slate-900 hover:text-slate-50 focus:bg-slate-900 focus:text-slate-50 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50 dark:hover:text-slate-900 dark:focus:bg-slate-50 dark:focus:text-slate-900',
				today: 'bg-slate-100 text-slate-900 aria-selected:text-slate-50 dark:bg-slate-800 dark:text-slate-50',
				outside: 'text-slate-500 opacity-50 dark:text-slate-400',
				disabled: 'text-slate-500 opacity-50 dark:text-slate-400',
				hidden: 'invisible',
				...classNames,
			}}
			components={{
				NextMonthButton(props) {
					return (
						<button
							className={cn(
								buttonVariants({ variant: 'outline' }),
								'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
							)}
							{...props}
						>
							<ChevronRight className='h-4 w-4' />
						</button>
					);
				},
				PreviousMonthButton(props) {
					return (
						<button
							className={cn(
								buttonVariants({ variant: 'outline' }),
								'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
							)}
							{...props}
						>
							<ChevronLeft className='h-4 w-4' />
						</button>
					);
				},
			}}
			captionLayout='dropdown'
			{...props}
		/>
	);
}
Calendar.displayName = 'Calendar';

export { Calendar };
