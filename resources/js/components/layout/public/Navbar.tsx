import { Link } from '@inertiajs/react';
import { Sheet, SheetContent, SheetTrigger } from '../../ui/sheet';
import { cn } from '@/lib/utils';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@radix-ui/react-accordion';
import { menus } from './menus';
import { ChevronDown } from 'lucide-react';
import { route } from 'ziggy-js';
import { Content, HoverLink, Trigger } from '@/components/ui/hover-link';

export default function Navbar({ logoUrl }: { logoUrl: string }) {
	const urlPath = window.location.pathname;

	return (
		<>
			{/* >>> Desktop navbar >>> */}
			<nav className='fixed top-0 right-0 left-0 z-10 hidden flex-row items-center justify-between bg-white px-6 py-3 lg:flex'>
				<Link href='/'>
					<img src={`/storage/${logoUrl}`} alt='BUMDes logo' className='h-12 w-12' />
				</Link>
				<ul className='flex items-center justify-center gap-4'>
					<li>
						<Link href={route('profil.index')}>Profil</Link>
					</li>
					<li>
						<Link href={route('struktur.show', { jabatan: 'bagan' })}>Struktur Organisasi</Link>
					</li>
					<li>
						<Link href={route('unit_usaha.index')}>Unit Usaha</Link>
					</li>
					<li>
						<HoverLink>
							<Trigger className='flex'>
								Publikasi <ChevronDown />
							</Trigger>
							<Content sideOffset={32}>
								<div className='grid grid-cols-2 gap-4'>
									<Link href={route('publikasi.galeri.index')}>Galeri</Link>
									<Link href={route('publikasi.berita.index')}>Berita</Link>
								</div>
							</Content>
						</HoverLink>
					</li>
				</ul>
			</nav>
			{/* <<< Desktop navbar <<< */}

			{/* >>> Mobile nav >>> */}
			<div className='sticky inset-x-0 bg-white px-4 sm:px-6 md:px-8 lg:hidden'>
				<div className='flex items-center py-4'>
					<Sheet>
						<SheetTrigger asChild>
							<button
								type='button'
								className='text-gray-500 hover:text-gray-600'
								data-hs-overlay='#application-sidebar'
								aria-controls='application-sidebar'
								aria-label='Toggle navigation'
							>
								<span className='sr-only'>Toggle Navigation</span>
								<svg className='h-5 w-5' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
									<path
										fillRule='evenodd'
										d='M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z'
									/>
								</svg>
							</button>
						</SheetTrigger>
						<SheetContent side={'left'} className='px-0'>
							<div id='application-sidebar'>
								<div className='px-6'>
									<Link href='/' aria-label='Brand'>
										<img src={`/storage/${logoUrl}`} alt='BUMDes logo' className='mx-auto h-12 w-12' />
									</Link>
								</div>

								<nav className='flex w-full flex-col flex-wrap p-6'>
									<ul className='space-y-1.5'>
										{menus.map((item) => {
											if (item.type === 'link') {
												return (
													<li key={item.title}>
														<Link
															className={cn(
																'flex items-center gap-x-3.5 rounded-md px-2.5 py-2 text-sm text-slate-700 hover:bg-gray-100',
																urlPath.includes(item.domain) ||
																	(urlPath.startsWith(item.href) && item.href !== '/dashboard')
																	? 'bg-gray-100'
																	: ''
															)}
															href={item.href}
														>
															{item.icon}
															{item.title}
														</Link>
													</li>
												);
											} else {
												return (
													<Accordion key={item.title} type='multiple'>
														<AccordionItem className='border-none' value='item-1'>
															<AccordionTrigger
																className={cn(
																	'flex w-full items-center justify-between gap-x-3.5 rounded-md px-2.5 py-2 text-sm font-normal text-slate-700 hover:bg-gray-100 hover:no-underline',
																	urlPath.includes(item.domain) ||
																		(urlPath.startsWith(item.href) && item.href !== '/dashboard')
																		? 'bg-gray-100'
																		: ''
																)}
															>
																<div className='flex gap-x-3.5'>
																	{item.icon}
																	{item.title}
																</div>
																<ChevronDown />
															</AccordionTrigger>
															<AccordionContent className='ps-7'>
																{item.child.map((e) => {
																	return (
																		<li key={e.title} className='mt-2'>
																			<Link
																				className={cn(
																					'flex items-center gap-x-3.5 rounded-md px-2.5 py-2 text-sm text-slate-700 hover:bg-gray-100',
																					{ 'bg-gray-100': urlPath.includes(e.domain) }
																				)}
																				href={e.href}
																			>
																				{e.icon}
																				{e.title}
																			</Link>
																		</li>
																	);
																})}
															</AccordionContent>
														</AccordionItem>
													</Accordion>
												);
											}
										})}
									</ul>
								</nav>
							</div>
						</SheetContent>
					</Sheet>

					<ol className='ml-3 flex min-w-0 items-center whitespace-nowrap' aria-label='Breadcrumb'>
						<li className='flex items-center text-sm text-gray-800'>BUMDes</li>
					</ol>
				</div>
			</div>
			{/* <<< Mobile nav <<< */}
		</>
	);
}
