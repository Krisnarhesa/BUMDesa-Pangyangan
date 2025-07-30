export default function BeritaDetailPage({ berita }: { berita: News }) {
	return (
		<div className='space-y-8 text-center md:text-start'>
			<h6 className='text-2xl leading-normal capitalize md:text-4xl lg:text-5xl'>{berita.judul}</h6>
			<div className='mx-auto aspect-video h-[300px]'>
				<img src={berita.gambar_cover} alt={berita.judul} className='object-cover object-center' />
			</div>
			<p>{berita.konten}</p>
		</div>
	);
}
