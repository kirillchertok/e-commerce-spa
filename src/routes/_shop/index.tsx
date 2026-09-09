import { createFileRoute } from '@tanstack/react-router';

import { Products } from '@/pages/products/ui/Products';

export const Route = createFileRoute('/_shop/')({
    component: Products,
});
