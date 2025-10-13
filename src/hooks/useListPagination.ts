import { useCallback, useEffect, useMemo, useState } from 'react';

import { DEFAULT_QUERY } from '../constants/default-query';

export const useListPagination = (totalItems: number) => {
	const [query, setQuery] = useState(DEFAULT_QUERY);

	const paginationRange = useMemo(
		() => ({
			itemMin: totalItems === 0 ? 0 : query.skip + 1,
			itemMax: Math.min(query.skip + query.limit, totalItems),
		}),
		[query, totalItems]
	);

	const totalPages = useMemo(() => Math.max(1, Math.ceil(totalItems / query.limit)), [query, totalItems]);

	const currentPage = useMemo(() => Math.floor(query.skip / query.limit) + 1, [query]);

	const goToPage = useCallback(
		(page: number) => {
			if (page >= 1 && page <= totalPages) {
				setQuery(prev => ({ ...prev, skip: (page - 1) * prev.limit }));
			}
		},
		[totalPages]
	);

	// Reset if out of bounds
	useEffect(() => {
		if (currentPage > totalPages && totalPages > 0) {
			goToPage(totalPages);
		}
	}, [totalItems]); // Reset when items change

	return { query, setQuery, paginationRange, totalPages, currentPage, goToPage };
};
