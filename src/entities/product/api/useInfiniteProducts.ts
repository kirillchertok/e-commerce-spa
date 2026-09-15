import { type InfiniteData,useInfiniteQuery } from '@tanstack/react-query';

import type {
    PaginatedProductsResponse,
    ProductFilters,
    ProductPageCursor,
    SortOrder,
} from '../types/product.types';
import { fetchProductsPage } from './products';

export function useInfiniteProducts(filters: ProductFilters = {}, sort: SortOrder = null) {
    return useInfiniteQuery<
        PaginatedProductsResponse,
        Error,
        InfiniteData<PaginatedProductsResponse, ProductPageCursor | null>,
        [string, ProductFilters, SortOrder],
        ProductPageCursor | null
    >({
        queryKey: ['products', filters, sort],
        queryFn: ({ pageParam }) => fetchProductsPage({ pageParam, filters, sort }),
        initialPageParam: null,
        getNextPageParam: lastPage => lastPage.nextCursor ?? undefined,
    });
}
