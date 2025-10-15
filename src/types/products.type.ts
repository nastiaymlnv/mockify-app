type BaseProduct = {
	id: number;
	title: string;
	description: string;
	price: number;
	images: string[];
	thumbnail: string;
};

export interface Product extends BaseProduct {
	category: string;
	quantity?: number;
}

export type ProductCategory = {
	name: string;
	slug: string;
};

export interface CartProduct extends BaseProduct {
	quantity: number;
}
