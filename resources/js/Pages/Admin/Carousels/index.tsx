import DeleteModal from '@/components/modals/DeleteModal';
import { DataTable } from '@/components/table/DataTable';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';
import { deleteCarousel, getCarousels } from '@/lib/data/carousels';
import { Link } from '@inertiajs/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Pencil, Plus } from 'lucide-react';
import { parseAsInteger, useQueryStates } from 'nuqs';
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
		},
		{
			history: 'push',
			clearOnDefault: true,
		}
	);

	const { data, isLoading } = useQuery({
		queryKey: ['carousels'],
		queryFn: () => getCarousels(),
		throwOnError: true,
	});

	const paginatedData = useMemo(() => {
		if (!data?.data) return [];

		const offset = (queryParams.page - 1) * queryParams.limit;

		return data.data.slice(offset, offset + queryParams.limit);
	}, [data, queryParams.page, queryParams.limit]);

	const mutation = useMutation({
		mutationFn: (id: number) => deleteCarousel(id),
		onSuccess: () => {
			table.resetRowSelection();
			queryClient.invalidateQueries({ queryKey: ['carousels'] });
			toast({
				title: 'Success',
				description: 'Berhasil menghapus carousel',
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

	const columns = useMemo<ColumnDef<Carousel>[]>(
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
				accessorKey: 'image',
				header: 'Gambar',
				cell: ({ row }) => (
					<img
						src={`/storage/` + row.original.image}
						alt={row.original.image}
						className='mx-auto aspect-video h-24 object-cover'
					/>
				),
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
			pagination: {
				pageSize: queryParams.limit,
				pageIndex: queryParams.page - 1,
			},
		},
		manualPagination: true,
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
					<Link href={route('admin.carousels.create')} className='mr-auto'>
						<Button className='space-x-1'>
							<Plus />
							<span>Tambah carousel</span>
						</Button>
					</Link>
				</div>

				<DataTable
					table={table}
					canNextPage={data?.data && data.data.length > queryParams.page * queryParams.limit}
					canPrevPage={data?.data && queryParams.page !== 1}
					nextPage={nextPage}
					prevPage={prevPage}
					isLoading={isLoading}
					showSearchField={false}
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
