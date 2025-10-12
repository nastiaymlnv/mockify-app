import { lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import MainLayout from './components/layouts/MainLayout';

import { ROUTES } from './routes';
import { ProtectedRoute } from './routes/ProtectedRoute';

const LoginPage = lazy(() => import('./pages/LoginPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
	return (
		<Router>
			<Routes>
				<Route element={<ProtectedRoute />}>
					<Route element={<MainLayout />}>
						<Route index element={<Navigate replace to={ROUTES.Products} />} />
						<Route path={ROUTES.Products} element={<ProductsPage />} />
						<Route path={ROUTES.Cart} element={<CartPage />} />
					</Route>
				</Route>
				<Route path={ROUTES.Login} element={<LoginPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</Router>
	);
}

export default App;
