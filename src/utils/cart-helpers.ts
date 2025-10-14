import type { CartProduct } from '../types/products.type';

export const calculateTotalPrice = (cart: CartProduct[]): number => {
	return cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
};
