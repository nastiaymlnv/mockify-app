import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ROUTES } from './routes';
import MainLayout from './components/layouts/MainLayout';
import { lazy } from 'react';
import { ProtectedRoute } from './routes/ProtectedRoute';

const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const CartPage = lazy(() => import('./pages/CartPage'));

function App() {
	return (
		<Router>
			<Routes>
				<Route path={`${ROUTES.Main}*`} element={<ProtectedRoute />}>
					<Route element={<MainLayout />}>
						<Route index element={<Navigate replace to={ROUTES.Products} />} />
						<Route path={ROUTES.Products} element={<ProductsPage />} />
						<Route path={ROUTES.Cart} element={<CartPage />} />
					</Route>
				</Route>
				<Route path={ROUTES.Login} element={<LoginPage />} />
				<Route path={ROUTES.Signup} element={<SignupPage />} />
			</Routes>
		</Router>
	);
}

export default App;
