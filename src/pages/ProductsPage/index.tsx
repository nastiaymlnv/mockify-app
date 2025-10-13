import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getPaginatedProducts } from '../../store/products-service/actions';
import { selectorIsProductsLoading, selectorGetPaginatedProducts } from '../../store/products-service/selectors';

import { useListPagination } from '../../hooks/useListPagination';

import ProductCard from '../../components/modules/ProductCard';
import Pagination from '../../components/modules/Pagination';

function ProductsPage() {
	const dispatch = useAppDispatch();
	const { products, total } = useAppSelector(selectorGetPaginatedProducts);
	const isProductsLoading = useAppSelector(selectorIsProductsLoading);
	const { query, totalPages, currentPage, paginationRange, goToPage } = useListPagination(total);

	const fetchProductsList = async () => {
		try {
			await dispatch(getPaginatedProducts(query));
		} catch (error) {
			console.error('Error fetching products:', error);
		}
	};

	useEffect(() => {
		fetchProductsList();
	}, [query]);

	return (
		<article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[94dvh]">
			<h1 className="text-4xl font-bold text-gray-900 mb-8">Products</h1>
			<section className="min-h-[81.2dvh] grid grid-cols-1 lg:grid-cols-4 gap-6">
				<div className="lg:col-span-1">Mocked filters block</div>
				<div className="lg:col-span-3">
					{/* If is loading, show the loader. If is empty, show the empty message, else the list */}
					{isProductsLoading ? (
						<div className="h-full flex flex-col items-center justify-center py-16 text-center">
							<p className="text-gray-600 text-center">Loading products...</p>
						</div>
					) : !products?.length ? (
						<div className="h-full flex flex-col items-center justify-center py-16 text-center">
							<h3 className="text-xl font-semibold text-gray-900">No products found</h3>
						</div>
					) : (
						<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
							{products.map(product => (
								<ProductCard key={product.id} product={product} />
							))}
						</div>
					)}
				</div>
				<div className="lg:col-span-4 lg:col-start-2 self-end">
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						totalItems={total}
						paginationRange={paginationRange}
						goToPage={goToPage}
					/>
				</div>
			</section>
		</article>
	);
}

export default ProductsPage;
