import { useMemo } from 'react';
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '../ui/pagination';

interface PaginationProps {
	totalItems?: number;
	currentPage?: number;
	onPageChange?: (newPage: number) => void;
	pageRange?: number;
}

const CustomPagination: React.FC<PaginationProps> = ({
	totalItems = 0,
	currentPage = 1,
	onPageChange = (newPage: number) => {},
	pageRange = 5,
}) => {
	const totalPages = useMemo(() => Math.ceil(totalItems / pageRange), [totalItems, pageRange]);

	const pageNumbers = useMemo(() => Array.from({ length: totalPages }, (_, i) => i + 1), [totalPages]);

	const handleClick = (page: number) => {
		onPageChange(page);
	};

	const handlePrevious = () => {
		if (currentPage > 1) {
			onPageChange(currentPage - 1);
		}
	};

	const handleNext = () => {
		if (currentPage < totalPages) {
			onPageChange(currentPage + 1);
		}
	};

	const renderPagination = () => {
		const halfVisiblePages = Math.floor(pageRange / 2);
		let start = 1; // Always start from the first page
		let end = totalPages; // Always end at the last page

		if (totalPages > pageRange) {
			start = Math.max(1, currentPage - halfVisiblePages);
			end = Math.min(totalPages, start + pageRange - 1);

			if (end - start + 1 < pageRange) {
				start = Math.max(1, end - pageRange + 1);
			}
		}

		const pages = pageNumbers.slice(start - 1, end);

		const paginationItems = pages.map((page) => (
			<PaginationLink
				key={`page-data-${page}`}
				onClick={() => handleClick(page)}
				isActive={currentPage === page}
				className='cursor-pointer'
			>
				{page}
			</PaginationLink>
		));

		if (start > 1) {
			paginationItems.unshift(
				<PaginationLink
					key='page-1'
					onClick={() => handleClick(1)}
					className='cursor-pointer'
					isActive={currentPage === 1}
				>
					1
				</PaginationLink>
			);
			if (start > 2) {
				paginationItems.splice(1, 0, <PaginationEllipsis key={`page-ellipsis-1`} />);
			}
		}

		if (end < totalPages) {
			if (end < totalPages - 1) {
				paginationItems.push(<PaginationEllipsis key={`page-ellipsis-${totalPages}`} />);
			}
			paginationItems.push(
				<PaginationLink key={`page-${totalPages}`} onClick={() => handleClick(totalPages)} className='cursor-pointer'>
					{totalPages}
				</PaginationLink>
			);
		}

		return paginationItems;
	};

	return (
		<Pagination>
			<PaginationContent className='flex flex-wrap'>
				<PaginationPrevious onClick={handlePrevious} className='cursor-pointer' aria-label='prev button' />

				{renderPagination()}

				<PaginationNext onClick={handleNext} className='cursor-pointer' aria-label='next button' />
			</PaginationContent>
		</Pagination>
	);
};

export default CustomPagination;
