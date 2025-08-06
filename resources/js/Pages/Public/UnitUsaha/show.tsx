import { ChevronLeft, ChevronRight, Phone } from 'lucide-react';
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
					<img src={`/storage/${imgUrl}`} alt={name} className='h-full w-full object-cover' />
				</div>

				<div className='space-y-3 p-3'>
					<p className='text-lg font-semibold'>{name}</p>
					<p>{IDRFormat(price)}</p>
				</div>
			</div>
		</div>
	);
};

export default function UnitUsahaShowPage({
	imgUrl,
	name,
	desc,
	contact,
	products,
}: {
	imgUrl: string;
	name: string;
	desc: string;
	contact: string;
	products: UnitUsahaProduk[];
}) {
	return (
		<div className='space-y-8'>
			<div className='flex flex-col items-center gap-8 md:flex-row md:items-start'>
				<div className='border-bumdes-dark-blue aspect-square h-full max-h-[20rem] w-full max-w-[20rem] flex-none basis-1/2 overflow-hidden rounded-2xl border-6'>
					<img src={`/storage/${imgUrl}`} alt={name} className='h-full w-full object-cover' />
				</div>

				<div className='space-y-8 text-center md:text-start'>
					<h6 className='text-2xl leading-normal capitalize md:text-4xl lg:text-5xl'>{name}</h6>
					<p>{desc}</p>
					<div className='inline-flex items-center justify-center gap-2'>
						<Phone className='text-bumdes-dark-blue h-5 w-5' />
						<p>{contact}</p>
					</div>
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
						className='w-full'
					>
						{products.map((p, i) => (
							<SwiperSlide key={i}>
								<ProductCard name={p.nama} price={p.harga} imgUrl={p.gambar} />
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
