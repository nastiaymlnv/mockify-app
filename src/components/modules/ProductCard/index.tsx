import { useState, type FC } from 'react';

import type { Product } from '../../../types/products.type';

import { currencyName, currencySymbol } from '../../../constants/currency';

interface ProductCardProps {
	product: Product;
	addToCart: (product: Product) => void;
}

const ProductCard: FC<ProductCardProps> = ({ product, addToCart }) => {
	const [isAdded, setIsAdded] = useState(false);

	const handleAddToCart = () => {
		addToCart(product);
		// Show temporary UI feedback (set the added state to true,
		// and automatically resets it after 0.5 seconds.
		setIsAdded(true);
		setTimeout(() => setIsAdded(false), 500);
	};

	return (
		<article className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border border-gray-100">
			<div className="relative aspect-square overflow-hidden bg-gray-100">
				<img
					src={product.images.length > 0 ? product.images[0] : product.thumbnail}
					alt={product.title}
					className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
				/>
			</div>
			<div className="p-5">
				<div className="mb-3">
					<h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">{product.title}</h3>
					<p className="text-sm text-gray-600 line-clamp-2 min-h-[2.5rem]">{product.description}</p>
				</div>
				<div className="flex items-center justify-between">
					<div className="flex flex-col">
						<span className="text-2xl font-bold text-gray-900">
							{`${currencySymbol}${product.price.toFixed(2)}`}
						</span>
						<span className="text-xs text-gray-500">{currencyName}</span>
					</div>
					<button
						onClick={handleAddToCart}
						disabled={isAdded}
						className={`px-4 py-2.5 rounded-lg font-medium transition-all flex items-center space-x-2 ${
							isAdded
								? 'bg-emerald-500 text-white'
								: 'cursor-pointer bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95'
						}`}
					>
						{isAdded ? 'Added' : 'Add'}
					</button>
				</div>
			</div>
		</article>
	);
};

export default ProductCard;
