import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

export default function GaleriAlbumPage({ albumItems }: { albumItems: AlbumItem[] }) {
	return (
		<div className='grid w-full grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-4'>
			{albumItems.length > 0
				? albumItems.map((item, i) => (
						<Dialog key={i}>
							<div className='w-full overflow-hidden rounded-lg'>
								{item.jenis === 'foto' ? (
									<DialogTrigger asChild className='cursor-pointer'>
										<img src={`/storage/${item.foto}`} alt={item.judul} className='h-full w-full object-cover' />
									</DialogTrigger>
								) : (
									<iframe
										src={item.link_youtube}
										className='aspect-square h-full w-full'
										title={item.judul}
										frameBorder='0'
										allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
										referrerPolicy='strict-origin-when-cross-origin'
										allowFullScreen
									></iframe>
								)}
							</div>

							<DialogContent className='w-full max-w-4xl pt-12'>
								<img src={`/storage/${item.foto}`} alt={item.judul} className='mx-auto' />
							</DialogContent>
						</Dialog>
					))
				: 'Kosong'}
		</div>
	);
}
