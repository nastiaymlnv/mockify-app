/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';

import { ProductsActionType } from '../action-types';

import axiosInstance from '../../api/axios';
import { PRODUCTS } from '../../api/api-urls';

import type { GetPaginatedProductsDto, GetPaginatedProductsResponse } from './interfaces';

export const getPaginatedProducts = createAsyncThunk<
	GetPaginatedProductsResponse, // fulfilled return type
	GetPaginatedProductsDto, // argument type
	{ rejectValue: string } // thunk API config
>(ProductsActionType.GET_PAGINATED_PRODUCTS, async (query: GetPaginatedProductsDto, { rejectWithValue }) => {
	try {
		const { data } = await axiosInstance.get(PRODUCTS.GET_PAGINATED_PRODUCTS(query.limit, query.skip));

		return data;
	} catch (error: any) {
		return rejectWithValue(error.response?.data?.message || 'Error fetching products');
	}
});
