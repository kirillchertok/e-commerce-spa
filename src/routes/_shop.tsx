import { createFileRoute } from '@tanstack/react-router';

import { ShopLayout } from '@/app/layouts/ShopLayout';
import { parseCatalogSearch } from '@/features/catalog-filters/model/searchParams';

export const Route = createFileRoute('/_shop')({
    validateSearch: parseCatalogSearch,
    component: ShopLayout,
});
