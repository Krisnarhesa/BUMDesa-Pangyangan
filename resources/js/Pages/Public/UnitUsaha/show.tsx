import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IDRFormat } from '@/lib/utils';

import 'swiper/css';
import 'swiper/css/navigation';

const ProductCard = ({ name, price, imgUrl }: { name: string; price: number; imgUrl: string }) => {
	return (
		<div className='relative w-full overflow-hidden rounded-xl shadow-lg'>
			<div className='flex h-24 flex-row'>
				<div className='aspect-square h-full overflow-hidden'>
					<img src={imgUrl} alt={name} className='h-full w-full object-cover' />
				</div>

				<div className='space-y-3 p-3'>
					<p className='text-lg font-semibold'>{name}</p>
					<p>{IDRFormat(price)}</p>
				</div>
			</div>
		</div>
	);
};

export default function show({
	imgUrl,
	title,
	desc,
	products,
}: {
	imgUrl: string;
	title: string;
	desc: string;
	products: UnitUsahaProduct[];
}) {
	return (
		<div className='space-y-8'>
			<div className='flex flex-col items-center gap-8 md:flex-row md:items-start'>
				<div className='border-bumdes-dark-blue aspect-square h-full max-h-[20rem] w-full max-w-[20rem] flex-none basis-1/2 overflow-hidden rounded-2xl border-6'>
					<img src={imgUrl} alt='' className='h-full w-full object-cover' />
				</div>

				<div className='space-y-8 text-center md:text-start'>
					<h6 className='text-2xl leading-normal capitalize md:text-4xl lg:text-5xl'>{title}</h6>
					<p>{desc}</p>
				</div>
			</div>

			{/* >>> Unit usaha product slider >>> */}
			{products && products.length > 0 && (
				<div>
					<Swiper
						modules={[Navigation]}
						navigation={{
							prevEl: '.prevButton',
							nextEl: '.nextButton',
						}}
						spaceBetween={50}
						slidesPerView={3}
						onSlideChange={(swiper) => console.log('slide change')}
						onSwiper={(swiper) => console.log(swiper)}
						className='relative w-full'
					>
						{products.map((p, i) => (
							<SwiperSlide key={i}>
								<ProductCard name={p.nama} price={p.harga} imgUrl={p.imgUrl} />
							</SwiperSlide>
						))}
					</Swiper>

					<div className='mt-4 flex h-16 items-center justify-end gap-2'>
						<button className='prevButton bg-bumdes-primary flex h-16 w-16 cursor-pointer items-center justify-center rounded-full'>
							<ChevronLeft className='h-10 w-10' />
						</button>
						<button className='nextButton bg-bumdes-primary flex h-16 w-16 cursor-pointer items-center justify-center rounded-full'>
							<ChevronRight className='h-10 w-10' />
						</button>
					</div>
				</div>
			)}
			{/* <<< Unit usaha product slider <<< */}
		</div>
	);
}
