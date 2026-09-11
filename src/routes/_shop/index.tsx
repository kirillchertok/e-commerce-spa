import { createFileRoute } from '@tanstack/react-router';

import { ProductsPage } from '@/pages/products/ui';

export const Route = createFileRoute('/_shop/')({
    component: ProductsPage,
});
