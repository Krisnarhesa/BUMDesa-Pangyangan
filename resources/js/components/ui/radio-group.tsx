import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Circle } from 'lucide-react';

import { cn } from '@/lib/utils';

const RadioGroup = React.forwardRef<
	React.ElementRef<typeof RadioGroupPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
	return <RadioGroupPrimitive.Root className={cn('flex flex-col gap-4', className)} {...props} ref={ref} />;
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
	React.ElementRef<typeof RadioGroupPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, children, ...props }, ref) => {
	return (
		<div className='flex items-center'>
			<RadioGroupPrimitive.Item
				ref={ref}
				className={cn(
					'aspect-square h-5 w-5 rounded-full border border-pertamina-blue text-pertamina-blue hover:bg-pertamina-blue  disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:text-slate-50',
					className
				)}
				{...props}
			>
				<RadioGroupPrimitive.Indicator
					className='w-full h-full flex justify-center items-center relative'
					id={props.id}
				>
					<Circle className='h-2.5 w-2.5 fill-current text-current' />
				</RadioGroupPrimitive.Indicator>
			</RadioGroupPrimitive.Item>
			<label className='pl-4' htmlFor={props.id}>
				{children}
			</label>
		</div>
	);
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
