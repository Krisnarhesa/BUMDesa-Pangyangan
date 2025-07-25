export default function Direktur() {
	return (
		<div className='flex flex-col items-center gap-8 md:flex-row md:items-start'>
			<div className='border-bumdes-dark-blue aspect-square h-full max-h-[20rem] w-full max-w-[20rem] flex-none basis-1/2 overflow-hidden rounded-2xl border-6'>
				<img src='/assets/test.jpg' alt='' className='h-full w-full object-cover' />
			</div>

			<p className='text-center text-2xl leading-normal md:text-start md:text-4xl lg:text-5xl'>
				Direktur <br />{' '}
				<span className='text-bumdes-primary text-3xl font-bold md:text-5xl lg:text-6xl'>Ajik BUMDES</span>
			</p>
		</div>
	);
}
