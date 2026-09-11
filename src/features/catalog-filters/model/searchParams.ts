import type { ProductFilters } from '@/entities/product/types/product.types';

// Re-export from lib for backward compatibility
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

// CatalogSearchParams is an alias for ProductFilters for backward compatibility
export type CatalogSearchParams = ProductFilters;

