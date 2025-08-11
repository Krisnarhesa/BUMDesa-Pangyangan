import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

export default function GaleriAlbumPage({ albumItems }: { albumItems: AlbumItem[] }) {
	console.log(albumItems);

	return (
		<>
			<div className='grid w-full grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-4'>
				{albumItems.length > 0
					? albumItems.map((item, i) => (
							<Dialog key={i}>
								<div className='h-min w-full overflow-hidden rounded-lg'>
									{item.jenis === 'foto' ? (
										<DialogTrigger asChild className='cursor-pointer'>
											<img src={`/storage/${item.foto}`} alt={item.judul} className='h-full w-full object-cover' />
										</DialogTrigger>
									) : (
										<iframe
											src={item.link_youtube}
											className='aspect-video'
											title={item.judul}
											frameBorder='0'
											allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
											referrerPolicy='strict-origin-when-cross-origin'
											allowFullScreen
										></iframe>
									)}
								</div>

								<DialogContent className='w-full max-w-4xl pt-12'>
									<img src={item.foto} alt={item.judul} />
								</DialogContent>
							</Dialog>
						))
					: 'Kosong'}
			</div>
		</>
	);
}
