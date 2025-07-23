import { Banknote, ChartColumnBig, FileClock, Grid2X2, LayoutDashboard, NotepadText } from 'lucide-react';

type LinkItemProps = {
	title: string;
	icon?: React.ReactNode;
} & (Dropdown | Link);

type Dropdown = {
	domain: string;
	type: 'dropdown';
	child: {
		title: string;
		icon?: React.ReactNode;
		href: string;
		feature: string;
	}[];
	href: string;
};

type Link = {
	type: 'link';
	href: string;
	domain: string;
};

export const menus: Array<LinkItemProps> = [
	{
		href: '/dashboard',
		title: 'Dashboard',
		icon: <LayoutDashboard size={17} />,
		type: 'link',
		domain: 'Dashboard',
	},
	{
		href: '/dashboard/office',
		title: 'Back Office',
		icon: <Grid2X2 size={17} />,
		type: 'dropdown',
		domain: 'Back Office',
		child: [
			{ title: 'User', href: '/dashboard/office/users', feature: 'User' },
			{ title: 'SPBG', href: '/dashboard/office/spbgs', feature: 'SPBG' },
			{ title: 'Company', href: '/dashboard/office/companies', feature: 'Company' },
			{ title: 'Vehicle', href: '/dashboard/office/vehicles', feature: 'Vehicle' },
			{ title: 'Signatory', href: '/dashboard/office/signs', feature: 'Signatory' },
			{ title: 'GHV', href: '/dashboard/office/ghv', feature: 'GHV' },
		],
	},
	{
		href: '/dashboard/deposits',
		title: 'Deposit',
		icon: <Banknote size={17} />,
		type: 'link',
		domain: 'Deposit',
	},
	{
		href: '/dashboard/reports',
		title: 'Report',
		icon: <NotepadText size={17} />,
		type: 'dropdown',
		domain: 'Report',
		child: [
			{
				title: 'Customer Company',
				href: '/dashboard/reports/customer-company',
				feature: 'Customer Company',
			},
			{ title: 'General', href: '/dashboard/reports/general', feature: 'General' },
			{ title: 'Volume', href: '/dashboard/reports/volume', feature: 'Volume' },
		],
	},
	{
		href: '/dashboard/orders',
		title: 'Order',
		icon: <ChartColumnBig size={17} />,
		type: 'link',
		domain: 'Order',
	},
	{
		href: '/dashboard/activity-logs',
		title: 'Activity Log',
		icon: <FileClock size={17} />,
		type: 'link',
		domain: 'Activity Log',
	},
];
