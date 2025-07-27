import { Banknote, ChartColumnBig, FileClock, Grid2X2, LayoutDashboard, NotepadText } from 'lucide-react';
import { route } from 'ziggy-js';

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
		href: '/struktur-organisasi/bagan',
		title: 'Struktur Organisasi',
		icon: <LayoutDashboard size={17} />,
		type: 'link',
		domain: 'Public',
	},
	{
		href: '/unit-usaha',
		title: 'Unit Usaha',
		icon: <Grid2X2 size={17} />,
		type: 'link',
		domain: 'Public',
	},
];
