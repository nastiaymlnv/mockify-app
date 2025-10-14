import type { Product, ProductCategory } from '../../types/products.type';

export interface ProductsState {
	products: Product[] | null;
	categories: ProductCategory[];
	total: number;
	isLoading: boolean;
}

export interface getProductsDto {
	limit: number;
	skip: number;
}

export interface getProductsResponse {
	total: number;
	skip: number;
	products: Product[];
}

export interface GetProductsByCategoryDto {
	category: string;
	limit: number;
	skip: number;
}

export interface GetProductsCategoriesResponse extends ProductCategory {
	url: string;
}

export interface SearchProductsDto extends getProductsDto {
	q: string; // name of param in api
}
