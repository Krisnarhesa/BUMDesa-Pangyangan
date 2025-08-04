import { Camera, Grid2X2, Handshake, LayoutDashboard, Users } from 'lucide-react';
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
		href: route('admin.dashboard'),
		title: 'Dashboard',
		icon: <LayoutDashboard size={17} />,
		type: 'link',
		domain: 'Admin',
	},
	{
		href: route('admin.struktur_organisasi.index'),
		title: 'Struktur Organisasi',
		icon: <Users size={17} />,
		type: 'link',
		domain: 'Admin',
	},
	{
		href: route('admin.unit.index'),
		title: 'Unit Usaha',
		icon: <Handshake size={17} />,
		type: 'link',
		domain: 'Admin',
	},
	{
		href: '/publikasi',
		title: 'Publikasi',
		icon: <Camera size={17} />,
		type: 'dropdown',
		domain: 'Admin',
		child: [
			{
				title: 'Album',
				href: route('admin.album.index'),
			},
			{
				title: 'Galeri',
				href: route('admin.galeri.index'),
			},
			{
				title: 'Berita',
				href: route('admin.berita.index'),
			},
		],
	},
];
