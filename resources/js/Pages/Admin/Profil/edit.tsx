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
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import { useEffect, useState } from 'react';
import MyEditor from '@/components/editor/Editor';
import { emptyContent } from '@/lib/draft-js/styles';

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

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		trigger,
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

	// Deskripsi editor
	const contentState = deskripsi ? convertFromRaw(JSON.parse(deskripsi)) : convertFromRaw(emptyContent);
	const [editorState, setEditorState] = useState(EditorState.createWithContent(contentState));
	const onChange = (state: EditorState) => setEditorState(state);

	useEffect(() => {
		const rawContentState = convertToRaw(editorState.getCurrentContent());
		setValue('deskripsi', JSON.stringify(rawContentState));
		trigger('deskripsi');
	}, [editorState]);

	// Visi editor
	const visiContentState = visi ? convertFromRaw(JSON.parse(visi)) : convertFromRaw(emptyContent);
	const [visiEditorState, setVisiEditorState] = useState(EditorState.createWithContent(visiContentState));
	const onVisiChange = (state: EditorState) => setVisiEditorState(state);

	useEffect(() => {
		const rawContentState = convertToRaw(visiEditorState.getCurrentContent());
		setValue('visi', JSON.stringify(rawContentState));
		trigger('visi');
	}, [visiEditorState]);

	// Misi editor
	const misiContentState = misi ? convertFromRaw(JSON.parse(misi)) : convertFromRaw(emptyContent);
	const [misiEditorState, setMisiEditorState] = useState(EditorState.createWithContent(misiContentState));
	const onMisiChange = (state: EditorState) => setMisiEditorState(state);

	useEffect(() => {
		const rawContentState = convertToRaw(misiEditorState.getCurrentContent());
		setValue('misi', JSON.stringify(rawContentState));
		trigger('misi');
	}, [misiEditorState]);

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

						{/* >>> Editor deskripsi >>> */}
						<StyledInput label='Konten' error={errors.deskripsi?.message}>
							<MyEditor editorState={editorState} onChange={onChange} />
						</StyledInput>
						{/* <<< Editor deskripsi <<< */}

						{/* >>> Editor visi >>> */}
						<StyledInput label='Visi' error={errors.visi?.message}>
							<MyEditor editorState={visiEditorState} onChange={onVisiChange} />
						</StyledInput>
						{/* <<< Editor visi <<< */}

						{/* >>> Editor misi >>> */}
						<StyledInput label='Misi' error={errors.misi?.message}>
							<MyEditor editorState={misiEditorState} onChange={onMisiChange} />
						</StyledInput>
						{/* <<< Editor misi <<< */}

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
