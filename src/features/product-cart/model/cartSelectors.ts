import type { RootState } from '@/app/store';

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartTotalQuantity = (state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartLineCount = (state: RootState) => state.cart.items.length;

export const selectCartSubtotal = (state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);

export const selectCartItemByLineId = (state: RootState, lineId: string) =>
    state.cart.items.find(item => item.lineId === lineId);

export const selectCartItemByProductId = (state: RootState, productId: number | string) =>
    state.cart.items.find(item => item.productId === String(productId));

export const selectIsProductInCart = (state: RootState, productId: number | string) =>
    state.cart.items.some(item => item.productId === String(productId));
