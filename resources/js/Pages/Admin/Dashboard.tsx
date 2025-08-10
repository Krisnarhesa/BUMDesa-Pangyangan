import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { withAuth } from '@/lib/auth';
import { GalleryHorizontal, Handshake, Newspaper } from 'lucide-react';

function Dashboard({
	unitUsahaCount,
	galeriCount,
	beritaCount,
}: {
	unitUsahaCount: number;
	galeriCount: number;
	beritaCount: number;
}) {
	return (
		<section className='min-h-screen w-full px-4 sm:px-6 md:px-8 lg:pl-72'>
			<h1 className='mt-10 text-3xl font-bold'>Dashboard</h1>

			<div className='mt-10'>
				<div className='grid gap-5 xl:grid-cols-3'>
					<Card className='flex items-center justify-between'>
						<CardHeader>
							<CardTitle className='font-bold'>Total unit usaha</CardTitle>
							<CardTitle>{unitUsahaCount}</CardTitle>
						</CardHeader>
						<div className='mr-7 hidden rounded-full p-5 shadow-lg lg:block'>
							<Handshake className='text-bumdes-primary h-[40px] w-[40px]' />
						</div>
					</Card>
					<Card className='flex items-center justify-between'>
						<CardHeader>
							<CardTitle className='font-bold'>Total galeri</CardTitle>
							<CardTitle>{galeriCount}</CardTitle>
						</CardHeader>
						<div className='mr-7 hidden rounded-full p-5 shadow-lg lg:block'>
							<GalleryHorizontal className='text-bumdes-primary h-[40px] w-[40px]' />
						</div>
					</Card>
					<Card className='flex items-center justify-between'>
						<CardHeader>
							<CardTitle className='font-bold'>Total berita</CardTitle>
							<CardTitle>{beritaCount}</CardTitle>
						</CardHeader>
						<div className='mr-7 hidden rounded-full p-5 shadow-lg lg:block'>
							<Newspaper className='text-bumdes-primary h-[40px] w-[40px]' />
						</div>
					</Card>
				</div>
			</div>
		</section>
	);
}

export default withAuth(Dashboard);
