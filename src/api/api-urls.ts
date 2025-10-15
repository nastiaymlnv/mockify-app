export const AUTH = {
	LOGIN: '/auth/login',
	GET_AUTH_USER: '/auth/me',
};

export const PRODUCTS = {
	GET_PRODUCTS: `/products`,
	GET_PRODUCTS_CATEGORIES: '/products/categories',
	GET_PRODUCTS_BY_CATEGORY: (name: string) => `/products/category/${name}`,
	SEARCH_PRODUCTS: '/products/search',
	PLACE_ORDER: '/c/6517-0f7c-40c7-9314',
};
