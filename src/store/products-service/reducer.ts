import { createSlice } from '@reduxjs/toolkit';

import { getPaginatedProducts } from './actions';

import { getPaginatedProductsOperation, pendingOperation, rejectedOperation } from './operations';

import type { ProductsState } from './interfaces';

const initialState: ProductsState = {
	products: [],
    total: 0,
	isLoading: false,
};

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {},
	extraReducers: builder => {
		// get paginated list of products
		builder.addCase(getPaginatedProducts.pending, pendingOperation);
		builder.addCase(getPaginatedProducts.fulfilled, getPaginatedProductsOperation);
		builder.addCase(getPaginatedProducts.rejected, rejectedOperation);
	},
});

export default productsSlice.reducer;
