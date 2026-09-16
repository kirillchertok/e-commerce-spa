import { useQuery } from '@tanstack/react-query';

import { getProductById } from './products';

export function useProductQuery(productId: string) {
    return useQuery({
        queryKey: ['product', productId],
        queryFn: () => getProductById(productId),
        enabled: Boolean(productId),
    });
}
