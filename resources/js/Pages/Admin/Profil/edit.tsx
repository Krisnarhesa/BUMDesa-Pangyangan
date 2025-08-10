import TextInput from '@/components/input/TextInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { UpdateProfileSchema } from '@/lib/yup/schemas';
import { Button } from '@/components/ui/button';
import StyledInput from '@/components/input/StyledInput';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { route } from 'ziggy-js';
import { Link } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';
import { updateProfile } from '@/lib/data/profil';

import 'draft-js/dist/Draft.css';

type Data = yup.InferType<typeof UpdateProfileSchema>;

export default function edit({
	id,
	nama_bumdes,
	deskripsi,
	visi,
	misi,
	slogan,
	telp,
	email,
	alamat,
}: {
	id: number;
	nama_bumdes: string;
	deskripsi: string;
	visi: string;
	misi: string;
	slogan: string;
	telp: string;
	email: string;
	alamat: string;
}) {
	const { toast } = useToast();
	// const [visiEditorState, setVisiEditorState] = useState(() => EditorState.createEmpty());

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			nama_bumdes,
			deskripsi,
			visi,
			misi,
			slogan,
			telp,
			email,
			alamat,
		},
		resolver: yupResolver(UpdateProfileSchema),
	});

	const mutation = useMutation({
		mutationFn: (data: Data) => updateProfile(id, data),
		onSuccess: () => {
			toast({
				title: 'Success',
				description: 'Berhasil update profil',
				duration: 5000,
			});
			window.location.replace(route('admin.profil.index'));
		},
		onError: () => {
			toast({
				title: 'Error',
				description: 'Database error: Gagal edit profil',
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
							<Link href={route('admin.profil.index')}>
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
						<TextInput
							label='Nama BUMDes'
							idProps={{ ...register('nama_bumdes') }}
							idError={errors.nama_bumdes?.message}
							en={false}
						/>
						{/* <<< Nama <<< */}

						{/* >>> Logo >>> */}
						<StyledInput label='Logo' error={errors.logo?.message}>
							<Input type='file' accept='image/png,image/jpeg' {...register('logo')} className='w-auto' />
						</StyledInput>
						{/* <<< Logo <<< */}

						{/* >>> Deskripsi >>> */}
						<TextInput
							label='Deskripsi'
							idProps={{ ...register('deskripsi') }}
							idError={errors.deskripsi?.message}
							en={false}
						/>
						{/* <<< Deskripsi <<< */}

						{/* >>> Visi >>> */}
						<TextInput label='Visi' idProps={{ ...register('visi') }} idError={errors.visi?.message} en={false} />
						{/* <<< Visi <<< */}

						{/* >>> Misi >>> */}
						<TextInput label='Misi' idProps={{ ...register('misi') }} idError={errors.misi?.message} en={false} />
						{/* <<< Misi <<< */}

						{/* >>> Slogan >>> */}
						<TextInput label='Slogan' idProps={{ ...register('slogan') }} idError={errors.slogan?.message} en={false} />
						{/* <<< Slogan <<< */}

						{/* >>> Telp >>> */}
						<TextInput label='Telp' idProps={{ ...register('telp') }} idError={errors.telp?.message} en={false} />
						{/* <<< Telp <<< */}

						{/* >>> Email >>> */}
						<TextInput label='Email' idProps={{ ...register('email') }} idError={errors.email?.message} en={false} />
						{/* <<< Email <<< */}

						{/* >>> Alamat >>> */}
						<TextInput label='Alamat' idProps={{ ...register('alamat') }} idError={errors.alamat?.message} en={false} />
						{/* <<< Alamat <<< */}

						<Button className='rounded-md lg:ml-28' type='submit' isLoading={mutation.isPending}>
							Save
						</Button>
					</form>
				</div>
			</section>
		</>
	);
}
