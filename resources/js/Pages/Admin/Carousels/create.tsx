import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { AddCarouselSchema } from '@/lib/yup/schemas';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { route } from 'ziggy-js';
import { ChevronLeft } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { useEffect } from 'react';
import { addCarousel } from '@/lib/data/carousels';
import StyledInput from '@/components/input/StyledInput';
import { Input } from '@/components/ui/input';

type Data = yup.InferType<typeof AddCarouselSchema>;

export default function create() {
	const { toast } = useToast();
	const {
		register,
		handleSubmit,
		formState: { errors },
		setFocus,
	} = useForm({
		resolver: yupResolver(AddCarouselSchema),
	});

	useEffect(() => {
		setFocus('image');
	}, [setFocus]);

	const mutation = useMutation({
		mutationFn: (data: Data) => addCarousel(data),
		onSuccess: (data) => {
			toast({
				title: 'Success',
				description: 'Berhasil menambah carousel',
				duration: 5000,
			});
			window.location.replace(route('admin.carousels.index'));
		},
		onError: () => {
			toast({
				title: 'Error',
				description: 'Database error: Gagal menambahkan carousel',
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
							<Link href={route('admin.carousels.index')}>
								<ChevronLeft />
							</Link>
						</Button>
						<p className='text-lg'>Carousel baru</p>
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
						{/* >>> Gambar >>> */}
						<StyledInput label='Gambar' error={errors.image?.message}>
							<Input type='file' accept='image/png,image/jpeg' {...register('image')} className='w-auto' />
						</StyledInput>
						{/* <<< Gambar <<< */}

						<Button className='rounded-md lg:ml-28' type='submit' isLoading={mutation.isPending}>
							Save
						</Button>
					</form>
				</div>
			</section>
		</>
	);
}
