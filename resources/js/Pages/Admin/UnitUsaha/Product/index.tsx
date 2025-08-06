import DeleteModal from '@/components/modals/DeleteModal';
import { DataTable } from '@/components/table/DataTable';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';
import { deleteUnitProduct, getUnitUsahaProduk } from '@/lib/data/unit-produk';
import { IDRFormat } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { ChevronLeft, Pencil, Plus } from 'lucide-react';
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useToggle } from 'react-use';
import { route } from 'ziggy-js';

export default function index({ id }: { id: string }) {
	const queryClient = useQueryClient();
	const [deleteModal, toggleDeleteModal] = useToggle(false);
	const [queryParams, setQueryParams] = useQueryStates(
		{
			page: parseAsInteger.withDefault(1),
			limit: parseAsInteger.withDefault(20),
			q: parseAsString.withDefault(''),
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

	const filteredData = useMemo(() => {
		if (!data?.data) return [];
		if (!queryParams.q) return data.data;

		const search = queryParams.q.toLowerCase();

		return data.data.filter((item: UnitUsahaProduk) => item.nama.toLowerCase().includes(search));
	}, [data, queryParams.q]);

	const paginatedData = useMemo(() => {
		const offset = (queryParams.page - 1) * queryParams.limit;

		return filteredData.slice(offset, offset + queryParams.limit);
	}, [filteredData, queryParams.page, queryParams.limit]);

	const mutation = useMutation({
		mutationFn: (id: number) => deleteUnitProduct(id),
		onSuccess: () => {
			table.resetRowSelection();
			queryClient.invalidateQueries({ queryKey: ['products', id] });
			toast({
				title: 'Success',
				description: 'Berhasil menghapus produk',
				duration: 5000,
			});
		},
		onError: (error) => {
			toast({
				title: 'Error',
				description: error.message,
				duration: 5000,
				variant: 'destructive',
			});
		},
	});

	const onDeleteHandler = () => {
		toggleDeleteModal();
		table.getFilteredSelectedRowModel().rows.forEach((item) => {
			mutation.mutate(item.original.id);
		});
	};

	const columns = useMemo<ColumnDef<UnitUsahaProduk>[]>(
		() => [
			{
				id: 'select',
				header: ({ table }) => (
					<Checkbox
						checked={table.getIsAllPageRowsSelected()}
						onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
						aria-label='Select all'
					/>
				),
				cell: ({ row }) => (
					<Checkbox
						checked={row.getIsSelected()}
						onCheckedChange={(value) => row.toggleSelected(!!value)}
						aria-label='Select row'
					/>
				),
				enableSorting: false,
				enableHiding: false,
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
				cell: ({ row }) => <span>{IDRFormat(row.original.harga)}</span>,
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
					const product = row.original;

					return (
						<div className='flex'>
							<Link href={route('admin.unit.produk.edit', { unitId: product.unit_usaha_id, productId: product.id })}>
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
		[queryParams.page, queryParams.limit]
	);

	const table = useReactTable({
		data: paginatedData,
		columns,
		getCoreRowModel: getCoreRowModel(),
		state: {
			globalFilter: queryParams.q,
			pagination: {
				pageSize: queryParams.limit,
				pageIndex: queryParams.page - 1,
			},
		},
		manualPagination: true,
		onGlobalFilterChange: (value) => {
			if (value !== queryParams.q) {
				setQueryParams((prevState) => ({
					...prevState,
					page: 1,
					q: value,
				}));
			}
		},
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
						canNextPage={filteredData && filteredData.length > queryParams.page * queryParams.limit}
						canPrevPage={filteredData && queryParams.page !== 1}
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
						onDelete={toggleDeleteModal}
					/>
				</div>

				<DeleteModal
					open={deleteModal}
					onOpenChange={toggleDeleteModal}
					onDelete={onDeleteHandler}
					isLoading={mutation.isPending}
				/>
			</section>
		</>
	);
}
