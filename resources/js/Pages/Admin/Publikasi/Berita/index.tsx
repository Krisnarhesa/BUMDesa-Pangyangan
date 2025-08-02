import { DataTable } from '@/components/table/DataTable';
import { Button } from '@/components/ui/button';
import { getNews } from '@/lib/data/news';
import { DateFormat } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Pencil, Plus } from 'lucide-react';
import { parseAsInteger, useQueryStates } from 'nuqs';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { route } from 'ziggy-js';

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
	const [offset, setOffset] = useState((queryParams.page - 1) * queryParams.limit);

	useEffect(() => {
		setOffset((queryParams.page - 1) * queryParams.limit);
	}, [queryParams, setOffset]);

	const { data, isLoading } = useQuery({
		queryKey: ['news'],
		queryFn: () => getNews(),
		throwOnError: true,
	});

	const columns = useMemo<ColumnDef<News>[]>(
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
				accessorKey: 'created_at',
				header: 'Tanggal dibuat',
				cell: ({ row }) => {
					return DateFormat(new Date(row.original.created_at).toISOString());
				},
			},
			{
				accessorKey: 'judul',
				header: 'Judul',
			},
			{
				accessorKey: 'kategori_nama',
				header: 'Kategori',
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

	const table = useReactTable({
		data: data?.data.berita.slice(offset, offset + queryParams.limit) ?? [],
		columns,
		getCoreRowModel: getCoreRowModel(),
		// onColumnVisibilityChange: setColumnVisibility,
		state: {
			// columnVisibility,
			// globalFilter: queryParams.q,
			pagination: {
				pageSize: queryParams.limit,
				pageIndex: queryParams.page - 1,
			},
		},
		manualPagination: true,
		// onGlobalFilterChange: (value) => {
		// 	if (value !== queryParams.q) {
		// 		setQueryParams((prevState) => ({
		// 			...prevState,
		// 			page: 1,
		// 			q: value,
		// 		}));
		// 	}
		// },
	});

	const nextPage = useCallback(() => {
		setQueryParams((prevState) => ({
			...prevState,
			page: prevState.page + 1,
		}));
	}, [data]);

	const prevPage = useCallback(() => {
		setQueryParams((prevState) => ({
			...prevState,
			page: prevState.page - 1,
		}));
	}, [data]);

	return (
		<section className='min-h-screen w-full px-4 sm:px-6 md:px-8 lg:pl-72'>
			<div className='grid overflow-auto py-10'>
				<div className='mt-10 flex items-center justify-end'>
					<Link href={route('admin.berita.create')} className='mr-auto'>
						<Button className='space-x-1'>
							<Plus />
							<span>Tambah berita</span>
						</Button>
					</Link>
				</div>

				<DataTable
					table={table}
					canNextPage={data && data.data.berita.length > queryParams.page * queryParams.limit}
					canPrevPage={data && queryParams.page !== 1}
					nextPage={nextPage}
					prevPage={prevPage}
					isLoading={isLoading}
					searchPlaceHolder='Searching with company name...'
					onPageLimitChange={(e) => {
						setQueryParams((prevState) => ({
							...prevState,
							limit: e,
							page: 1,
						}));
					}}
					selectables
					// onDelete={toggleDeleteModal}
				/>
			</div>
		</section>
	);
}
