import type { FC } from 'react';

import { useAppSelector } from '../../../../store/hooks';
import { selectorGetProductsCategories } from '../../../../store/products-service/selectors';

import type { ProductCategory } from '../../../../types/products.type';

interface FiltersProps {
	searchText: string;
	onSearchChange: (text: string) => void;
	selectedCategory?: ProductCategory;
	onCategoryChange: (category: ProductCategory | undefined) => void;
}

const Filters: FC<FiltersProps> = ({ searchText, onSearchChange, selectedCategory, onCategoryChange }) => {
	const categories = useAppSelector(selectorGetProductsCategories);
	const hasActiveFilters = !!selectedCategory || !!searchText;

	const clearFilters = () => {
		onCategoryChange(undefined);
		onSearchChange('');
	};

	return (
		<article className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center space-x-2">
					<h2 className="text-lg font-semibold text-gray-900">Filters</h2>
				</div>
				{hasActiveFilters && (
					<button
						onClick={clearFilters}
						className="cursor-pointer text-sm text-emerald-600 hover:text-emerald-700 font-medium space-x-1"
					>
						Clear
					</button>
				)}
			</div>
			<div className="space-y-6">
				{/* Filter by entered text */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-3">Search</label>
					<input
						type="text"
						value={searchText}
						onChange={e => onSearchChange(e.target.value)}
						placeholder="Search products..."
						className="focus:outline-none w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
					/>
				</div>
				{/* Filter by category  */}
				<section>
					<label className="block text-sm font-medium text-gray-700 mb-3">Category</label>
					<div className="space-y-2 max-h-80 overflow-y-auto">
						{categories.map(category => (
							<button
								key={category.slug}
								onClick={() => onCategoryChange(category)}
								className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
									selectedCategory === category
										? 'bg-emerald-50 text-emerald-700 font-medium border border-emerald-200'
										: 'cursor-pointer text-gray-700 hover:bg-gray-50 border border-transparent'
								}`}
							>
								{category.name}
							</button>
						))}
					</div>
				</section>
			</div>
		</article>
	);
};

export default Filters;
