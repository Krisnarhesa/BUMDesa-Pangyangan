import api from '@/lib/api';
import { useEffect, useState } from 'react';
import * as _ from 'lodash';

export default function BeritaLayout({ children }: { children: React.ReactNode }) {
	const urlPath = window.location.pathname;
	const [albums, setAlbums] = useState<Album[]>([]);

	useEffect(() => {
		const fetchAlbums = async () => {
			try {
				const res = await api.get<AxiosResponse<Album[]>>('/api/album');
				setAlbums(res.data.data);
			} catch (error) {
				console.log('ERROR', error);
			}
		};

		fetchAlbums();
	}, []);

	return (
		<div>
			<div className='h-[100px] bg-slate-50'>
				<div className='mx-auto w-full max-w-6xl px-4 pt-6'>
					<p className='text-bumdes-dark-blue text-2xl font-bold'>Berita</p>
				</div>
			</div>

			<div className='mx-auto w-full max-w-6xl px-4 py-16'>
				{/* >>> Breadcrumb >>> */}
				<ol className='ml-3 flex min-w-0 items-center whitespace-nowrap' aria-label='Breadcrumb'>
					<li className='flex items-center text-gray-800'>
						BUMDes
						<svg
							className='mx-3 h-2.5 w-2.5 flex-shrink-0 overflow-visible text-gray-400'
							width='16'
							height='16'
							viewBox='0 0 16 16'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
							/>
						</svg>
					</li>
					<li className='flex items-center text-gray-800'>
						Publikasi
						<svg
							className='mx-3 h-2.5 w-2.5 flex-shrink-0 overflow-visible text-gray-400'
							width='16'
							height='16'
							viewBox='0 0 16 16'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
							/>
						</svg>
					</li>
					<li className='truncate text-sm font-semibold text-gray-800' aria-current='page'>
						Berita
					</li>
				</ol>
				{/* <<< Breadcrumb <<< */}

				<div className='mt-16'>{children}</div>
			</div>
		</div>
	);
}
