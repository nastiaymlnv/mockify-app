import type { CartProduct, Product } from '../types/products.type';

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

export const saveToLocalStorage = (cart: Product[], totalPrice: number): void => {
	try {
		localStorage.setItem('cart', JSON.stringify(cart));
		localStorage.setItem('cartPrice', String(totalPrice));
	} catch (error) {
		console.error('Failed to save cart to localStorage:', error);
		throw error;
	}
};
