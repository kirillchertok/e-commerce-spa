import { useCallback } from 'react';

import { useAppDispatch } from '@/app/store/hooks';
import type { Product } from '@/entities/product/types/product.types';
import { cn } from '@/shared/lib/cn';
import { Button, BUTTON_SIZE, BUTTON_STYLE } from '@/shared/ui/Button/Button';

import { addItem } from '../model/cartSlice';

interface AddConfiguredProductButtonProps {
    product: Product;
    selectedSize?: string;
    selectedColor?: string;
    quantity: number;
    disabled?: boolean;
    className?: string;
}

export const AddConfiguredProductButton = ({
    product,
    selectedSize,
    selectedColor,
    quantity,
    disabled = false,
    className,
}: AddConfiguredProductButtonProps) => {
    const dispatch = useAppDispatch();

    const handleAddToCart = useCallback(() => {
        dispatch(
            addItem({
                id: product.id,
                title: product.title,
                image: product.image,
                price: product.price,
                quantity,
                stock: product.stock,
                size: selectedSize,
                color: selectedColor,
            })
        );
    }, [
        dispatch,
        product.id,
        product.image,
        product.price,
        product.stock,
        product.title,
        quantity,
        selectedColor,
        selectedSize,
    ]);

    return (
        <Button
            variant={BUTTON_STYLE.ADD_TO_CART}
            size={BUTTON_SIZE.LARGE}
            onClick={handleAddToCart}
            disabled={disabled}
            className={cn('w-full py-md text-md font-semibold', className)}
        >
            Add to Cart
        </Button>
    );
};
