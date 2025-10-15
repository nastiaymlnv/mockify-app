import type { CartProduct } from '../types/products.type';

export const loadCartFromStorage = (): CartProduct[] => {
	try {
		const savedCart = localStorage.getItem('cart');
		return savedCart ? [...JSON.parse(savedCart)] : [];
	} catch {
		return [];
	}
};

export const loadCartPriceFromStorage = (): number => {
	try {
		const savedCartTotalPrice = localStorage.getItem('cartPrice');
		return savedCartTotalPrice ? +savedCartTotalPrice : 0;
	} catch {
		return 0;
	}
};

export const saveCartToLocalStorage = (cart: CartProduct[], totalPrice: number): void => {
	try {
		localStorage.setItem('cart', JSON.stringify(cart));
		localStorage.setItem('cartPrice', String(totalPrice));
	} catch (error) {
		console.error('Failed to save cart to localStorage:', error);
		throw error;
	}
};

export const clearCartLocalStorageData = (): void => {
	try {
		localStorage.removeItem('cart');
		localStorage.removeItem('cartPrice');
	} catch (error) {
		console.error('Failed to clear cart localStorage data:', error);
		throw error;
	}
};

export const clearLocalStorageData = (): void => {
	try {
		localStorage.removeItem('token');
		localStorage.removeItem('cart');
		localStorage.removeItem('cartPrice');
	} catch (error) {
		console.error('Failed to clear localStorage data:', error);
		throw error;
	}
};
