import { menus } from '@/components/layout/public/menus';
import { Button } from '@/components/ui/button';
import { cn, splitPathname } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { route } from 'ziggy-js';
import * as _ from 'lodash';

const data = [
	{
		id: 1,
		nama: 'simpan pinjam',
		deskripsi:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec egestas massa ligula, nec bibendum metus posuere non. Nulla feugiat odio eget varius pellentesque. Nulla vel risus et nibh accumsan ornare. Aenean euismod egestas iaculis. Vestibulum vulputate est ut massa sollicitudin imperdiet. Fusce erat nunc, pretium varius tempor nec, posuere ac nibh. Aenean non facilisis justo, in egestas metus. Aliquam ligula augue, fermentum a malesuada eu, eleifend id ex. Praesent non accumsan sem. Aenean viverra quis magna eget ullamcorper. In ac felis in dui pulvinar vehicula.',
		gambar: '/assets/test.jpg',
	},
	{
		id: 2,
		nama: 'perdagangan',
		deskripsi:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec egestas massa ligula, nec bibendum metus posuere non. Nulla feugiat odio eget varius pellentesque. Nulla vel risus et nibh accumsan ornare. Aenean euismod egestas iaculis. Vestibulum vulputate est ut massa sollicitudin imperdiet. Fusce erat nunc, pretium varius tempor nec, posuere ac nibh. Aenean non facilisis justo, in egestas metus. Aliquam ligula augue, fermentum a malesuada eu, eleifend id ex. Praesent non accumsan sem. Aenean viverra quis magna eget ullamcorper. In ac felis in dui pulvinar vehicula.',
		gambar: '/assets/test.jpg',
	},
	{
		id: 3,
		nama: 'jasa',
		deskripsi:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec egestas massa ligula, nec bibendum metus posuere non. Nulla feugiat odio eget varius pellentesque. Nulla vel risus et nibh accumsan ornare. Aenean euismod egestas iaculis. Vestibulum vulputate est ut massa sollicitudin imperdiet. Fusce erat nunc, pretium varius tempor nec, posuere ac nibh. Aenean non facilisis justo, in egestas metus. Aliquam ligula augue, fermentum a malesuada eu, eleifend id ex. Praesent non accumsan sem. Aenean viverra quis magna eget ullamcorper. In ac felis in dui pulvinar vehicula.',
		gambar: '/assets/test.jpg',
	},
	{
		id: 4,
		nama: 'pengolahan sampah',
		deskripsi:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec egestas massa ligula, nec bibendum metus posuere non. Nulla feugiat odio eget varius pellentesque. Nulla vel risus et nibh accumsan ornare. Aenean euismod egestas iaculis. Vestibulum vulputate est ut massa sollicitudin imperdiet. Fusce erat nunc, pretium varius tempor nec, posuere ac nibh. Aenean non facilisis justo, in egestas metus. Aliquam ligula augue, fermentum a malesuada eu, eleifend id ex. Praesent non accumsan sem. Aenean viverra quis magna eget ullamcorper. In ac felis in dui pulvinar vehicula.',
		gambar: '/assets/test.jpg',
	},
	{
		id: 5,
		nama: 'ketahanan pangan',
		deskripsi:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec egestas massa ligula, nec bibendum metus posuere non. Nulla feugiat odio eget varius pellentesque. Nulla vel risus et nibh accumsan ornare. Aenean euismod egestas iaculis. Vestibulum vulputate est ut massa sollicitudin imperdiet. Fusce erat nunc, pretium varius tempor nec, posuere ac nibh. Aenean non facilisis justo, in egestas metus. Aliquam ligula augue, fermentum a malesuada eu, eleifend id ex. Praesent non accumsan sem. Aenean viverra quis magna eget ullamcorper. In ac felis in dui pulvinar vehicula.',
		gambar: '/assets/test.jpg',
	},
	{
		id: 6,
		nama: 'pariwisata',
		deskripsi:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec egestas massa ligula, nec bibendum metus posuere non. Nulla feugiat odio eget varius pellentesque. Nulla vel risus et nibh accumsan ornare. Aenean euismod egestas iaculis. Vestibulum vulputate est ut massa sollicitudin imperdiet. Fusce erat nunc, pretium varius tempor nec, posuere ac nibh. Aenean non facilisis justo, in egestas metus. Aliquam ligula augue, fermentum a malesuada eu, eleifend id ex. Praesent non accumsan sem. Aenean viverra quis magna eget ullamcorper. In ac felis in dui pulvinar vehicula.',
		gambar: '/assets/test.jpg',
	},
];

export default function UnitUsahaLayout({ children }: { children: React.ReactNode }) {
	const urlPath = window.location.pathname;
	console.log(splitPathname(urlPath).split('/')[1]);

	return (
		<div>
			<div className='h-[100px] bg-slate-50'>
				<div className='mx-auto w-full max-w-6xl px-4 pt-6'>
					<p className='text-bumdes-dark-blue text-2xl font-bold'>Unit Usaha</p>
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
					<li className='truncate text-sm font-semibold text-gray-800' aria-current='page'>
						{menus.find((item) => splitPathname(urlPath).startsWith(item.href))?.title}
					</li>
				</ol>
				{/* <<< Breadcrumb <<< */}

				<div className='mt-16 flex w-full flex-col gap-16 md:flex-row'>
					{/* >>> Direksi menu >>> */}
					<div className='h-min w-full flex-none rounded-xl bg-white p-2 drop-shadow-lg md:w-[200px]'>
						<ul className='flex w-full flex-row gap-1 space-y-1 overflow-x-auto md:block'>
							{data.map((e, i) => (
								<li key={i}>
									<Link
										href={route('unit_usaha.show', { id: e.id, slug: _.kebabCase(e.nama.toLowerCase()) })}
										className='w-full'
									>
										<Button
											className={cn(
												'text-bumdes-dark-blue hover:bg-bumdes-dark-blue/80 w-full justify-start bg-white capitalize hover:text-white',
												{
													'bg-bumdes-dark-blue text-white': Number(splitPathname(urlPath).split('/')[2]) === e.id,
												}
											)}
										>
											{e.nama}
										</Button>
									</Link>
								</li>
							))}
						</ul>
					</div>
					{/* <<< Direksi menu <<< */}

					<div className='min-w-0 grow'>{children}</div>
				</div>
			</div>
		</div>
	);
}
