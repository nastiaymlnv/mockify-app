import type { FC } from 'react';

import { currencySymbol } from '../../../constants/currency';

import type { CartProduct } from '../../../types/products.type';

import Trash from '../../../assets/icons/trash.svg';

interface CartItemCardProps {
	item: CartProduct;
	deleteFromCart: (item: CartProduct) => void;
	changeQuantity: (itemId: number, quantity: number) => void;
}

const CartItemCard: FC<CartItemCardProps> = ({ item, deleteFromCart, changeQuantity }) => {
	return (
		<article key={item.id} className="p-6 flex flex-col sm:flex-row gap-6">
			<div className="flex-shrink-0 w-full sm:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
				<img
					src={item.images?.length > 0 ? item.images[0] : item.thumbnail}
					alt={item.title}
					className="w-full h-full object-cover"
				/>
			</div>
			<section className="flex-grow">
				<div className="flex justify-between items-start mb-2">
					<div>
						<h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
						<p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
					</div>
					<button
						onClick={() => deleteFromCart(item)}
						className="cursor-pointer text-gray-400 hover:text-red-600 transition-colors ml-4"
					>
						<img src={Trash} alt="remove item" className="w-12 h-full" />
					</button>
				</div>
				<div className="flex items-center justify-between mt-4">
					<div className="flex items-center space-x-3">
						<button
							onClick={() => changeQuantity(item.id, item.quantity - 1)}
							className="cursor-pointer w-8 h-8 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
						>
							-
						</button>
						<span className="text-gray-900 font-medium w-8 text-center">{item.quantity}</span>
						<button
							onClick={() => changeQuantity(item.id, item.quantity + 1)}
							className="cursor-pointer w-8 h-8 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
						>
							+
						</button>
					</div>
					<div className="text-right">
						<p className="text-xl font-bold text-gray-900">
							{`${currencySymbol}${(item.price * item.quantity).toFixed(2)}`}
						</p>
						<p className="text-xs text-gray-500">{`${currencySymbol}${item.price?.toFixed(2)}`} each</p>
					</div>
				</div>
			</section>
		</article>
	);
};

export default CartItemCard;
