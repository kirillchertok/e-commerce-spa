import { doc, getDoc } from 'firebase/firestore';

import { db } from '@/shared/config/firebase';

import { mockProducts } from '../__mocks__/mockProducts';
import type {
    PaginatedProductsResponse,
    Product,
    ProductFilters,
    SortOrder,
} from '../types/product.types';

export const PAGE_SIZE = 4;

function mapFirestoreProduct(id: string, data: Record<string, unknown>): Product {
    return {
        id,
        title: String(data.title ?? data.name ?? ''),
        description: data.description ? String(data.description) : undefined,
        price: Number(data.price ?? 0),
        oldPrice: data.oldPrice != null ? Number(data.oldPrice) : null,
        isNew: Boolean(data.isNew),
        isReserved: Boolean(data.isReserved),
        image: String(data.image ?? ''),
        images: Array.isArray(data.images) ? data.images.map(String) : undefined,
        stock: Number(data.stock ?? 0),
        category: String(data.category ?? ''),
        subCategory: data.subCategory ? String(data.subCategory) : undefined,
        gender: Array.isArray(data.gender) ? (data.gender as Product['gender']) : undefined,
        color: Array.isArray(data.color ?? data.colors)
            ? ((data.color ?? data.colors) as string[]).map(String)
            : undefined,
        size: Array.isArray(data.size ?? data.sizes)
            ? ((data.size ?? data.sizes) as string[]).map(String)
            : undefined,
        brand: data.brand ? String(data.brand) : undefined,
        condition: data.condition as Product['condition'],
        shop: data.shop ? String(data.shop) : undefined,
        isSale: Boolean(data.isSale),
    };
}

function getMockProductById(productId: string): Product | null {
    const product = mockProducts.find(item => String(item.id) === productId);
    return product ?? null;
}

export async function getProductById(productId: string): Promise<Product | null> {
    if (!productId) {
        return null;
    }

    if (!db) {
        await new Promise(resolve => setTimeout(resolve, 300));
        return getMockProductById(productId);
    }

    const snapshot = await getDoc(doc(db, 'products', productId));

    if (!snapshot.exists()) {
        return null;
    }

    return mapFirestoreProduct(snapshot.id, snapshot.data() as Record<string, unknown>);
}

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

