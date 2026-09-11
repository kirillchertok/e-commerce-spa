import type { GenderCategory, ProductFilters } from '@/entities/product/types/product.types';

export const SORT_ASC = 'asc';
export const SORT_DESC = 'desc';

export type SortParam = typeof SORT_ASC | typeof SORT_DESC;

export type ArrayFilterKey = 'colors' | 'sizes' | 'brands' | 'conditions' | 'shops';

const asString = (value: unknown): string | undefined =>
    typeof value === 'string' && value.length > 0 ? value : undefined;

const asStringArray = (value: unknown): string[] | undefined => {
    const list = Array.isArray(value)
        ? value.filter((item): item is string => typeof item === 'string')
        : typeof value === 'string'
          ? [value]
          : [];

    return list.length > 0 ? list : undefined;
};

export const parseProductFilters = (search: Record<string, unknown>): ProductFilters => {
    const gender = asString(search.gender);
    const sort = asString(search.sort);

    return {
        gender: gender as GenderCategory | undefined,
        category: asString(search.category),
        subCategory: asString(search.subCategory),
        colors: asStringArray(search.colors),
        sizes: asStringArray(search.sizes),
        brands: asStringArray(search.brands),
        conditions: asStringArray(search.conditions),
        shops: asStringArray(search.shops),
        sale: search.sale === true || search.sale === 'true' ? true : undefined,
        search: asString(search.search),
        sort: sort === SORT_ASC || sort === SORT_DESC ? sort : undefined,
    };
};

export const serializeProductFilters = (
    filters: ProductFilters
): Record<string, string | string[] | boolean> => {
    const result: Record<string, string | string[] | boolean> = {};

    if (filters.gender) result.gender = filters.gender;
    if (filters.category) result.category = filters.category;
    if (filters.subCategory) result.subCategory = filters.subCategory;
    if (filters.colors?.length) result.colors = filters.colors;
    if (filters.sizes?.length) result.sizes = filters.sizes;
    if (filters.brands?.length) result.brands = filters.brands;
    if (filters.conditions?.length) result.conditions = filters.conditions;
    if (filters.shops?.length) result.shops = filters.shops;
    if (filters.sale) result.sale = true;
    if (filters.search) result.search = filters.search;
    if (filters.sort) result.sort = filters.sort;

    return result;
};

export const withToggledValue = (
    list: string[] | undefined,
    value: string
): string[] | undefined => {
    const current = list ?? [];
    const next = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];

    return next.length > 0 ? next : undefined;
};

export const withToggledFilterValue = (
    filters: ProductFilters,
    key: ArrayFilterKey,
    value: string
): ProductFilters => ({
    ...filters,
    [key]: withToggledValue(filters[key] as string[] | undefined, value),
});

/**
 * Remove all filters and return empty ProductFilters
 */
export const resetFilters = (): ProductFilters => ({});
