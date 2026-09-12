export type OrderStatus = 'reserved' | 'purchased';

export interface ShopInfo {
    name: string;
    location: string;
    workHours: string;
}

export interface OrderProduct {
    id: string;
    name: string;
    image: string;
    price: number;
    options: {
        color?: string;
        size?: string;
    };
    deliveryTime: string;
    shippingCountry: string;
    freeShippingFrom: number;
}

export interface Order {
    id: string;
    shop: ShopInfo;
    reservedTime?: {
        from: string;
        to: string;
    };
    products: OrderProduct[];
    status: OrderStatus;
}
