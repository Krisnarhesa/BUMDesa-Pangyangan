import TextInput from '@/components/input/TextInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { UpdateNewsSchema } from '@/lib/yup/schemas';
import { Button } from '@/components/ui/button';
import StyledInput from '@/components/input/StyledInput';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { route } from 'ziggy-js';
import { updateNews } from '@/lib/data/news';
import { Link } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';

type Data = yup.InferType<typeof UpdateNewsSchema>;

export default function edit({
	categories,
	newsId,
	title,
	content,
	categoryId,
}: {
	categories: NewsCategory[];
	newsId: number;
	title: string;
	content: string;
	categoryId: number;
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
			judul: title,
			konten: content,
			kategori_id: categoryId,
		},
		resolver: yupResolver(UpdateNewsSchema),
	});

	const mutation = useMutation({
		mutationFn: (data: Data) => updateNews(newsId, data),
		onSuccess: (data) => {
			toast({
				title: 'Success',
				description: 'Berhasil edit berita',
				duration: 5000,
			});
			window.location.replace(route('admin.berita.index'));
		},
		onError: () => {
			toast({
				title: 'Error',
				description: 'Database error: Gagal edit berita',
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
							<Link href={route('admin.berita.index')}>
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
						{/* >>> Judul >>> */}
						<TextInput label='Judul' idProps={{ ...register('judul') }} idError={errors.judul?.message} en={false} />
						{/* <<< Judul <<< */}

						{/* >>> Konten >>> */}
						<TextInput
							label='Konten'
							type='textarea'
							idProps={{ ...register('konten') }}
							idError={errors.konten?.message}
							en={false}
						/>
						{/* <<< Konten <<< */}

						{/* >>> Gambar cover >>> */}
						<StyledInput label='Cover' error={errors.gambar_cover?.message}>
							<Input type='file' accept='image/png,image/jpeg' {...register('gambar_cover')} className='w-auto' />
						</StyledInput>
						{/* <<< Gambar cover <<< */}

						{/* >>> Kategori >>> */}
						<StyledInput label='Kategori' error={errors.kategori_id?.message}>
							<Select
								defaultValue={String(categoryId)}
								onValueChange={(v) => {
									setValue('kategori_id', Number(v));
									trigger('kategori_id');
								}}
							>
								<SelectTrigger className='w-full max-w-[10rem]'>
									<SelectValue placeholder='Pilih kategori' />
								</SelectTrigger>
								<SelectContent>
									{categories.map((c, i) => (
										<SelectItem key={i} value={String(c.id)}>
											{c.nama}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</StyledInput>
						{/* <<< Album <<< */}

						<Button className='rounded-md lg:ml-28' type='submit' isLoading={mutation.isPending}>
							Save
						</Button>
					</form>
				</div>
			</section>
		</>
	);
}
