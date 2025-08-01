import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/components/ui/use-toast';
import api from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { Loader2 } from 'lucide-react';
import * as React from 'react';
import { CookiesProvider } from 'react-cookie';

function Login() {
	const [isLoading, setIsLoading] = React.useState(false);
	const { toast } = useToast();
	const { login } = useAuth();

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		try {
			const res = await api.post<{ success: boolean; message: string; data: { token: string } }>('/api/login', {
				email: formData.get('email'),
				password: formData.get('password'),
			});

			if (res.data.success) {
				login(res.data.data.token);
				return;
			} else {
				alert('Salah');
				return toast({
					title: 'Error',
					description: res.data.message,
					duration: 5000,
					variant: 'destructive',
				});
			}
		} catch (error) {
			return toast({
				title: 'Error',
				description: 'Terjadi kesalahan',
				duration: 5000,
				variant: 'destructive',
			});
		}
	};

	return (
		<div className='h-screen'>
			<section className='flex h-full items-center bg-gray-100 py-16'>
				<div className='mx-auto w-full max-w-md space-y-4'>
					<img
						src='/assets/logo-bumdes.png'
						alt='Pertamina Pertagas Niaga Logo'
						className='mx-auto w-54 object-contain'
						width={300}
						height={300}
					/>

					<div className='rounded-xl border border-gray-200 bg-white shadow-sm'>
						<div className='p-4 sm:p-7'>
							<div className='text-center'>
								<h1 className='block text-2xl font-bold text-gray-800'>Sign in</h1>
							</div>

							<div className='mt-5'>
								<form onSubmit={onSubmit}>
									<div className='grid gap-y-4'>
										<div>
											<label htmlFor='email' className='mb-2 block text-sm'>
												Email address
											</label>
											<div className='relative'>
												<Input
													name='email'
													className='focus:border-blue-500 focus:ring-blue-500 focus-visible:ring-blue-600'
												/>
											</div>
										</div>

										<div>
											<div className='flex items-center justify-between'>
												<label htmlFor='password' className='mb-2 block text-sm'>
													Password
												</label>
											</div>
											<div className='relative'>
												<PasswordInput
													name='password'
													className='focus:border-blue-500 focus:ring-blue-500 focus-visible:ring-blue-600'
												/>
											</div>
										</div>

										<Button disabled={isLoading}>
											{isLoading && <Loader2 className='mr-2 h-5 w-5 animate-spin' />}
											Sign in
										</Button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>

			<Toaster />
		</div>
	);
}

Login.layout = (page: React.ReactNode) => <CookiesProvider>{page}</CookiesProvider>;

export default Login;
