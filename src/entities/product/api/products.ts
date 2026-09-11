import { mockProducts } from '../__mocks__/mockProducts';
import type {
    PaginatedProductsResponse,
    Product,
    ProductFilters,
    SortOrder,
} from '../types/product.types';

export const PAGE_SIZE = 4;

export async function fetchProductsPage({
    pageParam = 1,
    filters = {},
    sort = null,
}: {
    pageParam?: number;
    filters?: ProductFilters;
    sort?: SortOrder;
}): Promise<PaginatedProductsResponse> {
    await new Promise(resolve => setTimeout(resolve, 300));

    let filtered: Product[] = [...mockProducts];

    if (filters.category) {
        filtered = filtered.filter(
            p => p.category.toLowerCase() === filters.category?.toLowerCase()
        );
    }

    if (filters.subCategory) {
        filtered = filtered.filter(
            p => p.subCategory?.toLowerCase() === filters.subCategory?.toLowerCase()
        );
    }

    if (filters.gender) {
        filtered = filtered.filter(p =>
            p.gender?.some(g => g.toLowerCase() === filters.gender?.toLowerCase())
        );
    }

    if (filters.colors && filters.colors.length > 0) {
        filtered = filtered.filter(p =>
            p.color?.some(c => filters.colors?.some(fc => fc.toLowerCase() === c.toLowerCase()))
        );
    }

    if (filters.sizes && filters.sizes.length > 0) {
        filtered = filtered.filter(p =>
            p.size?.some(s => filters.sizes?.some(fs => fs.toLowerCase() === s.toLowerCase()))
        );
    }

    if (filters.brands && filters.brands.length > 0) {
        filtered = filtered.filter(p =>
            filters.brands?.some(b => b.toLowerCase() === p.brand?.toLowerCase())
        );
    }

    if (filters.conditions && filters.conditions.length > 0) {
        filtered = filtered.filter(p =>
            filters.conditions?.some(c => c.toLowerCase() === p.condition?.toLowerCase())
        );
    }

    if (filters.shops && filters.shops.length > 0) {
        filtered = filtered.filter(p =>
            filters.shops?.some(s => s.toLowerCase() === p.shop?.toLowerCase())
        );
    }

    if (filters.sale) {
        filtered = filtered.filter(p => p.isSale || (p.oldPrice !== null && p.oldPrice > p.price));
    }

    if (filters.search) {
        const query = filters.search.toLowerCase().trim();
        filtered = filtered.filter(
            p =>
                p.title.toLowerCase().includes(query) ||
                p.brand?.toLowerCase().includes(query) ||
                p.category.toLowerCase().includes(query)
        );
    }

    if (sort === 'price_asc') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'price_desc') {
        filtered.sort((a, b) => b.price - a.price);
    }

    const totalCount = filtered.length;
    const startIndex = (pageParam - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const items = filtered.slice(startIndex, endIndex);
    const nextPage = endIndex < totalCount ? pageParam + 1 : null;

    return {
        items,
        nextPage,
        totalCount,
    };
}

