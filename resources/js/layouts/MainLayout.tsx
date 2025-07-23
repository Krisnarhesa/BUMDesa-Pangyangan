'use client';

import { FC, ReactNode } from 'react';
import Header from '@/components/layout/Header';
import SideBar from '@/components/layout/SideBar';
import { Toaster } from '@/components/ui/toaster';
import Footer from '@/components/layout/Footer';

interface MainLayoutProps {
	children: ReactNode;
	showHeader?: boolean;
}

const MainLayout: FC<MainLayoutProps> = ({ children, showHeader = true }) => {
	return (
		<main className='bg-gray-50 min-h-dvh'>
			{showHeader && <Header />}
			<SideBar />
			<article className='min-h-[calc(100dvh-71px-84px)]'>{children}</article>
			<Footer />
			<Toaster />
		</main>
	);
};

export default MainLayout;
