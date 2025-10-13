import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import Loader from '../elements/Loader';
import Header from '../elements/Header';

const MainLayout = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50/30 to-teal-50/30">
			<Header />
			<main>
				<Suspense fallback={<Loader />}>
					<Outlet />
				</Suspense>
			</main>
		</div>
	);
};

export default MainLayout;
