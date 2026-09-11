import { useInfiniteQuery } from '@tanstack/react-query';

import type { ProductFilters, SortOrder } from '../types/product.types';
import { fetchProductsPage } from './products';

export function useInfiniteProducts(filters: ProductFilters = {}, sort: SortOrder = null) {
    return useInfiniteQuery({
        queryKey: ['products', filters, sort],
        queryFn: ({ pageParam }) => fetchProductsPage({ pageParam, filters, sort }),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextPage,
    });
}
