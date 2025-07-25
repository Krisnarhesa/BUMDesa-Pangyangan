import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Scrollbar } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/scrollbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
	return (
		<div>
			{/* >>> Carousel >>> */}
			<Swiper
				modules={[Autoplay, Scrollbar]}
				spaceBetween={50}
				slidesPerView={1}
				autoplay={{
					pauseOnMouseEnter: true,
				}}
				scrollbar={{
					draggable: true,
				}}
				onSlideChange={() => console.log('slide change')}
				onSwiper={(swiper) => {
					console.log(swiper);
				}}
				className='h-[400px] lg:h-[calc(100dvh-200px)]'
			>
				{Array.from({ length: 4 }).map((v, i) => (
					<SwiperSlide key={i} className='w-full h-full bg-amber-50'>
						<img
							src='/assets/test.jpg'
							alt='tes 1'
							className='w-full h-full object-cover object-center lg:h-auto mx-auto'
						/>
					</SwiperSlide>
				))}
			</Swiper>
			{/* <<< Carousel <<< */}

			{/* >>> Visi misi >>> */}
			<div className='w-full max-w-6xl mx-auto px-4 py-16 flex flex-col justify-center items-center gap-8 md:py-0 md:h-[calc(100dvh-300px)] lg:h-[calc(100dvh-200px)]'>
				<h5 className='text-2xl font-bold'>Visi dan Misi</h5>
				<div className='flex flex-col justify-center items-center gap-8 md:flex-row'>
					<img src='/assets/visi-misi.png' alt='' className='w-[300px] h-auto' />
					<div className='space-y-4 text-center md:text-start'>
						<div>
							<h6 className='font-semibold'>Visi</h6>
							<p>Menggali potensi Desa Pangyangan untuk mensejahterakan masyarakat Desa.</p>
						</div>
						<div>
							<h6 className='font-semibold'>Misi</h6>
							<ul>
								<li className='list-disc'>
									Menjadikan BUMDesa Dwi Buana Amertha Desa Pangyangan sebagai Barometer perkembangan BUMDesa lainnya.
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			{/* <<< Visi misi <<< */}

			{/* >>> Era baru >>> */}
			<div className='w-full bg-[#1e2754] rounded-t-[100px]'>
				<div className='w-full max-w-6xl mx-auto px-4 py-16 flex flex-col justify-center items-center gap-8 md:min-h-[calc(100dvh-300px)] lg:min-h-[calc(100dvh-200px)]'>
					<h5 className='text-2xl text-center text-primary-white md:text-start font-bold'>
						Era Baru BUMDes Dwi Buana Amertha
					</h5>
					<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-8 lg:auto-cols-auto'>
						{['Struktur Organisasi', 'Unit Usaha', 'Program Kerja', 'Publikasi'].map((e, i) => (
							<Card
								key={i}
								className='bg-primary-white rounded-2xl border-none transition-all ease-out duration-300 delay-100 hover:scale-105'
							>
								<CardHeader className='p-4'>
									<img src='/assets/test.jpg' alt='' className='' />
								</CardHeader>
								<CardContent>
									<CardTitle>{e}</CardTitle>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</div>
			{/* <<< Era baru <<< */}
		</div>
	);
}
