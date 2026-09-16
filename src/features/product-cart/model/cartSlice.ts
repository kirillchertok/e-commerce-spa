import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
    lineId: string;
    productId: string;
    title: string;
    image: string;
    unitPrice: number;
    stock: number;
    quantity: number;
    size?: string;
    color?: string;
}

export interface AddCartItemPayload {
    id: number | string;
    title: string;
    image: string;
    price: number;
    quantity: number;
    stock: number;
    size?: string;
    color?: string;
}

export interface CartLinePayload {
    lineId: string;
    quantity: number;
}

export function getCartLineId(id: number | string, size?: string, color?: string) {
    return [String(id), size ?? '', color ?? ''].join('::');
}

export interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'productCart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<AddCartItemPayload>) => {
            const { id, title, image, price, quantity, stock, size, color } = action.payload;
            const safeStock = Math.max(0, stock);
            const safeQuantity = Math.max(0, Math.floor(quantity));
            const productId = String(id);
            const lineId = getCartLineId(productId, size, color);
            const existing = state.items.find(item => item.lineId === lineId);

            if (safeStock === 0) {
                return;
            }

            if (existing) {
                existing.quantity = Math.min(existing.quantity + safeQuantity, safeStock);
                existing.title = title;
                existing.image = image;
                existing.unitPrice = price;
                existing.stock = safeStock;
            } else if (safeQuantity > 0) {
                state.items.push({
                    lineId,
                    productId,
                    title,
                    image,
                    unitPrice: price,
                    stock: safeStock,
                    quantity: Math.min(safeQuantity, safeStock),
                    size,
                    color,
                });
            }
        },
        setItemQuantity: (state, action: PayloadAction<CartLinePayload>) => {
            const item = state.items.find(line => line.lineId === action.payload.lineId);
            if (!item) {
                return;
            }

            item.quantity = Math.min(Math.max(0, Math.floor(action.payload.quantity)), item.stock);

            if (item.quantity === 0) {
                state.items = state.items.filter(line => line.lineId !== item.lineId);
            }
        },
        incrementItem: (state, action: PayloadAction<string>) => {
            const item = state.items.find(line => line.lineId === action.payload);
            if (item) {
                item.quantity = Math.min(item.quantity + 1, item.stock);
            }
        },
        decrementItem: (state, action: PayloadAction<string>) => {
            const item = state.items.find(line => line.lineId === action.payload);
            if (item) {
                item.quantity = Math.max(item.quantity - 1, 1);
            }
        },
        removeItem: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.lineId !== action.payload);
        },
        clearCart: state => {
            state.items = [];
        },
    },
});

export const { addItem, setItemQuantity, incrementItem, decrementItem, removeItem, clearCart } =
    cartSlice.actions;
export const cartReducer = cartSlice.reducer;
