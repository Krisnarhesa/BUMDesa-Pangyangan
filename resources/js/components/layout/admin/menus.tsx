import { Camera, Grid2X2, Handshake, LayoutDashboard, Sliders, UserPen, Users } from 'lucide-react';
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
		domain: 'dashboard',
	},
	{
		href: route('admin.profil.index'),
		title: 'Profil',
		icon: <UserPen size={17} />,
		type: 'link',
		domain: 'profil',
	},
	{
		href: route('admin.carousels.index'),
		title: 'Carousel',
		icon: <Sliders size={17} />,
		type: 'link',
		domain: 'carousels',
	},
	{
		href: route('admin.struktur.index'),
		title: 'Struktur Organisasi',
		icon: <Users size={17} />,
		type: 'link',
		domain: 'struktur-organisasi',
	},
	{
		href: route('admin.unit.index'),
		title: 'Unit Usaha',
		icon: <Handshake size={17} />,
		type: 'link',
		domain: 'unit-usaha',
	},
	{
		href: '/admin/publikasi',
		title: 'Publikasi',
		icon: <Camera size={17} />,
		type: 'dropdown',
		domain: 'publikasi',
		child: [
			{
				title: 'Album',
				href: route('admin.album.index'),
			},
			{
				title: 'Foto & Video',
				href: route('admin.galeri.index'),
			},
			{
				title: 'Berita',
				href: route('admin.berita.index'),
			},
		],
	},
];
