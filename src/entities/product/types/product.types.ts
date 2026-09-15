import type { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

export type StockStatus = 'Out of Stock' | 'Low Stock' | 'In Stock';

export interface Product {
    id: string;
    title: string;
    description?: string;
    price: number;
    oldPrice: number | null;
    isNew?: boolean;
    isReserved?: boolean;
    image: string;
    images?: string[];
    stock: number;
    category: string;
    subCategory?: string;
    gender?: GenderCategory[];
    color?: string[];
    size?: string[];
    brand?: string;
    condition?: 'New' | 'Like New' | 'Good' | 'Fair';
    shop?: string;
    isSale?: boolean;
}

export type GenderCategory = 'Women' | 'Men' | 'Unisex' | 'Children' | 'New';

export type SortOrder = 'price_asc' | 'price_desc' | null;

export type SortParam = 'asc' | 'desc';

export type ProductPageCursor = QueryDocumentSnapshot<DocumentData>;

export interface ProductFilters {
    gender?: GenderCategory;
    category?: string;
    subCategory?: string;
    colors?: string[];
    sizes?: string[];
    brands?: string[];
    conditions?: string[];
    shops?: string[];
    sale?: boolean;
    search?: string;
    sort?: SortParam;
    subSubCategory?: string;
    priceRange?: [number, number];
}

export interface PaginatedProductsResponse {
    items: Product[];
    nextCursor: ProductPageCursor | null;
}
