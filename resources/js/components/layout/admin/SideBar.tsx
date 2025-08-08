import { Sheet, SheetContent, SheetTrigger } from '../../ui/sheet';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../ui/accordion';
import { Link } from '@inertiajs/react';
import { menus } from './menus';
import { route } from 'ziggy-js';

export default function SideBar() {
	const urlPath = window.location.pathname;

	return (
		<>
			{/* >>> Mobile nav >>> */}
			<div className='sticky inset-x-0 top-[4.75rem] z-20 border-y bg-white px-4 sm:px-6 md:px-8 lg:hidden'>
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
									<Link
										className='flex items-center justify-center gap-5 text-xl font-semibold'
										href='/dashboard'
										aria-label='Brand'
									>
										<img src='/assets/logo-bumdes.png' alt='Pertamina Pertagas Niaga logo' className='w-16' />
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
																	'flex items-center gap-x-3.5 rounded-md px-2.5 py-2 text-sm font-normal text-slate-700 hover:bg-gray-100 hover:no-underline',
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
															</AccordionTrigger>
															<AccordionContent className='ps-7'>
																{item.child.map((e) => {
																	return (
																		<li key={e.title} className='mt-2'>
																			<Link
																				className={cn(
																					'flex items-center gap-x-3.5 rounded-md px-2.5 py-2 text-sm text-slate-700 hover:bg-gray-100',
																					urlPath === '/' + e.href.split('/').slice(3).join('/') && 'bg-gray-100'
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
						<li className='flex items-center text-sm text-gray-800'>
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
							{menus.find((item) => urlPath.includes(item.domain))?.title}
						</li>
					</ol>
				</div>
			</div>
			{/* <<< Mobile nav <<< */}

			{/* >>> Desktop nav >>> */}
			<div
				id='application-sidebar'
				className='hs-overlay hs-overlay-open:translate-x-0 scrollbar-y fixed top-0 bottom-0 left-0 z-[50] hidden w-64 -translate-x-full transform overflow-y-auto border-r border-gray-200 bg-white pt-7 pb-10 transition-all duration-300 lg:right-auto lg:bottom-0 lg:block lg:translate-x-0'
			>
				<div className='flex px-6'>
					<Link
						className='mx-auto flex items-center justify-center gap-5 text-xl font-semibold'
						href={route('admin.dashboard')}
						aria-label='Brand'
					>
						<img src='/assets/logo-bumdes.png' alt='Pertamina Pertagas Niaga logo' className='w-16 object-contain' />
					</Link>
				</div>

				<nav className='hs-accordion-group flex w-full flex-col flex-wrap p-6'>
					<ul className='space-y-1.5'>
						{menus.map((item) => {
							if (item.type === 'link') {
								return (
									<li key={item.title}>
										<Link
											className={cn(
												'flex items-center gap-x-3.5 rounded-md px-2.5 py-2 text-sm text-slate-700 hover:bg-gray-100',
												urlPath.includes(item.domain) || (urlPath.startsWith(item.href) && item.href !== '/dashboard')
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
													'flex items-center gap-x-3.5 rounded-md px-2.5 py-2 text-sm font-normal text-slate-700 hover:bg-gray-100 hover:no-underline',
													urlPath.includes(item.domain) || (urlPath.startsWith(item.href) && item.href !== '/dashboard')
														? 'bg-gray-100'
														: ''
												)}
											>
												<div className='flex gap-x-3.5'>
													{item.icon}
													{item.title}
												</div>
											</AccordionTrigger>
											<AccordionContent className='ps-7'>
												{item.child.map((e) => {
													return (
														<li key={e.title} className='mt-2'>
															<Link
																className={cn(
																	'flex items-center gap-x-3.5 rounded-md px-2.5 py-2 text-sm text-slate-700 hover:bg-gray-100',
																	urlPath === '/' + e.href.split('/').slice(3).join('/') && 'bg-gray-100'
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
			{/* <<< Desktop nav <<< */}
		</>
	);
}
