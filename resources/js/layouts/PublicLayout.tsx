import Footer from '@/components/layout/public/Footer';
import Navbar from '@/components/layout/public/Navbar';
import { getProfile } from '@/lib/data/profil';
import { useQuery } from '@tanstack/react-query';
import * as React from 'react';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
	const { data } = useQuery({
		queryKey: ['profile'],
		queryFn: () => getProfile(),
	});

	return (
		<main className='min-h-dvh'>
			<Navbar logoUrl={data?.data.logo} />
			<article className='min-h-dvh lg:mt-18'>{children}</article>
			<Footer logoUrl={data?.data.logo} />
		</main>
	);
}
