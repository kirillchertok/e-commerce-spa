import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { AddToCartButtonUI } from '@/entities/product/ui/AddToCartButtonUI';

import { toggleCartItem } from '../model/cartSlice';

interface AddToCartButtonProps {
    productId: number | string;
    className?: string;
}

export const AddToCartButton = ({ productId, className }: AddToCartButtonProps) => {
    const dispatch = useAppDispatch();
    const inCart = useAppSelector(state => state.cart.items.some(item => item.id === productId));

    const handleClick = useCallback(() => {
        dispatch(toggleCartItem(productId));
    }, [dispatch, productId]);

    return (
        <AddToCartButtonUI
            isInCart={inCart}
            onAddToCart={handleClick}
            className={className}
        />
    );
};

