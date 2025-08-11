import MyEditor from '@/components/editor/Editor';
import { Link } from '@inertiajs/react';
import { convertFromRaw, EditorState } from 'draft-js';
import { ArrowLeft } from 'lucide-react';
import { route } from 'ziggy-js';

export default function BeritaDetailPage({ berita }: { berita: News }) {
	const contentState = convertFromRaw(JSON.parse(berita.konten));
	const editorState = EditorState.createWithContent(contentState);

	return (
		<div className='space-y-8 text-center md:text-start'>
			<Link href={route('publikasi.berita.index')} className='inline-flex gap-1'>
				<ArrowLeft />
				Kembali
			</Link>
			<h6 className='text-center text-2xl leading-normal capitalize md:text-4xl lg:text-5xl'>{berita.judul}</h6>
			<div className='mx-auto aspect-video h-[300px]'>
				<img
					src={`/storage/${berita.gambar_cover}`}
					alt={berita.judul}
					className='h-full w-full object-cover object-center'
				/>
			</div>
			<MyEditor editorState={editorState} onChange={() => {}} readOnly />
		</div>
	);
}
