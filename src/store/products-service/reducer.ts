import { createSlice } from '@reduxjs/toolkit';

import { getProducts, getProductByCategory, getProductsCategories, searchProducts } from './actions';

import {
	getProductsOperation,
	getProductsCategoriesOperation,
	pendingOperation,
	rejectedOperation,
} from './operations';

import type { ProductsState } from './interfaces';

const initialState: ProductsState = {
	products: [],
	categories: [],
	total: 0,
	isLoading: false,
};

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {},
	extraReducers: builder => {
		// get paginated list of products
		builder.addCase(getProducts.pending, pendingOperation);
		builder.addCase(getProducts.fulfilled, getProductsOperation);
		builder.addCase(getProducts.rejected, rejectedOperation);
		// get products categories
		builder.addCase(getProductsCategories.pending, pendingOperation);
		builder.addCase(getProductsCategories.fulfilled, getProductsCategoriesOperation);
		builder.addCase(getProductsCategories.rejected, rejectedOperation);
		// get products by category
		builder.addCase(getProductByCategory.pending, pendingOperation);
		builder.addCase(getProductByCategory.fulfilled, getProductsOperation);
		builder.addCase(getProductByCategory.rejected, rejectedOperation);
		// search products
		builder.addCase(searchProducts.pending, pendingOperation);
		builder.addCase(searchProducts.fulfilled, getProductsOperation);
		builder.addCase(searchProducts.rejected, rejectedOperation);
	},
});

export default productsSlice.reducer;
