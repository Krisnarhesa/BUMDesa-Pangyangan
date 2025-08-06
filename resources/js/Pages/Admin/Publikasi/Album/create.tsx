import TextInput from '@/components/input/TextInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { AddAlbumSchema } from '@/lib/yup/schemas';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { route } from 'ziggy-js';
import { addAlbum } from '@/lib/data/album';
import { ChevronLeft } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { useEffect } from 'react';

type Data = yup.InferType<typeof AddAlbumSchema>;

export default function create() {
	const { toast } = useToast();
	const {
		register,
		handleSubmit,
		formState: { errors },
		setFocus,
	} = useForm({
		resolver: yupResolver(AddAlbumSchema),
	});

	useEffect(() => {
		setFocus('nama');
	}, [setFocus]);

	const mutation = useMutation({
		mutationFn: (data: Data) => addAlbum(data),
		onSuccess: (data) => {
			toast({
				title: 'Success',
				description: data.message,
				duration: 5000,
			});
			window.location.replace(route('admin.album.index'));
		},
		onError: () => {
			toast({
				title: 'Error',
				description: 'Database error: Gagal menambahkan album',
				duration: 5000,
				variant: 'destructive',
			});
		},
	});

	const onSubmit: SubmitHandler<Data> = (data) => {
		mutation.mutate(data);
	};

	return (
		<>
			<header className='sticky inset-x-0 top-0 z-[48] flex w-full flex-wrap border-b bg-white py-2.5 text-sm sm:flex-nowrap sm:justify-start sm:py-4 lg:pl-64'>
				<div className='flex w-full items-center justify-between px-10'>
					<div className='flex items-center gap-3'>
						<Button size={'sm'} variant={'ghost'} asChild>
							<Link href={route('admin.album.index')}>
								<ChevronLeft />
							</Link>
						</Button>
						<p className='text-lg'>Album baru</p>
					</div>
				</div>
			</header>
			<section className='min-h-screen w-full px-4 sm:px-6 md:px-8 lg:pl-72'>
				<div className='grid overflow-auto py-10'>
					<form
						encType='multipart/form-data'
						onSubmit={handleSubmit(onSubmit)}
						className='container mx-auto max-w-5xl space-y-10'
					>
						{/* >>> Nama album >>> */}
						<TextInput label='Nama album' idProps={{ ...register('nama') }} idError={errors.nama?.message} en={false} />
						{/* <<< Nama album <<< */}

						<Button className='rounded-md lg:ml-28' type='submit' isLoading={mutation.isPending}>
							Save
						</Button>
					</form>
				</div>
			</section>
		</>
	);
}
