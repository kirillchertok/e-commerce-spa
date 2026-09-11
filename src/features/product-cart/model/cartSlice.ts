import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
    id: number | string;
    quantity: number;
}

export interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [
        { id: 2, quantity: 1 },
        { id: 4, quantity: 1 },
        { id: 9, quantity: 1 },
    ],
};

const cartSlice = createSlice({
    name: 'productCart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<number | string>) => {
            const existing = state.items.find((item) => item.id === action.payload);
            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({ id: action.payload, quantity: 1 });
            }
        },
        toggleCartItem: (state, action: PayloadAction<number | string>) => {
            const index = state.items.findIndex((item) => item.id === action.payload);
            if (index >= 0) {
                state.items.splice(index, 1);
            } else {
                state.items.push({ id: action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action: PayloadAction<number | string>) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addToCart, toggleCartItem, removeFromCart, clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
