import type { Order } from '@/entities/order/types/order.types';

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
