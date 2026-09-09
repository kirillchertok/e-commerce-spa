import { createFileRoute } from '@tanstack/react-router';

import { ShopLayout } from '@/app/layouts/ShopLayout';

export const Route = createFileRoute('/_shop')({
    component: ShopLayout,
});
