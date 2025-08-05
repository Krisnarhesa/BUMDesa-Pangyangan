import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { route } from 'ziggy-js';

export default function BeritaDetailPage({ berita }: { berita: News }) {
	return (
		<div className='space-y-8 text-center md:text-start'>
			<Link href={route('publikasi.berita.index')} className='inline-flex gap-1'>
				<ArrowLeft />
				Kembali
			</Link>
			<h6 className='text-center text-2xl leading-normal capitalize md:text-4xl lg:text-5xl'>{berita.judul}</h6>
			<div className='mx-auto aspect-video h-[300px]'>
				<img
					src={`/storage/${berita.gambar_cover}`}
					alt={berita.judul}
					className='h-full w-full object-cover object-center'
				/>
			</div>
			<p>{berita.konten}</p>
		</div>
	);
}
