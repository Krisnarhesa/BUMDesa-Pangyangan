import { LogOut, UserCircle2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import api from '@/lib/api';
import { route } from 'ziggy-js';
import { useAuth } from '@/lib/auth';

const Header = ({ logoUrl }: { logoUrl: string }) => {
	const { logout } = useAuth();

	const handleLogout = async () => {
		try {
			const res = await api.post(route('api.logout'));
			if (res.status === 200) logout();
		} catch (error) {
			alert('Terjadi kesalahan');
		}
	};

	return (
		<header className='sticky inset-x-0 top-0 z-[48] flex w-full flex-wrap border-b bg-white py-2.5 text-sm sm:flex-nowrap sm:justify-start sm:py-4 lg:pl-64'>
			<nav className='mx-auto flex w-full basis-full items-center px-4 sm:px-6 md:px-8' aria-label='Global'>
				<div className='mr-5 lg:mr-0 lg:hidden'>
					<a className='flex-none text-xl font-semibold' href='#' aria-label='Brand'>
						<img src={`/storage/${logoUrl}`} alt='Logo BUMDes' className='w-12' />
					</a>
				</div>

				<div className='ml-auto flex w-full items-center justify-end sm:order-3 sm:justify-between sm:gap-x-3'>
					<div className='mr-0 ml-auto flex flex-row items-center justify-end gap-2'>
						<div className='hs-dropdown relative inline-flex [--placement:bottom-right]'>
							<Popover>
								<PopoverTrigger asChild>
									<button
										id='hs-dropdown-with-header'
										type='button'
										className='hs-dropdown-toggle inline-flex h-[2.375rem] w-[2.375rem] flex-shrink-0 items-center justify-center gap-2 rounded-full bg-white align-middle text-xs font-medium text-gray-700 transition-all hover:bg-gray-50 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white focus:outline-none'
									>
										<UserCircle2 />
									</button>
								</PopoverTrigger>
								<PopoverContent className='w-fit p-0'>
									<div className='w-fit min-w-[10rem] rounded-lg p-2 shadow-md'>
										<div className='-m-2 rounded-t-lg bg-gray-100 px-5 py-3'>
											<p className='text-sm text-gray-500'>Signed in as</p>
											<p className='text-sm font-medium text-gray-800'>Admin</p>
										</div>
										<div className='mt-2 py-2 first:pt-0 last:pb-0'>
											<button
												onClick={handleLogout}
												className='flex w-full items-center gap-x-3.5 rounded-md px-3 py-2 text-sm text-gray-800 hover:bg-gray-100'
											>
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
