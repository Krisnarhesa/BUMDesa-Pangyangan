import * as React from 'react';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import { Link } from '@inertiajs/react';

export const HoverLink = HoverCardPrimitive.Root;

export const Trigger = React.forwardRef<
	React.ElementRef<typeof HoverCardPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Trigger> & { href: string }
>(({ children, href, ...props }, forwardedRef) => (
	<HoverCardPrimitive.Trigger {...props} ref={forwardedRef}>
		<Link href={href}>{children}</Link>
	</HoverCardPrimitive.Trigger>
));
Trigger.displayName = 'Trigger';

export const Content = React.forwardRef<
	React.ElementRef<typeof HoverCardPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ children, ...props }, forwardedRef) => (
	<HoverCardPrimitive.Portal>
		<HoverCardPrimitive.Content {...props} className='w-[16rem] rounded-xl bg-white p-4 shadow-xl'>
			{children}
		</HoverCardPrimitive.Content>
	</HoverCardPrimitive.Portal>
));
Content.displayName = 'Content';
