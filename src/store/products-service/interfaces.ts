import type { Product } from '../../types/products.type';

export interface ProductsState {
	products: Product[] | null;
	total: number;
	isLoading: boolean;
}

export interface GetPaginatedProductsDto {
	limit: number;
	skip: number;
}

export interface GetPaginatedProductsResponse {
	total: number;
	skip: number;
	products: Product[];
}
