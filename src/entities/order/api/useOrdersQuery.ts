import { useQuery } from '@tanstack/react-query';

import type { OrderStatus } from '../types/order.types';
import { fetchOrders } from './orders';

export function useOrdersQuery(status: OrderStatus) {
    return useQuery({
        queryKey: ['orders', status],
        queryFn: () => fetchOrders(status),
    });
}
