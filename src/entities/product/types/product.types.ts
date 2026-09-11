export interface Product {
    id: number | string;
    title: string;
    price: number;
    oldPrice: number | null;
    isNew?: boolean;
    isReserved?: boolean;
    image: string;
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
    nextPage: number | null;
    totalCount: number;
}

