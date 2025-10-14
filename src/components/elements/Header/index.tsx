import { NavLink } from 'react-router-dom';

import { ROUTES } from '../../../routes';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { logout } from '../../../store/auth-service/reducer';
import { selectorGetTotalPrice } from '../../../store/cart-service/selectors';

import Logo from '../Logo';

import Cart from '../../../assets/icons/shopping-cart.svg';
import Logout from '../../../assets/icons/logout.svg';

import { currencySymbol } from '../../../constants/currency';

const Header = () => {
	const dispatch = useAppDispatch();
	const totalSum = useAppSelector(selectorGetTotalPrice);

	const handleLogout = () => dispatch(logout());

	return (
		<header className="bg-white shadow-sm sticky top-0 z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<Logo />
					<div className="flex items-center space-x-4">
						<NavLink
							to={ROUTES.Cart}
							className={({ isActive }) =>
								`relative flex items-center space-x-3 px-4 py-2 rounded-lg transition-all ${
									isActive ? 'bg-emerald-50 text-emerald-600' : 'hover:bg-gray-50 text-gray-700'
								}`
							}
						>
							<img src={Cart} alt="shopping cart" className="w-6 h-6" />
							<div className="hidden sm:flex flex-col items-start">
								<span className="text-xs text-gray-500">Cart</span>
								{totalSum > 0 && (
									<span className="text-sm font-bold">{`${currencySymbol}${totalSum.toFixed(2)}`}</span>
								)}
							</div>
						</NavLink>
						<button
							onClick={handleLogout}
							className="cursor-pointer flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-all"
							title="Log Out"
						>
							<img src={Logout} alt="log out" className="w-6 h-6" />
							<span className="hidden md:inline">Log Out</span>
						</button>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
