import { LogOut, UserCircle2 } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';

const Header = () => {
	return (
		<header className='sticky top-0 inset-x-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-[48] w-full bg-white border-b text-sm py-2.5 sm:py-4 lg:pl-64 '>
			<nav className='flex basis-full items-center w-full mx-auto px-4 sm:px-6 md:px-8' aria-label='Global'>
				<div className='mr-5 lg:mr-0 lg:hidden'>
					<a className='flex-none text-xl font-semibold ' href='#' aria-label='Brand'>
						BUMDes Amertha
						{/* <Image src={Logo} alt='Pertamina Pertagas Niaga logo' width={100} height={100} className='w-32' /> */}
					</a>
				</div>

				<div className='w-full flex items-center justify-end ml-auto sm:justify-between sm:gap-x-3 sm:order-3'>
					<div className='flex flex-row items-center justify-end gap-2 ml-auto mr-0'>
						<div className='hs-dropdown relative inline-flex [--placement:bottom-right]'>
							<Popover>
								<PopoverTrigger asChild>
									<button
										id='hs-dropdown-with-header'
										type='button'
										className='hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] w-[2.375rem] rounded-full font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-xs '
									>
										<UserCircle2 />
									</button>
								</PopoverTrigger>
								<PopoverContent className='p-0 w-fit'>
									<div className='w-fit shadow-md rounded-lg p-2 min-w-[10rem]'>
										<div className='py-3 px-5 -m-2 bg-gray-100 rounded-t-lg '>
											<p className='text-sm text-gray-500 '>Signed in as</p>
											<p className='text-sm font-medium text-gray-800 '>Tes User</p>
										</div>
										<div className='mt-2 py-2 first:pt-0 last:pb-0'>
											{/* <Link
                        href={`/profile?callbackUrl=${encodeURIComponent(currentUrl?.href ?? '')}`}
                        className='flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 w-full '
                      >
                        <User2 className='mr-2 h-4 w-4' />
                        Profile
                      </Link> */}
											<button className='flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 w-full '>
												<LogOut className='mr-2 h-4 w-4' />
												Log out
											</button>
										</div>
									</div>
								</PopoverContent>
							</Popover>
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Header;
