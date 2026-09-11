import { combineReducers } from '@reduxjs/toolkit';

import { authReducer } from '@/features/auth/model/authSlice';
import { cartReducer } from '@/features/product-cart/model/cartSlice';
import { favoritesReducer } from '@/features/product-favorites/model/favoritesSlice';

/**
 * Redux store structure
 *
 * Persisted global state:
 * - auth: User authentication state (persisted to localStorage)
 * - cart: Shopping cart items
 * - favorites: Favorite product IDs
 *
 * NOTE: Catalog filters are NOT stored in Redux!
 * They are managed by TanStack Router search params (URL is the source of truth)
 * See: ProductFilters type in entities/product/types/product.types.ts
 * And: searchParamsUtils in features/catalog-filters/lib/
 */
export const rootReducer = combineReducers({
    auth: authReducer,
    favorites: favoritesReducer,
    cart: cartReducer,
});
