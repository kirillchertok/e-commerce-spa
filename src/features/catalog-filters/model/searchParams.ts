import type { ProductFilters } from '@/entities/product/types/product.types';

export {
    type ArrayFilterKey,
    parseProductFilters as parseCatalogSearch,
    resetFilters,
    serializeProductFilters,
    SORT_ASC,
    SORT_DESC,
    type SortParam,
    withToggledFilterValue,
    withToggledValue,
} from '../lib/searchParamsUtils';

export type CatalogSearchParams = ProductFilters;

