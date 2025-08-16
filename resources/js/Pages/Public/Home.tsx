import { Autoplay, Navigation, Scrollbar } from 'swiper/modules';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ChevronLeft, ChevronRight, SquareArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getCarousels } from '@/lib/data/carousels';
import { Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import { convertFromRaw, EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import * as _ from 'lodash';
import { emptyContent } from '@/lib/draft-js/styles';
import MyEditor from '@/components/editor/Editor';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/grid';
import { useWindowSize } from 'react-use';

const UnitUsahaCard = ({ title, icon }: { title: string; icon?: React.ReactNode }) => {
	return (
		<div className='relative'>
			<div
				className='absolute top-0 left-1/2 z-20 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white'
				dangerouslySetInnerHTML={{ __html: String(icon) }}
			></div>
			<Card className='relative z-10 w-full rounded-2xl border-none bg-[#0D0D81] pt-20 pb-4'>
				<CardContent className='text-primary-white'>
					<CardTitle className='text-center leading-10'>
						Unit Usaha <br />
						{title}
					</CardTitle>
				</CardContent>
			</Card>
		</div>
	);
};

const usaha = [
	{
		id: 1,
		name: 'Simpan Pinjam',
		icon: (
			<svg xmlns='http://www.w3.org/2000/svg' height='48px' viewBox='0 -960 960 960' width='48px' fill='#00006e'>
				<path d='M212-241v-339h60v339h-60Zm242 0v-339h60v339h-60ZM80-640v-53l400-228 400 228v53H80Zm134-60h532L480-852 214-700ZM80-121v-60h500q2 14 3.5 28.5T591-121H80Zm608-291v-168h60v138l-60 30ZM800 0q-69-17-114.5-79.5T640-218v-102l160-80 160 80v102q0 76-45.5 138.5T800 0Zm-21-120 142-142-28-28-114 114-59-59-28 28 87 87ZM214-700h532-532Z' />
			</svg>
		),
	},
	{
		id: 2,
		name: 'Perdagangan',
		icon: (
			<svg xmlns='http://www.w3.org/2000/svg' height='48px' viewBox='0 -960 960 960' width='48px' fill='#00006e'>
				<path d='M480-629 354-755l126-126 126 126-126 126ZM40-160v-160q0-29 20.5-49.5T110-390h141q17 0 32.5 8.5T310-358q29 42 74 65t96 23q51 0 96-23t75-65q11-15 26-23.5t32-8.5h141q29 0 49.5 20.5T920-320v160H660v-119q-36 33-82.5 51T480-210q-51 0-97-18t-83-51v119H40Zm120-300q-45 0-77.5-32.5T50-570q0-46 32.5-78t77.5-32q46 0 78 32t32 78q0 45-32 77.5T160-460Zm640 0q-45 0-77.5-32.5T690-570q0-46 32.5-78t77.5-32q46 0 78 32t32 78q0 45-32 77.5T800-460Z' />
			</svg>
		),
	},
	{
		id: 3,
		name: 'Jasa',
		icon: (
			<svg xmlns='http://www.w3.org/2000/svg' height='48px' viewBox='0 -960 960 960' width='48px' fill='#00006e'>
				<path d='M303-729v-51q0-24 18-42t42-18h232q24 0 42 18t18 42v51h64q18 0 33.5 9.5T774-695l98 232q4 8 6 19.33 2 11.34 2 22.67v201q0 24-18 42t-42 18H140q-24 0-42-18t-18-42v-201q0-11.33 2-22.67Q84-455 88-463l96-232q6-15 21.5-24.5T239-729h64Zm60 0h232v-51H363v51Zm-79 260v-46h60v46h272v-46h60v46h127l-83-200H240l-83 200h127Zm0 60H140v189h680v-189H676v46h-60v-46H344v46h-60v-46Zm196-30Zm0-30Zm0 60Z' />
			</svg>
		),
	},
	{
		id: 4,
		name: 'Pengolahan Sampah',
		icon: (
			<svg xmlns='http://www.w3.org/2000/svg' height='48px' viewBox='0 -960 960 960' width='48px' fill='#00006e'>
				<path d='m368-592 89-147-59-98q-12-20-34.5-20T329-837l-98 163 137 82Zm387 272-89-148 139-80 64 107q11 17 12 38t-9 39q-10 20-29.5 32T800-320h-45ZM640-40 480-200l160-160v80h190l-58 116q-11 20-30 32t-42 12h-60v80Zm-387-80q-20 0-36.5-10.5T192-158q-8-16-7.5-33.5T194-224l34-56h172v160H253Zm-99-114L89-364q-9-18-8.5-38.5T92-441l16-27-68-41 219-55 55 220-69-42-91 152Zm540-342-219-55 69-41-125-208h141q21 0 39.5 10.5T629-841l52 87 68-42-55 220Z' />
			</svg>
		),
	},
	{
		id: 5,
		name: 'Ketahanan Pangan',
		icon: (
			<svg xmlns='http://www.w3.org/2000/svg' height='48px' viewBox='0 -960 960 960' width='48px' fill='#00006e'>
				<path d='M646-80q-100 0-167-67t-67-167q0-100 67-167t167-67q100 0 167 67t67 167q0 100-67 167T646-80Zm0-60q72 0 123-51t51-123q0-72-51-123t-123-51q-72 0-123 51t-51 123q0 72 51 123t123 51Zm-506-20q-24 0-42-18t-18-42v-330q0-13 1.5-21t6.5-19l92-200h-22q-15 0-24.5-9.5T124-824v-22q0-15 9.5-24.5T158-880h261q15 0 24.5 9.5T453-846v22q0 15-9.5 24.5T419-790h-22l96 222q-12 6-25 15t-24 18L329-790h-82L140-559v339h224q3 15 10 31t15 29H140Zm506-438q-36 0-60-24t-24-60q0-36 24-60t60-24v168q0-36 24-60t60-24q36 0 60 24t24 60H646Z' />
			</svg>
		),
	},
	{
		id: 6,
		name: 'Pariwisata',
		icon: (
			<svg xmlns='http://www.w3.org/2000/svg' height='48px' viewBox='0 -960 960 960' width='48px' fill='#00006e'>
				<path d='m393-119-95-179-180-96 59-59 148 27 122-121-327-139 72-72 396 69 133-133q21-21 50.5-21t50.5 21q21 21 21 50.5T822-721L689-588l69 396-72 72-139-327-121 122 26 147-59 59Z' />
			</svg>
		),
	},
];

export default function Home({
	berita,
	galeri,
	misi,
	visi,
	unit,
}: {
	berita: News[];
	galeri: AlbumItem[];
	misi: string;
	visi: string;
	unit: UnitUsaha[];
}) {
	const { data } = useQuery({
		queryKey: ['carousels'],
		queryFn: () => getCarousels(),
		throwOnError: true,
	});

	const { width } = useWindowSize();

	const misiContentState = misi ? convertFromRaw(JSON.parse(misi)) : convertFromRaw(emptyContent);
	const misiEditorState = EditorState.createWithContent(misiContentState);

	const visiContentState = visi ? convertFromRaw(JSON.parse(visi)) : convertFromRaw(emptyContent);
	const visiEditorState = EditorState.createWithContent(visiContentState);

	return (
		<div>
			{/* >>> Carousel >>> */}
			<Swiper
				modules={[Autoplay, Scrollbar]}
				slidesPerView={1}
				autoplay={{
					pauseOnMouseEnter: true,
				}}
				scrollbar={{
					draggable: true,
				}}
				className='h-[550px] w-full lg:h-[calc(100dvh-150px)]'
			>
				{data?.data.map((v, i) => (
					<SwiperSlide key={i}>
						<div className='flex h-full items-center justify-center'>
							<img
								src={`/storage/${v.image}`}
								alt={`Carousel ${i}`}
								className='h-full w-full object-cover object-center'
							/>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
			{/* <<< Carousel <<< */}

			{/* >>> Visi misi >>> */}
			<div className='mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-8 px-4 py-16 md:h-[calc(100dvh-300px)] md:py-0 lg:h-[calc(100dvh-200px)]'>
				<h5 className='text-2xl font-bold md:text-4xl lg:text-5xl'>Visi dan Misi</h5>
				<div className='flex flex-col items-center justify-center gap-8 md:flex-row'>
					<img src='/assets/visi-misi.png' alt='' className='h-auto w-[300px]' />
					<div className='space-y-4 text-center md:text-start'>
						<div>
							<h6 className='font-semibold'>Visi</h6>
							<MyEditor
								editorState={visiEditorState}
								onChange={() => {}}
								readOnly
								textAlignment={width >= 1024 ? 'left' : 'center'}
							/>
						</div>
						<div>
							<h6 className='font-semibold'>Misi</h6>
							<MyEditor
								editorState={misiEditorState}
								onChange={() => {}}
								readOnly
								textAlignment={width >= 1024 ? 'left' : 'center'}
							/>
						</div>
					</div>
				</div>
			</div>
			{/* <<< Visi misi <<< */}

			{/* >>> Unit usaha >>> */}
			<div className='w-full rounded-t-[100px] bg-[#1A94A9]'>
				<div className='mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-8 px-4 py-16 md:min-h-[calc(100dvh-300px)] lg:min-h-[calc(100dvh-200px)]'>
					<h5 className='text-primary-white mx-4 text-center text-2xl leading-normal font-bold md:text-4xl lg:text-5xl'>
						Unit Usaha BUMDes Dwi Buana Amertha untuk Masyarakat Pangyangan
					</h5>

					<Swiper
						modules={[Navigation, Autoplay]}
						navigation={{
							prevEl: '.prevButton',
							nextEl: '.nextButton',
						}}
						autoplay
						loop={true}
						spaceBetween={50}
						slidesPerView={1}
						breakpoints={{
							768: {
								slidesPerView: 3,
							},
						}}
						className='relative w-full'
					>
						{unit.map((u, i) => (
							<SwiperSlide key={i} className='pt-16'>
								<UnitUsahaCard title={u.nama} icon={u.icon} />
							</SwiperSlide>
						))}

						<button className='prevButton bg-bumdes-primary/50 absolute top-1/2 left-0 z-20 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full'>
							<ChevronLeft className='h-10 w-10' />
						</button>
						<button className='nextButton bg-bumdes-primary/50 absolute top-1/2 right-0 z-20 flex h-16 w-16 cursor-pointer items-center justify-center rounded-full'>
							<ChevronRight className='h-10 w-10' />
						</button>
					</Swiper>
				</div>
			</div>
			{/* <<< Unit usaha <<< */}

			{/* >>> Galeri dan Berita >>> */}
			<div className='from-bg-[#1A94A9] relative flex h-full items-center justify-center bg-gradient-to-b from-[#1A94A9] from-50% to-white to-50% lg:py-16'>
				<div className='flex h-full w-full max-w-5xl flex-col items-stretch gap-3 rounded-lg bg-white px-4 py-16 md:flex-row lg:p-6'>
					{/* >>> Berita >>> */}
					<div className='basis-1/2 space-y-4'>
						<h5 className='text-lg leading-normal font-bold md:text-xl lg:text-3xl'>Berita</h5>
						<div className='space-y-3'>
							{berita.map((b, i) => {
								const contentState = convertFromRaw(JSON.parse(b.konten));

								return (
									<Link key={i} href={route('publikasi.berita.show', { id: b.id, slug: _.kebabCase(b.judul) })}>
										<div className='mt-3 flex cursor-pointer flex-row gap-3 overflow-hidden rounded-lg'>
											<img src={`/storage/${b.gambar_cover}`} alt={b.judul} className='aspect-square w-24 rounded-lg' />
											<div>
												<h6 className='line-clamp-1 text-lg font-bold'>{b.judul}</h6>
												<div
													className='line-clamp-2'
													dangerouslySetInnerHTML={{ __html: stateToHTML(contentState) }}
												></div>
											</div>
										</div>
									</Link>
								);
							})}
							<div className='text-right'>
								<Link href={route('publikasi.berita.index')} className='inline-flex items-center gap-1 text-sm'>
									Lihat selengkapnya <SquareArrowRight className='h-4 w-4' />
								</Link>
							</div>
						</div>
					</div>
					{/* <<< Berita <<< */}

					<div className='bg-primary-black w-[1px] rounded-full' />
					{/* >>> Galeri >>> */}
					<div className='min-w-0 basis-1/2 space-y-4'>
						<h5 className='text-lg leading-normal font-bold md:text-xl lg:text-3xl'>Galeri</h5>
						<div className='space-y-3'>
							<Swiper
								modules={[Navigation, Autoplay]}
								navigation={{
									prevEl: '.galeriPrevButton',
									nextEl: '.galeriNextButton',
								}}
								loop={true}
								autoplay
								slidesPerView={2}
								spaceBetween={16}
								onSlideChange={(swiper) => {}}
								onSwiper={(swiper) => {}}
								className='w-full'
							>
								{galeri.map((g, i) => (
									<SwiperSlide key={i}>
										<div className='h-min w-full overflow-hidden rounded-lg'>
											{g.jenis === 'foto' ? (
												<img src={`/storage/${g.foto}`} alt={g.judul} className='h-full w-full object-cover' />
											) : (
												<iframe
													src={g.link_youtube}
													className='aspect-video'
													title={g.judul}
													frameBorder='0'
													allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
													referrerPolicy='strict-origin-when-cross-origin'
													allowFullScreen
												></iframe>
											)}
										</div>
									</SwiperSlide>
								))}
							</Swiper>

							<div className='flex items-center justify-between'>
								<div className='flex items-center justify-end gap-2'>
									<button className='galeriPrevButton bg-bumdes-primary/50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full p-2'>
										<ChevronLeft className='h-full w-full' />
									</button>
									<button className='galeriNextButton bg-bumdes-primary/50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full p-2'>
										<ChevronRight className='h-full w-full' />
									</button>
								</div>
								<Link href={route('publikasi.galeri.index')} className='inline-flex items-center gap-1 text-sm'>
									Lihat selengkapnya <SquareArrowRight className='h-4 w-4' />
								</Link>
							</div>
						</div>
					</div>
					{/* <<< Galeri <<< */}
				</div>
			</div>
			{/* <<< Galeri dan Berita <<< */}
		</div>
	);
}
