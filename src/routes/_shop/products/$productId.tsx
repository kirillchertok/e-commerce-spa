import { createFileRoute } from '@tanstack/react-router';

import { ProductDetailsPage } from '@/pages/product-details/ui';

export const Route = createFileRoute('/_shop/products/$productId')({
    component: ProductDetailsPage,
});
