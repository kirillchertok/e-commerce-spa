import { createFileRoute } from '@tanstack/react-router';

import { CartPage } from '@/pages/cart/ui';

export const Route = createFileRoute('/_shop/cart')({
    component: CartPage,
});
