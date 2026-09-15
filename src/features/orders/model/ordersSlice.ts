import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { mockOrders } from '@/entities/order/__mocks__/mockOrders';
import type { Order, OrderProduct, ShopInfo } from '@/entities/order/types/order.types';
import type { CartItem } from '@/features/product-cart/model/cartSlice';
import { RESERVATION_DURATION_DAYS } from '@/shared/config/reservation';

export interface CreateOrderPayload {
    items: CartItem[];
    shippingCountry: string;
    deliveryMethod: string;
}

export interface OrdersState {
    items: Order[];
}

const initialState: OrdersState = {
    items: mockOrders,
};

const defaultShop: ShopInfo = {
    name: '2ND HAND MARKET',
    location: 'Online order',
    workHours: 'MO - FR: 9AM - 8PM',
};

const createOrderProduct = (
    item: CartItem,
    shippingCountry: string,
    deliveryMethod: string
): OrderProduct => ({
    id: item.lineId,
    name: item.title,
    image: item.image,
    price: item.unitPrice,
    quantity: item.quantity,
    options: { color: item.color, size: item.size },
    deliveryTime: deliveryMethod,
    shippingCountry,
    freeShippingFrom: 50,
});

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        createOrderFromCart: (state, action: PayloadAction<CreateOrderPayload>) => {
            const { items, shippingCountry, deliveryMethod } = action.payload;
            if (items.length === 0) {
                return;
            }

            const now = new Date();
            const reservationExpiresAt = new Date(now);
            reservationExpiresAt.setDate(
                reservationExpiresAt.getDate() + RESERVATION_DURATION_DAYS
            );

            state.items.unshift({
                id: `order-${Date.now()}`,
                status: 'reserved',
                createdAt: now.toISOString(),
                reservedAt: now.toISOString(),
                reservationExpiresAt: reservationExpiresAt.toISOString(),
                shop: defaultShop,
                reservedTime: {
                    from: now.toISOString(),
                    to: reservationExpiresAt.toISOString(),
                },
                products: items.map(item =>
                    createOrderProduct(item, shippingCountry, deliveryMethod)
                ),
            });
        },
    },
});

export const { createOrderFromCart } = ordersSlice.actions;
export const ordersReducer = ordersSlice.reducer;
