export enum AuthActionType {
	LOGIN = 'authStore/login',
	GET_AUTH_USER = 'authStore/getCurrentUser',
}

export enum ProductsActionType {
	GET_PRODUCTS = 'productsStore/getProducts',
	GET_PRODUCTS_CATEGORIES = 'productsStore/getProductsCategories',
	GET_PRODUCTS_BY_CATEGORY = 'productsStore/getProductByCategory',
	SEARCH_PRODUCTS = 'productsStore/searchProducts',
}
