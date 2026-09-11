import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { FavoriteButtonUI } from '@/entities/product/ui/FavoriteButtonUI';

import { toggleFavorite } from '../model/favoritesSlice';

interface FavoriteButtonProps {
    productId: number | string;
    className?: string;
}

export const FavoriteButton = ({ productId, className }: FavoriteButtonProps) => {
    const dispatch = useAppDispatch();
    const isFavorite = useAppSelector(state => state.favorites.favoriteIds.includes(productId));

    const handleClick = useCallback(() => {
        dispatch(toggleFavorite(productId));
    }, [dispatch, productId]);

    return (
        <FavoriteButtonUI
            isFavorite={isFavorite}
            onToggleFavorite={handleClick}
            className={className}
        />
    );
};

