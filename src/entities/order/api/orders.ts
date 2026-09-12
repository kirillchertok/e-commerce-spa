import { mockOrders } from '../__mocks__/mockOrders';
import type { Order, OrderStatus } from '../types/order.types';

export async function fetchOrders(status: OrderStatus): Promise<Order[]> {
    await new Promise(resolve => setTimeout(resolve, 300));

    return mockOrders.filter(order => order.status === status);
}
