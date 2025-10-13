import { useMemo, type FC } from 'react';

import ArrowLeft from '../../../assets/icons/chevron_left.svg';
import ArrowRight from '../../../assets/icons/chevron_right.svg';

import { MAX_VISIBLE_PAGES } from '../../../constants/pagination-settings';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	totalItems: number;
	paginationRange: {
		itemMin: number;
		itemMax: number;
	};
	goToPage: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, totalItems, paginationRange, goToPage }) => {
	const getPageNumbers = useMemo((): (number | string)[] => {
		const pages = [];

		if (totalPages <= MAX_VISIBLE_PAGES) {
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			if (currentPage <= 3) {
				for (let i = 1; i <= 4; i++) pages.push(i);

				pages.push('...');
				pages.push(totalPages);
			} else if (currentPage >= totalPages - 2) {
				pages.push(1);
				pages.push('...');

				for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
			} else {
				pages.push(1);
				pages.push('...');

				for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);

				pages.push('...');
				pages.push(totalPages);
			}
		}

		return pages;
	}, [currentPage, totalPages]);

	const handlePrevClick = () => goToPage(currentPage - 1);
	const handleNextClick = () => goToPage(currentPage + 1);

	return (
		<div className="flex flex-col lg:flex-row items-center justify-between border-t border-gray-200 pt-6 mt-10 gap-2 lg:gap-0">
			<div className="text-sm text-gray-600">
				{`Showing ${paginationRange.itemMin}-${paginationRange.itemMax} of ${totalItems} products`}
			</div>
			<div className="flex items-center gap-2">
				<button
					onClick={handlePrevClick}
					disabled={currentPage === 1}
					className="cursor-pointer p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
				>
					<img src={ArrowLeft} alt="Previous page" className="w-5 h-5" />
				</button>

				{getPageNumbers.map((page, index) => (
					<button
						key={index}
						onClick={() => typeof page === 'number' && goToPage(page)}
						disabled={page === '...'}
						className={` min-w-[2.5rem] h-10 px-3 rounded-lg font-medium transition-colors ${
							page === currentPage
								? 'cursor-pointer bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95'
								: page === '...'
									? 'cursor-default text-gray-700'
									: 'cursor-pointer border border-gray-300 hover:bg-gray-50 text-gray-700'
						}`}
					>
						{page}
					</button>
				))}

				<button
					onClick={handleNextClick}
					disabled={currentPage === totalPages}
					className="cursor-pointer p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
				>
					<img src={ArrowRight} alt="Previous page" className="w-5 h-5" />
				</button>
			</div>
		</div>
	);
};

export default Pagination;
