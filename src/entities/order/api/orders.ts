import {
    collection,
    doc,
    getDocs,
    runTransaction,
    serverTimestamp,
    type Timestamp as FirestoreTimestamp,
    Timestamp,
} from 'firebase/firestore';

import type { CartItem } from '@/features/product-cart/model/cartSlice';
import { db } from '@/shared/config/firebase';
import { RESERVATION_DURATION_DAYS } from '@/shared/config/reservation';

import type { Order, OrderProduct, ShopInfo } from '../types/order.types';

export interface CreateOrderPayload {
    items: CartItem[];
    shippingCountry: string;
    deliveryMethod: string;
    userId: string;
}

function getFirestore(): NonNullable<typeof db> {
    if (!db) {
        throw new Error('Firestore is not configured');
    }

    return db;
}

function toISOString(value: unknown): string | undefined {
    if (typeof value === 'string') {
        return value;
    }

    if (value && typeof (value as FirestoreTimestamp).toDate === 'function') {
        return (value as FirestoreTimestamp).toDate().toISOString();
    }

    return undefined;
}

function mapOrderProduct(data: Record<string, unknown>): OrderProduct {
    const options = data.options as Record<string, unknown> | undefined;

    return {
        id: String(data.id ?? data.productId ?? ''),
        name: String(data.name ?? data.title ?? ''),
        image: String(data.image ?? ''),
        price: Number(data.price ?? data.unitPrice ?? 0),
        quantity: data.quantity == null ? undefined : Number(data.quantity),
        options: {
            color:
                options?.color == null
                    ? String(data.color ?? '') || undefined
                    : String(options.color),
            size:
                options?.size == null ? String(data.size ?? '') || undefined : String(options.size),
        },
        deliveryTime: String(data.deliveryTime ?? ''),
        shippingCountry: String(data.shippingCountry ?? ''),
        freeShippingFrom: Number(data.freeShippingFrom ?? 0),
    };
}

function mapShop(data: unknown): ShopInfo {
    const shop = (data ?? {}) as Record<string, unknown>;

    return {
        name: String(shop.name ?? ''),
        location: String(shop.location ?? ''),
        workHours: String(shop.workHours ?? ''),
    };
}

function getDeliveryDate(): string {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 2);

    return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(deliveryDate);
}

function mapFirestoreOrder(id: string, data: Record<string, unknown>): Order {
    const products = Array.isArray(data.products) ? data.products : data.items;

    return {
        id,
        status: data.status === 'purchased' ? 'purchased' : 'reserved',
        createdAt: toISOString(data.createdAt),
        reservedAt: toISOString(data.reservedAt),
        reservationExpiresAt: toISOString(data.reservationExpiresAt),
        purchasedAt: toISOString(data.purchasedAt),
        shop: mapShop(data.shop),
        reservedTime: data.reservedTime as Order['reservedTime'],
        products: Array.isArray(products)
            ? products.map(product => mapOrderProduct(product as Record<string, unknown>))
            : [],
    };
}

export async function fetchOrders(userId: string): Promise<Order[]> {
    if (!userId) {
        return [];
    }

    const ordersRef = collection(getFirestore(), 'users', userId, 'orders');
    const snapshot = await getDocs(ordersRef);

    return snapshot.docs.map(document =>
        mapFirestoreOrder(document.id, document.data() as Record<string, unknown>)
    );
}

export async function createOrder({
    items,
    shippingCountry,
    deliveryMethod,
    userId,
}: CreateOrderPayload): Promise<string> {
    if (!userId) {
        throw new Error('User is not authenticated');
    }

    if (items.length === 0) {
        throw new Error('Cart is empty');
    }

    const firestore = getFirestore();

    return runTransaction(firestore, async transaction => {
        const snapshotItems: Array<{
            productId: string;
            title: string;
            quantity: number;
            unitPrice: number;
            size?: string;
            color?: string;
            image?: string;
            deliveryTime: string;
        }> = [];
        let total = 0;
        let shopName = '2ND HAND MARKET';

        for (const item of items) {
            const productRef = doc(firestore, 'products', item.productId);
            const productSnapshot = await transaction.get(productRef);

            if (!productSnapshot.exists()) {
                throw new Error(`Product not found: ${item.productId}`);
            }

            const productData = productSnapshot.data() as Record<string, unknown>;
            const productStock = Number(productData.stock ?? 0);
            const productPrice = Number(productData.price ?? item.unitPrice ?? 0);
            const requestedQuantity = Number(item.quantity ?? 0);

            if (requestedQuantity <= 0) {
                throw new Error(`Invalid quantity for product ${item.productId}`);
            }

            if (requestedQuantity > productStock) {
                throw new Error(`Not enough stock for product ${item.productId}`);
            }

            total += productPrice * requestedQuantity;
            shopName = String(productData.shop ?? shopName);

            snapshotItems.push({
                productId: item.productId,
                title: String(productData.title ?? item.title),
                quantity: requestedQuantity,
                unitPrice: productPrice,
                size: item.size,
                color: item.color,
                image: String(productData.image ?? item.image),
                deliveryTime: getDeliveryDate(),
            });

            transaction.update(productRef, {
                stock: productStock - requestedQuantity,
            });
        }

        const reservationExpiresAt = new Date();
        reservationExpiresAt.setDate(reservationExpiresAt.getDate() + RESERVATION_DURATION_DAYS);

        const ordersRef = collection(firestore, 'users', userId, 'orders');
        const orderRef = doc(ordersRef);

        transaction.set(orderRef, {
            userId,
            status: 'reserved',
            createdAt: serverTimestamp(),
            reservationExpiresAt: Timestamp.fromDate(reservationExpiresAt),
            shippingCountry,
            deliveryMethod,
            total,
            shop: {
                name: shopName,
                location: 'Online order',
                workHours: 'MO - FR: 9AM - 8PM',
            },
            items: snapshotItems,
        });

        return orderRef.id;
    });
}
