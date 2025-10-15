import type { BaseQueryType } from '../../types/base-query.type';
import type { Product, ProductCategory } from '../../types/products.type';

export interface ProductsState {
	products: Product[] | null;
	categories: ProductCategory[];
	total: number;
	isLoading: boolean;
}

export interface getProductsResponse {
	total: number;
	skip: number;
	products: Product[];
}

export interface GetProductsByCategoryDto extends BaseQueryType {
	category: string;
}

export interface GetProductsCategoriesResponse extends ProductCategory {
	url: string;
}

export interface SearchProductsDto extends BaseQueryType {
	q: string; // name of param in api
}
