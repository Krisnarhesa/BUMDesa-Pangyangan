'use client';

import { FC, ReactNode } from 'react';
import Header from '@/components/layout/admin/Header';
import SideBar from '@/components/layout/admin/SideBar';
import { Toaster } from '@/components/ui/toaster';
import Footer from '@/components/layout/admin/Footer';

interface MainLayoutProps {
	children: ReactNode;
	showHeader?: boolean;
}

const AdminLayout: FC<MainLayoutProps> = ({ children, showHeader = true }) => {
	return (
		<main className='min-h-dvh bg-gray-50'>
			{showHeader && <Header />}
			<SideBar />
			<div className='min-h-[calc(100dvh-71px-84px)]'>{children}</div>
			<Footer />
			<Toaster />
		</main>
	);
};

export default AdminLayout;
