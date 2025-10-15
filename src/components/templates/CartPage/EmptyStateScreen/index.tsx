import type { FC } from 'react';

interface EmptyStateScreenProps {
	navigateToProducts: () => void;
}

const EmptyStateScreen: FC<EmptyStateScreenProps> = ({ navigateToProducts }) => {
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
};

export default EmptyStateScreen;
