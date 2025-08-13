import { Grid2X2, LayoutDashboard } from 'lucide-react';
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
		domain: string;
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
		href: route('struktur.show', { jabatan: 'bagan' }),
		title: 'Struktur Organisasi',
		icon: <LayoutDashboard size={17} />,
		type: 'link',
		domain: 'struktur-organisasi',
	},
	{
		href: '/unit-usaha',
		title: 'Unit Usaha',
		icon: <Grid2X2 size={17} />,
		type: 'link',
		domain: 'unit-usaha',
	},
	{
		href: '/publikasi',
		title: 'Publikasi',
		icon: <Grid2X2 size={17} />,
		type: 'dropdown',
		domain: 'publikasi',
		child: [
			{
				title: 'Galeri',
				href: route('publikasi.galeri.index'),
				domain: 'galeri',
			},
			{
				title: 'Berita',
				href: route('publikasi.berita.index'),
				domain: 'berita',
			},
		],
	},
];
