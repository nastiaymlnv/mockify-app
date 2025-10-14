import type { RootState } from '../store';

export const selectorGetCartItems = (state: RootState) => state.cartStore.cart;

export const selectorGetTotalPrice = (state: RootState) => state.cartStore.totalPrice;
