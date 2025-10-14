/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';

import { ProductsActionType } from '../action-types';

import axiosInstance from '../../api/axios';
import { PRODUCTS } from '../../api/api-urls';

import type {
	getProductsDto,
	getProductsResponse,
	GetProductsByCategoryDto,
	GetProductsCategoriesResponse,
	SearchProductsDto,
} from './interfaces';

export const getProducts = createAsyncThunk<
	getProductsResponse, // fulfilled return type
	getProductsDto, // argument type
	{ rejectValue: string } // thunk API config
>(ProductsActionType.GET_PRODUCTS, async (query: getProductsDto, { rejectWithValue }) => {
	try {
		const { data } = await axiosInstance.get(PRODUCTS.GET_PRODUCTS, { params: query });

		return data;
	} catch (error: any) {
		return rejectWithValue(error.response?.data?.message || 'Error fetching products');
	}
});

export const getProductsCategories = createAsyncThunk<
	GetProductsCategoriesResponse[], // fulfilled return type
	undefined, // argument type
	{ rejectValue: string } // thunk API config
>(ProductsActionType.GET_PRODUCTS_CATEGORIES, async (_, { rejectWithValue }) => {
	try {
		const { data } = await axiosInstance.get(PRODUCTS.GET_PRODUCTS_CATEGORIES);

		return data;
	} catch (error: any) {
		return rejectWithValue(error.response?.data?.message || 'Error fetching categories');
	}
});

export const getProductByCategory = createAsyncThunk<
	getProductsResponse, // fulfilled return type
	GetProductsByCategoryDto, // argument type
	{ rejectValue: string } // thunk API config
>(ProductsActionType.GET_PRODUCTS_BY_CATEGORY, async (query: GetProductsByCategoryDto, { rejectWithValue }) => {
	try {
		const { category, ...params } = query;
		const { data } = await axiosInstance.get(PRODUCTS.GET_PRODUCTS_BY_CATEGORY(category), {
			params,
		});

		return data;
	} catch (error: any) {
		return rejectWithValue(error.response?.data?.message || 'Error fetching products by category');
	}
});

export const searchProducts = createAsyncThunk<
	getProductsResponse, // fulfilled return type
	SearchProductsDto, // argument type
	{ rejectValue: string } // thunk API config
>(ProductsActionType.SEARCH_PRODUCTS, async (query: SearchProductsDto, { rejectWithValue }) => {
	try {
		const { data } = await axiosInstance.get(PRODUCTS.SEARCH_PRODUCTS, {
			params: query,
		});

		return data;
	} catch (error: any) {
		return rejectWithValue(error.response?.data?.message || 'Error fetching products');
	}
});
