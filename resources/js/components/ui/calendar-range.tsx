import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';

import { cn } from '../../lib/utils';
import { buttonVariants } from './button';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function CalendarRange({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
	return (
		<DayPicker
			showOutsideDays={showOutsideDays}
			className={cn('p-3', className)}
			classNames={{
				months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
				month: 'space-y-4 text-center',
				caption_label: 'text-sm font-medium',
				nav: 'space-x-1 flex justify-start',
				button_previous: cn(
					buttonVariants({ variant: 'outline' }),
					'absolute left-2 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
				),
				button_next: cn(
					buttonVariants({ variant: 'outline' }),
					'absolute right-2 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
				),
				day: cn(buttonVariants({ variant: 'ghost' }), 'h-9 w-9 p-0 font-normal aria-selected:opacity-100'),
				selected:
					'bg-slate-900 text-slate-50 hover:bg-slate-900 hover:text-slate-50 focus:bg-slate-900 focus:text-slate-50 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50 dark:hover:text-slate-900 dark:focus:bg-slate-50 dark:focus:text-slate-900',
				today: 'bg-slate-100 text-slate-900 aria-selected:text-slate-50 dark:bg-slate-800 dark:text-slate-50',
				outside: 'text-slate-500 opacity-50 dark:text-slate-400',
				disabled: 'text-slate-500 opacity-50 dark:text-slate-400',
				range_middle:
					'aria-selected:bg-slate-100 aria-selected:text-slate-900 dark:aria-selected:bg-slate-800 dark:aria-selected:text-slate-50',
				hidden: 'invisible',
				...classNames,
			}}
			components={{
				NextMonthButton(props) {
					return (
						<button {...props}>
							<ChevronRight className='h-4 w-4' />
						</button>
					);
				},
				PreviousMonthButton(props) {
					return (
						<button {...props}>
							<ChevronLeft className='h-4 w-4' />
						</button>
					);
				},
				MonthGrid(props) {
					return <table className='w-full border-collapse space-y-1' {...props} />;
				},
				MonthCaption(props) {
					const { calendarMonth, displayIndex, ...divProps } = props;
					return <div className='flex justify-center pt-1 relative items-center' {...divProps} />;
				},
				Weekdays(props) {
					return (
						<thead aria-hidden className='flex'>
							<tr {...props} />
						</thead>
					);
				},
				Weekday(props) {
					return (
						<th {...props} className='text-slate-500 rounded-md w-9 font-normal text-[0.8rem] dark:text-slate-400' />
					);
				},
				Week(props) {
					const { week, ...trProps } = props;
					return <tr className='flex w-full mt-2' {...trProps} />;
				},
				Day(props) {
					const { day, modifiers, ...tdProps } = props;
					return (
						<td
							className='text-center text-sm p-0 relative [&:has([aria-selected])]:bg-slate-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 dark:[&:has([aria-selected])]:bg-slate-800'
							{...tdProps}
						/>
					);
				},
			}}
			{...props}
		/>
	);
}
CalendarRange.displayName = 'Calendar';

export { CalendarRange };
