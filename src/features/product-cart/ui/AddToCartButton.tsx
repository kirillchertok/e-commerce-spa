import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import type { Product } from '@/entities/product/types/product.types';
import { AddToCartButtonUI } from '@/entities/product/ui/AddToCartButtonUI';

import { addItem, removeItem } from '../model/cartSlice';

interface AddToCartButtonProps {
    product: Product;
    className?: string;
}

export const AddToCartButton = ({ product, className }: AddToCartButtonProps) => {
    const dispatch = useAppDispatch();
    const lineId = `${String(product.id)}::::`;
    const inCart = useAppSelector(state => state.cart.items.some(item => item.lineId === lineId));

    const handleClick = useCallback(() => {
        if (inCart) {
            dispatch(removeItem(lineId));
        } else {
            dispatch(
                addItem({
                    id: product.id,
                    title: product.title,
                    image: product.image,
                    price: product.price,
                    quantity: 1,
                    stock: product.stock,
                })
            );
        }
    }, [dispatch, inCart, lineId, product]);

    return (
        <AddToCartButtonUI
            isInCart={inCart}
            onAddToCart={handleClick}
            className={className}
        />
    );
};
