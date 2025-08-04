import TextInput from '@/components/input/TextInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { AddUnitUsahaProdukSchema } from '@/lib/yup/schemas';
import { Button } from '@/components/ui/button';
import StyledInput from '@/components/input/StyledInput';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { route } from 'ziggy-js';
import { addUnitUsahaProduk } from '@/lib/data/unit-produk';
import { ChevronLeft } from 'lucide-react';
import { Link } from '@inertiajs/react';

type Data = yup.InferType<typeof AddUnitUsahaProdukSchema>;

export default function create({ id }: { id: string }) {
	const { toast } = useToast();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			unit_usaha_id: Number(id),
		},
		resolver: yupResolver(AddUnitUsahaProdukSchema),
	});

	const mutation = useMutation({
		mutationFn: (data: Data) => addUnitUsahaProduk(data),
		onSuccess: (data) => {
			toast({
				title: 'Success',
				description: data.message,
				duration: 5000,
			});
			window.location.replace(route('admin.unit.produk.index', { id: id }));
		},
		onError: () => {
			toast({
				title: 'Error',
				description: 'Database error: Gagal menambahkan produk',
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
							<Link href={route('admin.unit.produk.index', { id: id })}>
								<ChevronLeft />
							</Link>
						</Button>
						<p className='text-lg'>Produk baru</p>
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
						{/* >>> Nama >>> */}
						<TextInput label='Nama' idProps={{ ...register('nama') }} idError={errors.nama?.message} en={false} />
						{/* <<< Nama <<< */}

						{/* >>> Harga >>> */}
						<TextInput
							label='Harga'
							idProps={{
								...register('harga'),
								type: 'tel',
								inputMode: 'numeric',
								pattern: '[0-9]*',
								autoComplete: 'off',
								onInput: (e) => {
									const target = e.target as HTMLInputElement;
									target.value = target.value.replace(/[^0-9]/g, '');
								},
							}}
							idError={errors.harga?.message}
							en={false}
						/>
						{/* <<< Harga <<< */}

						{/* >>> Deskripsi >>> */}
						<TextInput
							label='Deskripsi'
							type='textarea'
							idProps={{ ...register('deskripsi') }}
							idError={errors.deskripsi?.message}
							en={false}
						/>
						{/* <<< Deskripsi <<< */}

						{/* >>> Gambar >>> */}
						<StyledInput label='Gambar' error={errors.gambar?.message}>
							<Input type='file' accept='image/png,image/jpeg' {...register('gambar')} className='w-auto' />
						</StyledInput>
						{/* <<< Gambar <<< */}

						<input type='hidden' {...register('unit_usaha_id')} />

						<Button className='rounded-md lg:ml-28' type='submit' isLoading={mutation.isPending}>
							Save
						</Button>
					</form>
				</div>
			</section>
		</>
	);
}
