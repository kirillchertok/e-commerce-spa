import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface FavoritesState {
    favoriteIds: (number | string)[];
}

const initialState: FavoritesState = {
    favoriteIds: [],
};

const favoritesSlice = createSlice({
    name: 'productFavorites',
    initialState,
    reducers: {
        toggleFavorite: (state, action: PayloadAction<number | string>) => {
            const index = state.favoriteIds.indexOf(action.payload);
            if (index >= 0) {
                state.favoriteIds.splice(index, 1);
            } else {
                state.favoriteIds.push(action.payload);
            }
        },
        clearFavorites: (state) => {
            state.favoriteIds = [];
        },
    },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
