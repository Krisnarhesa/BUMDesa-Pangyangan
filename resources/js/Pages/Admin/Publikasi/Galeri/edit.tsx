import TextInput from '@/components/input/TextInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { AddGalleryItemSchema, UpdateGalleryItemSchema } from '@/lib/yup/schemas';
import { updateGalleryItem } from '@/lib/data/gallery';
import { Button } from '@/components/ui/button';
import StyledInput from '@/components/input/StyledInput';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { route } from 'ziggy-js';
import { Link } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';

type Data = yup.InferType<typeof AddGalleryItemSchema>;

export default function edit({
	itemId,
	type,
	title,
	link,
	albumId,
	albums,
}: {
	itemId: number;
	type: string;
	title: string;
	link: string;
	albumId: number;
	albums: Album[];
}) {
	const { toast } = useToast();
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		trigger,
		formState: { errors },
	} = useForm({
		defaultValues: {
			judul: title,
			link_youtube: link ?? '',
			jenis: type,
			album_id: albumId,
		},
		resolver: yupResolver(UpdateGalleryItemSchema),
	});

	const mutation = useMutation({
		mutationFn: (data: Data) => updateGalleryItem(itemId, data),
		onSuccess: () => {
			toast({
				title: 'Success',
				description: 'Berhasil update galeri',
				duration: 5000,
			});
			window.location.replace(route('admin.galeri.index'));
		},
		onError: () => {
			toast({
				title: 'Error',
				description: 'Database error: Gagal edit galeri',
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
							<Link href={route('admin.galeri.index')}>
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

						{/* >>> Upload >>> */}
						{watch('jenis') === 'foto' ? (
							<StyledInput label='Foto' error={errors.foto?.message}>
								<Input type='file' accept='image/png,image/jpeg,video/mp4' {...register('foto')} className='w-auto' />
							</StyledInput>
						) : (
							<TextInput
								label='Link'
								idProps={{ ...register('link_youtube') }}
								idError={errors.link_youtube?.message}
								en={false}
							/>
						)}
						{/* <<< Upload <<< */}

						{/* >>> Album >>> */}
						<StyledInput label='Album' error={errors.album_id?.message}>
							{albums && albums.length > 0 ? (
								<Select
									defaultValue={String(albumId)}
									onValueChange={(v) => {
										setValue('album_id', Number(v));
										trigger('album_id');
									}}
								>
									<SelectTrigger className='w-full max-w-[10rem]'>
										<SelectValue placeholder='Pilih album' />
									</SelectTrigger>
									<SelectContent>
										{albums.map((a, i) => (
											<SelectItem key={i} value={String(a.id)}>
												{a.nama}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							) : (
								<p>Buat album terlebih dahulu</p>
							)}
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
