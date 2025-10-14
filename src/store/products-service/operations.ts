import type { PayloadAction } from '@reduxjs/toolkit';

import type { getProductsResponse, GetProductsCategoriesResponse, ProductsState } from './interfaces';

export const pendingOperation = (state: ProductsState) => {
	state.isLoading = true;
};

export const rejectedOperation = (state: ProductsState) => {
	state.isLoading = false;
};

export const getProductsOperation = (state: ProductsState, { payload }: PayloadAction<getProductsResponse>) => {
	state.isLoading = false;
	state.products = payload.products;
	state.total = payload.total;
};

export const getProductsCategoriesOperation = (
	state: ProductsState,
	{ payload }: PayloadAction<GetProductsCategoriesResponse[]>
) => {
	state.isLoading = false;
	state.categories = payload.map(item => ({ name: item.name, slug: item.slug }));
};
