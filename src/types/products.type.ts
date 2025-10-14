export type Product = {
	id: number;
	title: string;
	description: string;
	price: number;
	images: string[];
	thumbnail: string;
	category: string;
};

export type ProductCategory = {
	name: string;
	slug: string;
};
