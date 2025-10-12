import { Navigate, Outlet } from 'react-router-dom';

import { useAppSelector } from '../store/hooks';
import { selectorGetIsAuthStatus } from '../store/auth-service/selectors';

import { ROUTES } from '.';

export const ProtectedRoute = ({ redirectPath = ROUTES.Login }) => {
	const isAuth = useAppSelector(selectorGetIsAuthStatus);

	if (!isAuth) {
		return <Navigate to={redirectPath} replace />;
	}

	return <Outlet />;
};
