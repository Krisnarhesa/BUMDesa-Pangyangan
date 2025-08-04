import { DataTable } from '@/components/table/DataTable';
import { Button } from '@/components/ui/button';
import { getUnitUsahaProduk } from '@/lib/data/unit-produk';
import { Link } from '@inertiajs/react';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { ChevronLeft, Pencil, Plus } from 'lucide-react';
import { parseAsInteger, useQueryStates } from 'nuqs';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { route } from 'ziggy-js';

export default function index({ id }: { id: string }) {
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
		queryKey: ['products', id],
		queryFn: () => getUnitUsahaProduk(Number(id)),
		throwOnError: true,
	});

	const columns = useMemo<ColumnDef<UnitUsahaProduk>[]>(
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
				accessorKey: 'nama',
				header: 'Nama',
			},
			{
				accessorKey: 'harga',
				header: 'Harga',
			},
			{
				accessorKey: 'gambar',
				header: 'Gambar',
				cell: ({ row }) => (
					<img
						src={`/storage/` + row.original.gambar}
						alt={row.original.nama}
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
					const unit = row.original;

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
		data: data?.data.slice(offset, offset + queryParams.limit) ?? [],
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
		<>
			<header className='sticky inset-x-0 top-0 z-[48] flex w-full flex-wrap border-b bg-white py-2.5 text-sm sm:flex-nowrap sm:justify-start sm:py-4 lg:pl-64'>
				<div className='flex w-full items-center justify-between px-10'>
					<div className='flex items-center gap-3'>
						<Button size={'sm'} variant={'ghost'} asChild>
							<Link href={route('admin.unit.index')}>
								<ChevronLeft />
							</Link>
						</Button>
						<p className='text-lg'>Produk</p>
					</div>
				</div>
			</header>
			<section className='min-h-screen w-full px-4 sm:px-6 md:px-8 lg:pl-72'>
				<div className='grid overflow-auto py-10'>
					<div className='mt-10 flex items-center justify-end'>
						<Link href={route('admin.unit.produk.create', { id: id })} className='mr-auto'>
							<Button className='space-x-1'>
								<Plus />
								<span>Tambah produk</span>
							</Button>
						</Link>
					</div>

					<DataTable
						table={table}
						canNextPage={data && data.data.length > queryParams.page * queryParams.limit}
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
		</>
	);
}
