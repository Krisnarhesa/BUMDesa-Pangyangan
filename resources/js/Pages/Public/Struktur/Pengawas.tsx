export default function Penasihat() {
	const supervisors = [
		{
			id: 1,
			name: 'Pengawas A',
		},
		{
			id: 2,
			name: 'Pengawas B',
		},
		{
			id: 3,
			name: 'Pengawas C',
		},
	];

	return (
		<div className='space-y-4'>
			{supervisors.map((s, i) => (
				<div key={i} className='flex flex-row gap-8'>
					<div className='flex-none w-[20rem] h-[20rem] rounded-2xl border-6 border-bumdes-dark-blue overflow-hidden'>
						<img src='/assets/test.jpg' alt='' className='w-full h-full object-cover' />
					</div>

					<div className='space-y-8'>
						<p className='text-5xl'>Pengawas</p>
						<p className='text-6xl text-bumdes-primary font-bold'>{s.name}</p>
					</div>
				</div>
			))}
		</div>
	);
}
