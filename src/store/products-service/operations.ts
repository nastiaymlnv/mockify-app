import type { PayloadAction } from '@reduxjs/toolkit';

import type { GetPaginatedProductsResponse, ProductsState } from './interfaces';

export const pendingOperation = (state: ProductsState) => {
	state.isLoading = true;
};

export const rejectedOperation = (state: ProductsState) => {
	state.isLoading = false;
};

export const getPaginatedProductsOperation = (
	state: ProductsState,
	{ payload }: PayloadAction<GetPaginatedProductsResponse>
) => {
	state.isLoading = false;
	state.products = payload.products;
	state.total = payload.total;
};
