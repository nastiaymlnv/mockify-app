import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../store';

const selectProductsStore = (state: RootState) => state.productsStore;

export const selectorGetPaginatedProducts = createSelector(selectProductsStore, productsStore => ({
	products: productsStore.products,
	total: productsStore.total,
}));

export const selectorIsProductsLoading = (state: RootState) => state.productsStore.isLoading;
