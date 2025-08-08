import DeleteModal from '@/components/modals/DeleteModal';
import { DataTable } from '@/components/table/DataTable';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';
import { deleteStructure, getStructures } from '@/lib/data/struktur';
import { Link } from '@inertiajs/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Pencil, Plus } from 'lucide-react';
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';
import { useCallback, useMemo } from 'react';
import { useToggle } from 'react-use';
import { route } from 'ziggy-js';

export default function index() {
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

	const { data, isLoading } = useQuery({
		queryKey: ['structures'],
		queryFn: () => getStructures(),
		throwOnError: true,
	});

	const filteredData = useMemo(() => {
		if (!data?.data) return [];
		if (!queryParams.q) return data.data;

		const search = queryParams.q.toLowerCase();

		return data.data.filter(
			(item: Structure) => item.nama.toLowerCase().includes(search) || item.jabatan.toLowerCase().includes(search)
		);
	}, [data, queryParams.q]);

	const paginatedData = useMemo(() => {
		const offset = (queryParams.page - 1) * queryParams.limit;

		return filteredData.slice(offset, offset + queryParams.limit);
	}, [filteredData, queryParams.page, queryParams.limit]);

	const mutation = useMutation({
		mutationFn: (id: number) => deleteStructure(id),
		onSuccess: () => {
			table.resetRowSelection();
			queryClient.invalidateQueries({ queryKey: ['structures'] });
			toast({
				title: 'Success',
				description: 'Berhasil menghapus struktur',
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

	const columns = useMemo<ColumnDef<Structure>[]>(
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
				accessorKey: 'nama',
				header: 'Nama',
			},
			{
				accessorKey: 'jabatan',
				header: 'Jabatan',
			},
			{
				accessorKey: 'foto',
				header: 'Foto',
				cell: ({ row }) => (
					<img
						src={`/storage/` + row.original.foto}
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
					return (
						<div className='flex'>
							<Link href={route('admin.struktur.edit', { id: row.original.id })}>
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
		<section className='min-h-screen w-full px-4 sm:px-6 md:px-8 lg:pl-72'>
			<div className='grid overflow-auto py-10'>
				<div className='mt-10 flex items-center justify-end'>
					<Link href={route('admin.struktur.create')} className='mr-auto'>
						<Button className='space-x-1'>
							<Plus />
							<span>Tambah struktur</span>
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
	);
}
