export default function Direktur() {
	return (
		<div className='flex flex-row gap-8'>
			<div className='flex-none w-[20rem] h-[20rem] rounded-2xl border-6 border-bumdes-dark-blue overflow-hidden'>
				<img src='/assets/test.jpg' alt='' className='w-full h-full object-cover' />
			</div>

			<div className='space-y-8'>
				<p className='text-5xl'>Direktur</p>
				<p className='text-6xl text-bumdes-primary font-bold'>Ajik BUMDES</p>
			</div>
		</div>
	);
}
