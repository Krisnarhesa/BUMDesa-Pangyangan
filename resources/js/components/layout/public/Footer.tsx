import { Link } from '@inertiajs/react';
import { Youtube } from 'lucide-react';

export default function Footer() {
	return (
		<div className='mx-auto mt-32 px-4 space-y-3'>
			<div className='flex flex-col justify-betwee gap-4 md:flex-row'>
				<div className='w-full'>
					<img src='/assets/logo-bumdes.png' alt='BUMDes logo' className='w-30 md:w-40 aspect-square mx-auto lg:ml-0' />
				</div>
				<div className='flex flex-col gap-4 lg:flex-row'>
					<div className='grid auto-cols-auto text-center md:text-left'>
						<Link href='/'>Profil</Link>
						<Link href='#'>Struktur Organisasi</Link>
						<Link href='#'>Program</Link>
						<Link href='#'>Publikasi</Link>
					</div>
					<div className='w-full text-center md:text-left'>
						<p className='break-normal'>
							Jl. Denpasar Gilimanuk, Banjar Swastika, Desa Pangyangan, Kecamatan Pekutatan, Kabupaten Jembrana,
							Provinsi Bali.
						</p>
						<p className='mt-4'>Telp: 087727818845</p>
						<p>Email: dwibuanaamerta@gmail.com</p>
					</div>
				</div>
			</div>

			<hr />

			<div className='flex flex-row flex-wrap justify-center items-center gap-x-3 gap-y-1 lg:justify-between'>
				<p className='text-center lg:text-start'>©2025 Badan Usaha Milik Desa Dwi Buana Amertha</p>
				<div className='flex flex-row gap-3'>
					<Link href='#'>
						<img src='/assets/instagram.png' alt='instagram' className='w-8 h-8' />
					</Link>
					<Link href='#'>
						<img src='/assets/youtube.png' alt='youtube' className='w-8 h-8' />
					</Link>
				</div>
			</div>
		</div>
	);
}
