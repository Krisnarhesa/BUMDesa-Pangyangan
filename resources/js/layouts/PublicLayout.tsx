import Footer from '@/components/layout/public/Footer';
import Navbar from '@/components/layout/public/Navbar';
import * as React from 'react';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
	return (
		<main className='min-h-dvh'>
			<Navbar />
			<article className='min-h-dvh lg:mt-18'>{children}</article>
			<Footer />
		</main>
	);
}
