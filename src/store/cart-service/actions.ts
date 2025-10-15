/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';

import { CartActionType } from '../action-types';

import type { CartActionResponse, CartState, PlaceOrderDto } from './interfaces';
import type { CartProduct } from '../../types/products.type';

import { clearLocalStorageData, saveToLocalStorage } from '../../utils/localStorage-operations';
import { calculateTotalPrice } from '../../utils/cart-helpers';

import { PRODUCTS } from '../../api/api-urls';
import axiosInstance from '../../api/axios';

export const addToCart = createAsyncThunk(
	CartActionType.ADD_TO_CART,
	async (payload: CartProduct, { getState }): Promise<CartActionResponse> => {
		const state = getState() as { cartStore: CartState };
		const store = state.cartStore;
		const addedItem = store.cart.find(item => item.id === payload.id);

		let updatedCart: CartProduct[];

		if (addedItem) {
			updatedCart = store.cart.map(item =>
				item.id === payload.id ? { ...item, quantity: item.quantity + 1 } : item
			);
		} else {
			updatedCart = [...store.cart, { ...payload, quantity: 1 }];
		}

		const totalPrice = calculateTotalPrice(updatedCart);

		saveToLocalStorage(updatedCart, totalPrice);

		return { cart: updatedCart, totalPrice };
	}
);

export const removeFromCart = createAsyncThunk(
	CartActionType.REMOVE_FROM_CART,
	async (payload: CartProduct, { getState }): Promise<CartActionResponse> => {
		const state = getState() as { cartStore: CartState };
		const store = state.cartStore;

		const updatedCart = store.cart.filter(item => item.id !== payload.id);
		const totalPrice = calculateTotalPrice(updatedCart);

		saveToLocalStorage(updatedCart, totalPrice);

		return { cart: updatedCart, totalPrice };
	}
);

export const changeCartProductQuantity = createAsyncThunk(
	CartActionType.CHANGE_PRODUCT_QUANTITY,
	async (payload: { productId: number; quantity: number }, { getState }): Promise<CartActionResponse> => {
		const state = getState() as { cartStore: CartState };
		const store = state.cartStore;

		const updatedCart = store.cart
			.map(item => (item.id === payload.productId ? { ...item, quantity: payload.quantity } : item))
			.filter(item => item.quantity !== 0);

		const totalPrice = calculateTotalPrice(updatedCart);

		saveToLocalStorage(updatedCart, totalPrice);

		return { cart: updatedCart, totalPrice };
	}
);

export const clearCart = createAsyncThunk(CartActionType.CLEAR_CART, async () => {
	clearLocalStorageData();

	return { cart: [], totalPrice: 0 };
});

export const placeOrder = createAsyncThunk<
	{ message: string }, // fulfilled return type
	PlaceOrderDto, // argument type
	{ rejectValue: string } // thunk API config
>(CartActionType.PLACE_ORDER, async (query: PlaceOrderDto, { rejectWithValue }) => {
	try {
		const { data } = await axiosInstance.post(PRODUCTS.PLACE_ORDER, query);

		clearLocalStorageData();

		return data;
	} catch (error: any) {
		return rejectWithValue(error.response?.data?.message || 'Failed to place order');
	}
});
