import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Grid, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { route } from 'ziggy-js';
import * as _ from 'lodash';

import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/navigation';

const NewsCard = ({ title, desc, cover }: { title: string; desc: string; cover: string }) => {
	return (
		<div className='flex cursor-pointer flex-row shadow transition-all ease-out hover:scale-105 md:h-[20rem] md:flex-col md:shadow-lg'>
			<div className='aspect-square h-full flex-none overflow-hidden md:h-40'>
				<img src={`/storage/${cover}`} alt='' className='h-full w-full object-cover object-center' />
			</div>
			<div className='p-2 md:p-4'>
				<h6 className='line-clamp-1 font-semibold capitalize md:line-clamp-2 md:text-lg lg:text-xl'>{title}</h6>
				<div>
					<p className='line-clamp-2 md:line-clamp-3'>{desc}</p>
				</div>
			</div>
		</div>
	);
};

export default function BeritaPage({ berita }: { berita: News[] }) {
	return (
		<div>
			{berita && berita.length > 0 ? (
				<>
					{/* >>> Desktop slider >>>  */}
					<div className='hidden md:block'>
						<Swiper
							modules={[Navigation, Grid]}
							grid={{
								rows: 2,
								fill: 'row',
							}}
							navigation={{
								prevEl: '.prevButton',
								nextEl: '.nextButton',
							}}
							slidesPerView={3}
							spaceBetween={32}
							breakpoints={{
								'1024': {
									slidesPerView: 3,
								},
							}}
							onSlideChange={(swiper) => console.log('slide change')}
							onSwiper={(swiper) => console.log(swiper)}
							className='w-full py-8'
						>
							{berita.map((b, i) => (
								<SwiperSlide key={i}>
									<Link href={route('publikasi.berita.show', { id: b.id, slug: _.kebabCase(b.judul) })}>
										<NewsCard title={b.judul} desc={b.konten} cover={b.gambar_cover} />
									</Link>
								</SwiperSlide>
							))}
						</Swiper>

						<div className='mt-4 flex h-16 items-center justify-end gap-2'>
							<button className='prevButton bg-bumdes-primary/50 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full'>
								<ChevronLeft className='h-10 w-10' />
							</button>
							<button className='nextButton bg-bumdes-primary/50 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full'>
								<ChevronRight className='h-10 w-10' />
							</button>
						</div>
					</div>
					{/* <<< Desktop slider <<<  */}

					{/* >>> Mobile >>> */}
					<div className='space-y-4 md:hidden'>
						{berita.map((b, i) => (
							<NewsCard key={i} title={b.judul} desc={b.konten} cover={b.gambar_cover} />
						))}
					</div>
					{/* <<< Mobile <<< */}
				</>
			) : (
				'Kosong'
			)}
		</div>
	);
}
