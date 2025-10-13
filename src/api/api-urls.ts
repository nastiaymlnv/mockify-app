export const AUTH = {
	LOGIN: '/auth/login',
	GET_AUTH_USER: '/auth/me',
};

export const PRODUCTS = {
	GET_PAGINATED_PRODUCTS: (limit: number, skip: number = 0) => `/products?limit=${limit}&skip=${skip}`,
};
