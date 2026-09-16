import { createFileRoute } from '@tanstack/react-router';

import { OrdersPage } from '@/pages/orders/ui';

export const Route = createFileRoute('/_shop/orders')({
    component: OrdersPage,
});
