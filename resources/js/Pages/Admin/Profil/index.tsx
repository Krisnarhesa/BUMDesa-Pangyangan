import { DataTable } from '@/components/table/DataTable';
import { Button } from '@/components/ui/button';
import { getProfile } from '@/lib/data/profil';
import { Link } from '@inertiajs/react';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Pencil } from 'lucide-react';
import { useMemo } from 'react';
import { route } from 'ziggy-js';

export default function index() {
	const { data, isLoading } = useQuery({
		queryKey: ['profile'],
		queryFn: () => getProfile(),
		throwOnError: true,
	});

	const columns = useMemo<ColumnDef<Profile>[]>(
		() => [
			{
				accessorKey: 'nama_bumdes',
				header: 'Nama',
			},
			{
				accessorKey: 'telp',
				header: 'Telp',
			},
			{
				accessorKey: 'email',
				header: 'Email',
			},
			{
				accessorKey: 'alamat',
				header: 'Alamat',
			},
			{
				accessorKey: 'logo',
				header: 'Logo',
				cell: ({ row }) => (
					<img
						src={`/storage/` + row.original.logo}
						alt={row.original.nama_bumdes}
						className='mx-auto aspect-video h-24 object-cover'
					/>
				),
			},
			{
				id: 'action',
				header: () => {
					return (
						<div className='relative'>
							<span className='sr-only'>Action</span>
						</div>
					);
				},
				cell: ({ row }) => {
					const profil = row.original;

					return (
						<div className='flex'>
							<Link href={route('admin.profil.edit', { id: profil.id })}>
								<Button
									size={'icon'}
									variant={'ghost'}
									className='text-cyan-500 hover:text-cyan-600'
									onClick={() => {}}
								>
									<Pencil size={20} />
								</Button>
							</Link>
						</div>
					);
				},
				enableHiding: false,
			},
		],
		[]
	);

	const table = useReactTable({
		data: data?.data ? [data.data] : [],
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<section className='min-h-screen w-full px-4 sm:px-6 md:px-8 lg:pl-72'>
			<div className='grid overflow-auto py-10'>
				<DataTable table={table} isLoading={isLoading} showSearchField={false} showPageLimit={false} />
			</div>
		</section>
	);
}
