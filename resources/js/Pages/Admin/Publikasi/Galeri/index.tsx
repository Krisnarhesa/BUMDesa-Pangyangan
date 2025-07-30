import { Button } from '@/components/ui/button';
import { getGalleryItems } from '@/lib/data/galeri';
import { DateFormat } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { Pencil } from 'lucide-react';
import { parseAsInteger, useQueryStates } from 'nuqs';
import { useMemo } from 'react';

export default function index() {
	const [queryParams, setQueryParams] = useQueryStates(
		{
			page: parseAsInteger.withDefault(1),
			limit: parseAsInteger.withDefault(20),
		},
		{
			history: 'push',
			clearOnDefault: true,
		}
	);

	const { data, isLoading } = useQuery({
		queryKey: ['gallery-items'],
		queryFn: () => getGalleryItems(),
	});

	const columns = useMemo<ColumnDef<AlbumItem>[]>(
		() => [
			{
				id: '#',
				header: 'No',
				cell: ({ row }) => (queryParams.page - 1) * queryParams.limit + row.index + 1,
			},
			{
				accessorKey: 'id',
				header: 'ID',
				enableHiding: false,
				cell: ({ row }) => <span>ID {row.original.id}</span>,
			},
			{
				accessorKey: 'createdAt',
				header: 'Tanggal dibuat',
				cell: ({ row }) => {
					return DateFormat(new Date(row.original.createdAt).toISOString());
				},
			},
			{
				accessorKey: 'nama',
				header: 'Nama',
			},
			{
				accessorKey: 'preview',
				header: 'Preview',
				cell: ({ row }) => (
					<div>
						{row.original.jenis === 'foto' ? (
							<img src={row.original.foto} alt={row.original.nama} className='h-full w-full object-cover' />
						) : (
							<iframe
								src={row.original.link_youtube}
								className='aspect-video'
								title={row.original.nama}
								frameBorder='0'
								allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
								referrerPolicy='strict-origin-when-cross-origin'
								allowFullScreen
							></iframe>
						)}
					</div>
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
					const item = row.original;

					return (
						<div className='flex'>
							<Button size={'icon'} variant={'ghost'} className='text-cyan-500 hover:text-cyan-600' onClick={() => {}}>
								<Pencil size={20} />
							</Button>
						</div>
					);
				},
				enableHiding: false,
			},
		],
		[queryParams.page, queryParams.limit]
	);

	return <div>index</div>;
}
