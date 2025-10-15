import { useCallback, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
	getProductByCategory,
	getProducts,
	getProductsCategories,
	searchProducts,
} from '../../store/products-service/actions';
import { selectorGetProducts, selectorIsProductsLoading } from '../../store/products-service/selectors';
import { addToCart } from '../../store/cart-service/actions';

import { useListPagination } from '../../hooks/useListPagination';

import Pagination from '../../components/modules/Pagination';
import ProductCard from '../../components/modules/ProductCard';
import Filters from '../../components/templates/ProductsPage/Filters';

import type { CartProduct, Product, ProductCategory } from '../../types/products.type';

function ProductsPage() {
	const dispatch = useAppDispatch();
	const { products, total } = useAppSelector(selectorGetProducts);
	const isProductsLoading = useAppSelector(selectorIsProductsLoading);
	const { query, totalPages, currentPage, paginationRange, goToPage } = useListPagination(total);

	const [selectedCategory, setSelectedCategory] = useState<ProductCategory | undefined>();
	const [searchText, setSearchText] = useState<string>('');

	// Fetch categories once on mount
	useEffect(() => {
		dispatch(getProductsCategories())
			.unwrap()
			.catch(error => console.error('Error fetching categories:', error));
	}, [dispatch]);

	// Main data fetching effect with debounced search
	useEffect(() => {
		// Debounce the search
		if (searchText) {
			const timer = setTimeout(() => {
				dispatch(searchProducts({ ...query, q: searchText }))
					.unwrap()
					.catch(error => console.error('Error searching products:', error));
			}, 500);

			return () => clearTimeout(timer);
		}

		// Non-search requests
		const fetchProducts = async () => {
			if (searchText) return;

			try {
				if (selectedCategory) {
					await dispatch(
						getProductByCategory({
							category: selectedCategory.slug,
							...query,
						})
					).unwrap();
				} else {
					await dispatch(getProducts(query)).unwrap();
				}
			} catch (error) {
				console.error('Error fetching products:', error);
			}
		};

		fetchProducts();
	}, [dispatch, query.skip, selectedCategory?.slug, searchText]);

	const handleSearchChange = (text: string) => {
		// if try to search while some category is selected, clear the category (due to the api limits)
		if (selectedCategory) setSelectedCategory(undefined);

		setSearchText(text);
		goToPage(1);
	};

	const handleCategoryChange = (category: ProductCategory | undefined) => {
		// if try to select category while the search field is not empty,
		// clear the search text (due to the api limits)
		if (searchText) setSearchText('');

		setSelectedCategory(category);
		goToPage(1);
	};

	const handleAddToCart = useCallback(
		(product: Product) => {
			const { id, title, description, price, images, thumbnail } = product;
			// add to cart product with only important info
			const cartProduct = {
				id,
				title,
				description,
				price,
				images,
				thumbnail,
				...(product?.quantity && { quantity: product.quantity }),
			};
			dispatch(addToCart(cartProduct as CartProduct));
		},
		[dispatch]
	);

	return (
		<article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[94dvh]">
			<h1 className="text-4xl font-bold text-gray-900 mb-8">Products</h1>
			<section className="min-h-[81.2dvh] grid grid-cols-1 lg:grid-cols-4 gap-6">
				<div className="lg:col-span-1">
					<Filters
						searchText={searchText}
						onSearchChange={handleSearchChange}
						selectedCategory={selectedCategory}
						onCategoryChange={handleCategoryChange}
					/>
				</div>
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
								<ProductCard
									key={product.id}
									product={product}
									addToCart={handleAddToCart}
								/>
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
