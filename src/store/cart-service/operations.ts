import type { PayloadAction } from '@reduxjs/toolkit';
import type { CartActionResponse, CartState } from './interfaces';

export const pendingOperation = (state: CartState) => {
	state.isLoading = true;
};

export const rejectedOperation = (state: CartState) => {
	state.isLoading = false;
};

export const addToCartOperation = (state: CartState, { payload }: PayloadAction<CartActionResponse>) => {
	state.isLoading = false;
	state.cart = payload.cart;
	state.totalPrice = payload.totalPrice;
};

export const removeFromCartOperation = (state: CartState, { payload }: PayloadAction<CartActionResponse>) => {
	state.isLoading = false;
	state.cart = payload.cart;
	state.totalPrice = payload.totalPrice;
};

export const clearCartOperation = (state: CartState, { payload }: PayloadAction<CartActionResponse>) => {
	state.isLoading = false;
	state.cart = payload.cart;
	state.totalPrice = payload.totalPrice;
};

export const changeCartProductQuantityOperation = (
	state: CartState,
	{ payload }: PayloadAction<CartActionResponse>
) => {
	state.isLoading = false;
	state.cart = payload.cart;
	state.totalPrice = payload.totalPrice;
};

export const placeOrderOperation = (state: CartState) => {
	state.isLoading = false;
	state.cart = [];
	state.totalPrice = 0;
};
