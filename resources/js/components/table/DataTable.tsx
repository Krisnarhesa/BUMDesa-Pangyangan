import { flexRender } from '@tanstack/react-table';

import type { Table as TableType } from '@tanstack/react-table';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import DebouncedInput from '../input/DebouncedInput';
import { Loader2, SlidersHorizontal, Trash } from 'lucide-react';
import CustomPagination from '../button/CustomPagination';

interface DataTableProps<TValue> {
	table: TableType<TValue>;
	canNextPage?: boolean | null;
	canPrevPage?: boolean | null;
	nextPage?: () => void;
	prevPage?: () => void;
	isLoading: boolean;
	showSearchField?: boolean;
	searchPlaceHolder?: string;
	selectables?: boolean;
	onDelete?: () => void;
	is_number_pagination?: boolean;
	totalItems?: number;
	currentPage?: number;
	onPageChange?: (newPage: number) => void;
	pageRange?: number;
	onPageLimitChange?: (newPage: number) => void;
	showPageLimit?: boolean;
}

export function DataTable<TValue>({
	table,
	canNextPage,
	canPrevPage,
	nextPage,
	prevPage,
	isLoading = false,
	showSearchField = true,
	searchPlaceHolder = 'Search emails...',
	selectables = false,
	onDelete,
	is_number_pagination = false,
	totalItems,
	currentPage,
	onPageChange,
	pageRange,
	onPageLimitChange,
	showPageLimit = true,
}: DataTableProps<TValue>) {
	return (
		<div className='w-full overflow-auto'>
			<div className='flex items-center justify-between'>
				{/* Search field */}
				{showSearchField && (
					<div className='flex w-full items-center py-4'>
						<DebouncedInput
							value={table.getState().globalFilter ?? ''}
							placeholder={searchPlaceHolder}
							onChange={(event) => table.setGlobalFilter(String(event))}
							className='max-w-sm'
							type='search'
						/>
					</div>
				)}
				{/* Toggle column view dropdown */}
				<div className='flex items-center py-4'>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant='outline' className='ml-auto space-x-1'>
								<SlidersHorizontal className='mr-2 h-4 w-4' />
								<span>View</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align='end'>
							<DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
							<DropdownMenuSeparator />
							{table
								.getAllColumns()
								.filter((column) => column.getCanHide())
								.map((column) => {
									return (
										<DropdownMenuCheckboxItem
											key={column.id}
											className='capitalize'
											checked={column.getIsVisible()}
											onCheckedChange={(value) => column.toggleVisibility(!!value)}
										>
											{column.columnDef.header?.toString()}
										</DropdownMenuCheckboxItem>
									);
								})}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
			{selectables && onDelete && (
				<div className='my-1 flex items-center gap-3'>
					{table.getFilteredSelectedRowModel().rows.length > 0 && (
						<>
							<div>
								<span className='w-fit flex-1 px-1 text-sm text-gray-500'>
									{table.getFilteredSelectedRowModel().rows.length} entries selected.
								</span>
							</div>
							<div className='flex items-center gap-1'>
								<Button
									variant={'ghost'}
									size={'sm'}
									onClick={() => table.resetRowSelection()}
									className='h-6 text-gray-600'
								>
									Clear selection
								</Button>
								<Button
									variant={'ghost'}
									size={'sm'}
									onClick={onDelete}
									className='h-6 gap-1 text-red-700 hover:bg-rose-100 hover:text-red-800'
								>
									<Trash size={15} />
									<span>Delete</span>
								</Button>
							</div>
						</>
					)}
				</div>
			)}
			<div className='rounded-lg border bg-white'>
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id} colSpan={header.colSpan}>
											{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					{!isLoading && (
						<TableBody>
							{table.getRowModel().rows?.length ? (
								table.getRowModel().rows.map((row) => (
									<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
										))}
									</TableRow>
								))
							) : (
								<TableRow>
									<TableCell
										colSpan={
											table.getHeaderGroups().length > 1
												? table.getAllFlatColumns().length
												: table.getAllColumns().length
										}
										className='h-24 text-center'
									>
										No data found.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					)}
				</Table>
				{isLoading && (
					<div className='flex justify-center p-10'>
						<Loader2 className='mr-2 h-10 w-10 animate-spin' />
					</div>
				)}
			</div>

			<div className='flex flex-wrap items-center justify-end gap-3'>
				{showPageLimit && (
					<Select
						onValueChange={(e) => {
							table.setPageSize(Number(e));
							onPageLimitChange && onPageLimitChange(Number(e));
						}}
						value={table.getState().pagination.pageSize.toString()}
					>
						<SelectTrigger className='w-[7rem]'>
							<SelectValue placeholder='Theme' />
						</SelectTrigger>
						<SelectContent>
							{[5, 10, 20, 30].map((pageSize) => (
								<SelectItem key={pageSize} value={pageSize.toString()}>
									Show {pageSize}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				)}

				{is_number_pagination ? (
					<div className='flex justify-end py-4'>
						<CustomPagination
							currentPage={currentPage}
							totalItems={totalItems}
							onPageChange={onPageChange}
							pageRange={pageRange}
						/>
					</div>
				) : (
					<div className='flex items-center justify-end space-x-2 py-4'>
						<Button variant='outline' size='sm' onClick={prevPage} disabled={!canPrevPage}>
							Previous
						</Button>
						<Button variant='outline' size='sm' onClick={nextPage} disabled={!canNextPage}>
							Next
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}
