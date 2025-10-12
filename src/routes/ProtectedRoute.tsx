import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '.';

export const ProtectedRoute = ({ redirectPath = ROUTES.Login }) => {
	const isAuth = true; // TODO: modify when auth is ready

	if (!isAuth) {
		return <Navigate to={redirectPath} replace />;
	}
	return <Outlet />;
};
