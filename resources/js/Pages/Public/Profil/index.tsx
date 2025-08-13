import MyEditor from '@/components/editor/Editor';
import { emptyContent } from '@/lib/draft-js/styles';
import { convertFromRaw, EditorState } from 'draft-js';

export default function Profil({ deskripsi }: { deskripsi: string }) {
	const contentState = deskripsi ? convertFromRaw(JSON.parse(deskripsi)) : convertFromRaw(emptyContent);
	const editorState = EditorState.createWithContent(contentState);

	return (
		<div>
			<div className='h-[100px] bg-slate-50'>
				<div className='mx-auto w-full max-w-6xl px-4 pt-6'>
					<p className='text-bumdes-dark-blue text-2xl font-bold'>Profil</p>
				</div>
			</div>

			<div className='mx-auto w-full max-w-6xl px-4 py-16'>
				{/* >>> Breadcrumb >>> */}
				<ol className='ml-3 flex min-w-0 items-center whitespace-nowrap' aria-label='Breadcrumb'>
					<li className='flex items-center text-gray-800'>
						BUMDes
						<svg
							className='mx-3 h-2.5 w-2.5 flex-shrink-0 overflow-visible text-gray-400'
							width='16'
							height='16'
							viewBox='0 0 16 16'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
							/>
						</svg>
					</li>
					<li className='truncate text-sm font-semibold text-gray-800' aria-current='page'>
						Profil
					</li>
				</ol>
				{/* <<< Breadcrumb <<< */}

				<div className='mt-16 flex w-full flex-col gap-8 md:flex-row'>
					<div className='basis-2/5'>
						<iframe
							src='https://www.youtube.com/embed/OLuAkdYlmqg?si=0ZsFEGXnF8VLlvf2'
							className='aspect-video w-full'
							title={'video profil BUMDes'}
							frameBorder='0'
							allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
							referrerPolicy='strict-origin-when-cross-origin'
							allowFullScreen
						></iframe>
					</div>

					<div className='basis-3/5'>
						<MyEditor editorState={editorState} onChange={() => {}} readOnly />
					</div>
				</div>
			</div>
		</div>
	);
}
