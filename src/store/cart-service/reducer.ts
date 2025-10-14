import { createSlice } from '@reduxjs/toolkit';

import type { CartState } from './interfaces';
import { addToCart, changeCartProductQuantity, clearCart, removeFromCart } from './actions';
import {
	addToCartOperation,
	changeCartProductQuantityOperation,
	clearCartOperation,
	pendingOperation,
	rejectedOperation,
	removeFromCartOperation,
} from './operations';

import { loadCartFromStorage, loadCartPriceFromStorage } from '../../utils/localStorage-operations';

const initialState: CartState = {
	cart: loadCartFromStorage(),
	totalPrice: loadCartPriceFromStorage(),
	isLoading: false,
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {},
	extraReducers: builder => {
		// add items to cart
		builder.addCase(addToCart.pending, pendingOperation);
		builder.addCase(addToCart.fulfilled, addToCartOperation);
		builder.addCase(addToCart.rejected, rejectedOperation);
		// remove item from cart
		builder.addCase(removeFromCart.pending, pendingOperation);
		builder.addCase(removeFromCart.fulfilled, removeFromCartOperation);
		builder.addCase(removeFromCart.rejected, rejectedOperation);
		// change the cart product quantity
		builder.addCase(changeCartProductQuantity.pending, pendingOperation);
		builder.addCase(changeCartProductQuantity.fulfilled, changeCartProductQuantityOperation);
		builder.addCase(changeCartProductQuantity.rejected, rejectedOperation);
		// clear cart
		builder.addCase(clearCart.pending, pendingOperation);
		builder.addCase(clearCart.fulfilled, clearCartOperation);
		builder.addCase(clearCart.rejected, rejectedOperation);
	},
});

export default cartSlice.reducer;
