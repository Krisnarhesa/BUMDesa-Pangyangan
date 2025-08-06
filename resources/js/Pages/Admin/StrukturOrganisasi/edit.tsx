import TextInput from '@/components/input/TextInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { UpdateStructureSchema } from '@/lib/yup/schemas';
import { Button } from '@/components/ui/button';
import StyledInput from '@/components/input/StyledInput';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { route } from 'ziggy-js';
import { Link } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';
import { updateStructure } from '@/lib/data/struktur';

type Data = yup.InferType<typeof UpdateStructureSchema>;

export default function edit({
	id,
	name,
	titleId,
	titles,
}: {
	id: number;
	name: string;
	titleId: number;
	titles: JobTitle[];
}) {
	const { toast } = useToast();
	const {
		register,
		handleSubmit,
		setValue,
		trigger,
		formState: { errors },
	} = useForm({
		defaultValues: {
			nama: name,
			jabatan_id: titleId,
		},
		resolver: yupResolver(UpdateStructureSchema),
	});

	const mutation = useMutation({
		mutationFn: (data: Data) => updateStructure(id, data),
		onSuccess: (data) => {
			toast({
				title: 'Success',
				description: data.message,
				duration: 5000,
			});
			window.location.replace(route('admin.struktur.index'));
		},
		onError: () => {
			toast({
				title: 'Error',
				description: 'Database error: Gagal edit struktur',
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
							<Link href={route('admin.struktur.index')}>
								<ChevronLeft />
							</Link>
						</Button>
						<p className='text-lg'>Edit</p>
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

						{/* >>> Foto >>> */}
						<StyledInput label='Foto' error={errors.foto?.message}>
							<Input type='file' accept='image/png,image/jpeg' {...register('foto')} className='w-auto' />
						</StyledInput>
						{/* <<< Foto <<< */}

						{/* >>> Jabatan >>> */}
						<StyledInput label='Jabatan' error={errors.jabatan_id?.message}>
							<Select
								defaultValue={String(titleId)}
								onValueChange={(v) => {
									setValue('jabatan_id', Number(v));
									trigger('jabatan_id');
								}}
							>
								<SelectTrigger className='w-full max-w-[10rem]'>
									<SelectValue placeholder='Pilih jabatan' />
								</SelectTrigger>
								<SelectContent>
									{titles.map((t, i) => (
										<SelectItem key={i} value={String(t.id)}>
											<span className='capitalize'>{t.nama}</span>
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</StyledInput>
						{/* <<< Jabatan <<< */}

						<Button className='rounded-md lg:ml-28' type='submit' isLoading={mutation.isPending}>
							Save
						</Button>
					</form>
				</div>
			</section>
		</>
	);
}
