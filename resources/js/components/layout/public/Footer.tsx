import { Link } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function Footer({
	logoUrl,
	address,
	phone,
	email,
}: {
	logoUrl: string;
	address: string;
	phone: string;
	email: string;
}) {
	return (
		<div className='mx-auto mt-32 space-y-3 px-4'>
			<div className='justify-betwee flex flex-col gap-4 md:flex-row'>
				<div className='w-full'>
					<img src={`/storage/${logoUrl}`} alt='BUMDes logo' className='mx-auto aspect-square w-30 md:w-40 lg:ml-0' />
				</div>
				<div className='flex flex-col gap-4 lg:flex-row'>
					<div className='grid auto-cols-auto gap-2 text-center md:text-left'>
						<Link href={route('profil.index')}>Profil</Link>
						<Link href={route('struktur.show', { jabatan: 'bagan' })}>Struktur Organisasi</Link>
						<Link href={route('unit_usaha.index')}>Unit Usaha</Link>
						<Link href={route('publikasi.galeri.index')}>Galeri</Link>
						<Link href={route('publikasi.berita.index')}>Berita</Link>
					</div>
					<div className='w-full text-center md:text-left'>
						<p className='break-normal'>{address}</p>
						<p className='mt-4'>Telp: {phone}</p>
						<p>Email: {email}</p>
					</div>
				</div>
			</div>

			<hr />

			<div className='flex flex-row flex-wrap items-center justify-center gap-x-3 gap-y-1 lg:justify-between'>
				<p className='text-center lg:text-start'>©2025 Badan Usaha Milik Desa Dwi Buana Amertha</p>
				<div className='flex flex-row gap-3'>
					<Link href='#'>
						<img src='/assets/instagram.png' alt='instagram' className='h-8 w-8' />
					</Link>
					<Link href='#'>
						<img src='/assets/youtube.png' alt='youtube' className='h-8 w-8' />
					</Link>
				</div>
			</div>
		</div>
	);
}
