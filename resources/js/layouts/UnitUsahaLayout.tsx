import { menus } from '@/components/layout/admin/menus';
import { Button } from '@/components/ui/button';
import { cn, splitPathname } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function UnitUsahaLayout({ children }: { children: React.ReactNode }) {
	const urlPath = window.location.pathname;

	return (
		<div>
			<div className='h-[100px] bg-slate-50'>
				<div className='w-full max-w-6xl mx-auto px-4 pt-6'>
					<p className='text-bumdes-dark-blue text-2xl font-bold'>Struktur Organisasi</p>
				</div>
			</div>

			<div className='w-full max-w-6xl mx-auto px-4 py-16'>
				{/* >>> Breadcrumb >>> */}
				<ol className='ml-3 flex items-center whitespace-nowrap min-w-0' aria-label='Breadcrumb'>
					<li className='flex items-center text-gray-800 '>
						BUMDes
						<svg
							className='flex-shrink-0 mx-3 overflow-visible h-2.5 w-2.5 text-gray-400 '
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
					<li className='text-sm font-semibold text-gray-800 truncate ' aria-current='page'>
						{menus.find((item) => splitPathname(urlPath).startsWith(item.href))?.title}
					</li>
				</ol>
				{/* <<< Breadcrumb <<< */}

				<div className='flex flex-col lg:flex-row gap-16 mt-16'>
					{/* >>> Direksi menu >>> */}
					<div className='flex-none w-[200px] h-min rounded-xl p-2 drop-shadow-lg bg-white'>
						<ul className='space-y-1'>
							{['penasihat', 'direktur', 'pengawas', 'sekretaris', 'bendahara'].map((e, i) => (
								<li key={i}>
									<Link href={route(`struktur.${e}`)} className='w-full'>
										<Button
											className={cn(
												'w-full justify-start bg-white text-bumdes-dark-blue capitalize hover:text-white hover:bg-bumdes-dark-blue/80',
												{
													'bg-bumdes-dark-blue text-white': splitPathname(urlPath).includes(e),
												}
											)}
										>
											{e}
										</Button>
									</Link>
								</li>
							))}
						</ul>
					</div>
					{/* <<< Direksi menu <<< */}

					<div>{children}</div>
				</div>
			</div>
		</div>
	);
}
