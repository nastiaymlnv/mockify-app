import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import FullPageLoader from '../elements/FullPageLoader';
import Header from '../modules/Header';

const MainLayout = () => {
	return (
		<div className="bg-gradient-to-br from-gray-50 via-emerald-50/30 to-teal-50/30">
			<Header />
			<main>
				<Suspense fallback={<FullPageLoader />}>
					<Outlet />
				</Suspense>
			</main>
		</div>
	);
};

export default MainLayout;
