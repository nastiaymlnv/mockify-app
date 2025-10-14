import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { changeCartProductQuantity, clearCart, removeFromCart } from '../../store/cart-service/actions';
import { selectorGetCartItems, selectorGetTotalPrice } from '../../store/cart-service/selectors';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import type { CartProduct } from '../../types/products.type';

import { ROUTES } from '../../routes';

import CartItemCard from '../../components/modules/CartItemCard';
import { currencySymbol } from '../../constants/currency';

const CartPage = () => {
	const cartItems = useAppSelector(selectorGetCartItems);
	const totalPrice = useAppSelector(selectorGetTotalPrice);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const totalItemsCount = useMemo(() => cartItems.reduce((accum, curr) => (accum += curr.quantity), 0), [cartItems]);

	const navigateToProducts = () => navigate(ROUTES.Products);

	const changeQuantity = useCallback(
		(productId: number, quantity: number) => {
			dispatch(changeCartProductQuantity({ productId, quantity }));
		},
		[dispatch]
	);

	const deleteFromCart = useCallback(
		(product: CartProduct) => {
			dispatch(removeFromCart(product));
		},
		[dispatch]
	);

	const handleClearCart = () => dispatch(clearCart());

	// Showing the empty state screen
	if (!cartItems?.length) {
		return (
			<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="flex flex-col items-center justify-center min-h-[88dvh] text-center ">
					<h2 className="text-3xl font-bold text-gray-900 mb-3">Your cart is empty</h2>
					<p className="text-gray-600 mb-8 max-w-md">
						Looks like you haven't added any products to your cart yet. Start shopping to fill it up!
					</p>
					<button
						onClick={navigateToProducts}
						className="cursor-pointer px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all font-medium space-x-2"
					>
						Continue Shopping
					</button>
				</div>
			</section>
		);
	}

	return (
		<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div className="mb-6">
				<button
					onClick={navigateToProducts}
					className="cursor-pointer space-x-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors mb-4"
				>
					Continue Shopping
				</button>
				<div className="flex items-center justify-between">
					<h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
					{cartItems.length > 0 && (
						<button
							onClick={handleClearCart}
							className="cursor-pointer text-red-600 hover:text-red-700 font-medium text-xl space-x-1"
						>
							Clear Cart
						</button>
					)}
				</div>
			</div>
			<section className="grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-[75.2dvh]">
				<div className="lg:col-span-2 space-y-6">
					<section className="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">
						{cartItems.map(item => (
							<CartItemCard
								key={item.id}
								item={item}
								deleteFromCart={deleteFromCart}
								changeQuantity={changeQuantity}
							/>
						))}
					</section>
					<section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
						<div className="flex justify-between items-center">
							<h3 className="text-lg font-bold text-gray-900">
								Total
								<span className="text-gray-600 font-medium">{` (${totalItemsCount} ${totalItemsCount === 1 ? 'item' : 'items'})`}</span>
							</h3>
							<span className="text-2xl font-bold text-gray-900">{`${currencySymbol}${totalPrice.toFixed(2)}`}</span>
						</div>
					</section>
				</div>
			</section>
		</section>
	);
};

export default CartPage;
