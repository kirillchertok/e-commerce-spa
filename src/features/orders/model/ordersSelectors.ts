import type { RootState } from '@/app/store';
import type { Order, OrderStatus } from '@/entities/order/types/order.types';

export const getEffectiveOrder = (order: Order, now = new Date()): Order => {
    if (
        order.status === 'reserved' &&
        order.reservationExpiresAt &&
        new Date(order.reservationExpiresAt) <= now
    ) {
        return { ...order, status: 'purchased', purchasedAt: order.reservationExpiresAt };
    }

    return order;
};

export const selectOrdersByStatus = (state: RootState, status: OrderStatus) =>
    state.orders.items
        .map(order => getEffectiveOrder(order))
        .filter(order => order.status === status);
