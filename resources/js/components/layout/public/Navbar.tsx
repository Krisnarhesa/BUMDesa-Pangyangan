import { Link } from '@inertiajs/react';
import { Sheet, SheetContent, SheetTrigger } from '../../ui/sheet';
import { cn, splitPathname } from '@/lib/utils';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@radix-ui/react-accordion';
import { menus } from '../admin/menus';
import { ChevronDown } from 'lucide-react';
import { useEffect } from 'react';

export default function Navbar() {
	const urlPath = window.location.pathname;

	return (
		<>
			{/* >>> Desktop navbar >>> */}
			<nav className='hidden fixed z-10 top-0 left-0 right-0 px-6 py-3 bg-white flex-row justify-between items-center lg:flex'>
				<Link href='/'>
					<img src='/assets/logo-bumdes.png' alt='BUMDes logo' className='w-12 h-12' />
				</Link>
				<ul className='flex justify-center items-center gap-4'>
					<li>
						<Link href='struktur-organisasi'>Struktur Organisasi</Link>
					</li>
					<li>
						<Link href='unit-usaha'>Unit Usaha</Link>
					</li>
					<li>
						<Link href='program-kerja'>Program Kerja</Link>
					</li>
					<li>
						<Link href='struktur-organisasi'>Publikasi</Link>
					</li>
				</ul>
			</nav>
			{/* <<< Desktop navbar <<< */}

			{/* >>> Mobile nav >>> */}
			<div className='sticky inset-x-0 bg-white px-4 sm:px-6 md:px-8 lg:hidden '>
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
								<svg className='w-5 h-5' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
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
									<Link href='/dashboard' aria-label='Brand'>
										<img src='/assets/logo-bumdes.png' alt='BUMDes logo' className='w-12 h-12 mx-auto' />
									</Link>
								</div>

								<nav className='p-6 w-full flex flex-col flex-wrap'>
									<ul className='space-y-1.5'>
										{menus.map((item) => {
											if (item.type === 'link') {
												return (
													<li key={item.title}>
														<Link
															className={cn(
																'flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-md hover:bg-gray-100',
																urlPath === item.href || (urlPath.startsWith(item.href) && item.href !== '/dashboard')
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
																	'w-full flex justify-between items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 font-normal rounded-md hover:bg-gray-100 hover:no-underline',
																	urlPath === item.href || (urlPath.startsWith(item.href) && item.href !== '/dashboard')
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
																					'flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-md hover:bg-gray-100',
																					urlPath.startsWith(e.href) && 'bg-gray-100'
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

					<ol className='ml-3 flex items-center whitespace-nowrap min-w-0' aria-label='Breadcrumb'>
						<li className='flex items-center text-sm text-gray-800 '>
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
							{menus.find((item) => splitPathname(urlPath) === item.href)?.title}
						</li>
					</ol>
				</div>
			</div>
			{/* <<< Mobile nav <<< */}
		</>
	);
}
