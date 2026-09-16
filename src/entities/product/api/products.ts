import {
    collection,
    doc,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    type QueryConstraint,
    startAfter,
    where,
} from 'firebase/firestore';

import { db } from '@/shared/config/firebase';

import type {
    PaginatedProductsResponse,
    Product,
    ProductFilters,
    ProductPageCursor,
    SortOrder,
} from '../types/product.types';

export const PAGE_SIZE = 4;

function mapFirestoreProduct(id: string, data: Record<string, unknown>): Product {
    return {
        id,
        title: String(data.title ?? ''),
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
        color: Array.isArray(data.color) ? (data.color as string[]).map(String) : undefined,
        size: Array.isArray(data.size) ? (data.size as string[]).map(String) : undefined,
        brand: data.brand ? String(data.brand) : undefined,
        condition: data.condition as Product['condition'],
        shop: data.shop ? String(data.shop) : undefined,
        isSale: Boolean(data.isSale),
    };
}

function getFirestore(): NonNullable<typeof db> {
    if (!db) {
        throw new Error('Firestore is not configured');
    }

    return db;
}

export async function getProductById(productId: string): Promise<Product> {
    if (!productId) {
        throw new Error('Product id is required');
    }

    const snapshot = await getDoc(doc(getFirestore(), 'products', productId));

    if (!snapshot.exists()) {
        throw new Error('Product not found');
    }

    return mapFirestoreProduct(snapshot.id, snapshot.data() as Record<string, unknown>);
}

export async function fetchProductsPage({
    pageParam = null,
    filters = {},
    sort = null,
}: {
    pageParam?: ProductPageCursor | null;
    filters?: ProductFilters;
    sort?: SortOrder;
}): Promise<PaginatedProductsResponse> {
    const constraints: QueryConstraint[] = [];

    if (filters.category) {
        constraints.push(where('category', '==', filters.category));
    }

    if (filters.subCategory) {
        constraints.push(where('subCategory', '==', filters.subCategory));
    }

    if (filters.gender) {
        constraints.push(where('gender', 'array-contains', filters.gender));
    }

    const arrayFilter = filters.colors?.length ? 'color' : filters.sizes?.length ? 'size' : null;
    const arrayFilterValues = filters.colors?.length
        ? filters.colors
        : filters.sizes?.length
          ? filters.sizes
          : undefined;

    if (arrayFilter && arrayFilterValues) {
        constraints.push(where(arrayFilter, 'array-contains-any', arrayFilterValues));
    }

    if (filters.brands && filters.brands.length > 0) {
        constraints.push(where('brand', 'in', filters.brands));
    }

    if (filters.conditions && filters.conditions.length > 0) {
        constraints.push(where('condition', 'in', filters.conditions));
    }

    if (filters.shops && filters.shops.length > 0) {
        constraints.push(where('shop', 'in', filters.shops));
    }

    if (filters.sale === true) {
        constraints.push(where('isSale', '==', true));
    }

    const productsRef = collection(getFirestore(), 'products');
    const priceDirection = sort === 'price_desc' ? 'desc' : 'asc';
    constraints.push(orderBy('price', priceDirection));

    if (pageParam) {
        constraints.push(startAfter(pageParam));
    }

    const snapshot = await getDocs(query(productsRef, ...constraints, limit(PAGE_SIZE)));
    const items = snapshot.docs
        .map(document =>
            mapFirestoreProduct(document.id, document.data() as Record<string, unknown>)
        )
        .filter(product => {
            const matchesColors =
                !filters.colors?.length ||
                product.color?.some(color => filters.colors?.includes(color));
            const matchesSizes =
                !filters.sizes?.length || product.size?.some(size => filters.sizes?.includes(size));

            return matchesColors && matchesSizes;
        });
    const nextCursor = snapshot.docs.length === PAGE_SIZE ? (snapshot.docs.at(-1) ?? null) : null;

    return {
        items,
        nextCursor,
    };
}
