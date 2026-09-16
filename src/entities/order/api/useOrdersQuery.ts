import { useQuery } from '@tanstack/react-query';

import { fetchOrders } from './orders';

export function useOrdersQuery(userId?: string) {
    return useQuery({
        queryKey: ['orders', userId],
        queryFn: () => fetchOrders(userId ?? ''),
        enabled: Boolean(userId),
    });
}
