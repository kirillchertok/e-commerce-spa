import { combineReducers } from '@reduxjs/toolkit';

import { authReducer } from '@/features/auth/model/authSlice';
import { ordersReducer } from '@/features/orders/model/ordersSlice';
import { cartReducer } from '@/features/product-cart/model/cartSlice';
import { favoritesReducer } from '@/features/product-favorites/model/favoritesSlice';

export const rootReducer = combineReducers({
    auth: authReducer,
    favorites: favoritesReducer,
    cart: cartReducer,
    orders: ordersReducer,
});
