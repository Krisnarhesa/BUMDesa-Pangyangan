import TextInput from '@/components/input/TextInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useMutation } from '@tanstack/react-query';
import { AddGalleryItemSchema } from '@/lib/yup/schemas';
import { addGalleryItem } from '@/lib/data/gallery';
import { Button } from '@/components/ui/button';
import StyledInput from '@/components/input/StyledInput';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { route } from 'ziggy-js';

type Data = yup.InferType<typeof AddGalleryItemSchema>;

export default function create({ albums }: { albums: Album[] }) {
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
			jenis: 'foto',
			album_id: albums[0].id,
		},
		resolver: yupResolver(AddGalleryItemSchema),
	});

	const mutation = useMutation({
		mutationFn: (data: Data) => addGalleryItem(data),
		onSuccess: (data) => {
			toast({
				title: 'Success',
				description: data.message,
				duration: 5000,
			});
			window.location.replace(route('admin.galeri.index'));
		},
		onError: () => {
			toast({
				title: 'Error',
				description: 'Database error: Gagal menambahkan galeri',
				duration: 5000,
				variant: 'destructive',
			});
		},
	});

	const onSubmit: SubmitHandler<Data> = (data) => {
		mutation.mutate(data);
	};

	return (
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

					{/* >>> Jenis >>> */}
					<StyledInput label='Jenis'>
						<RadioGroup
							defaultValue='foto'
							onValueChange={(v) => {
								setValue('jenis', v);
								trigger('jenis');
							}}
						>
							<RadioGroupItem value='foto'>Foto</RadioGroupItem>
							<RadioGroupItem value='link'>Link Youtube</RadioGroupItem>
						</RadioGroup>
					</StyledInput>
					{/* <<< Jenis <<< */}

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
						<Select
							defaultValue={String(albums[0].id)}
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
										tes
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
	);
}
