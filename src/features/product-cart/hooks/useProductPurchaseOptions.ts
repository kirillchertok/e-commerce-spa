import { useCallback, useMemo, useState } from 'react';

import type { Product } from '@/entities/product/types/product.types';

interface UseProductPurchaseOptionsResult {
    selectedSize: string | undefined;
    selectedColor: string | undefined;
    quantity: number;
    setSelectedSize: (size: string) => void;
    setSelectedColor: (color: string) => void;
    incrementQuantity: () => void;
    decrementQuantity: () => void;
    isSizeRequired: boolean;
    isColorRequired: boolean;
    isOptionsValid: boolean;
    isPurchasable: boolean;
}

export function useProductPurchaseOptions(product: Product): UseProductPurchaseOptionsResult {
    const [selectedSize, setSelectedSizeState] = useState<string | undefined>();
    const [selectedColor, setSelectedColorState] = useState<string | undefined>();
    const [quantity, setQuantity] = useState(1);

    const isSizeRequired = Boolean(product.size && product.size.length > 0);
    const isColorRequired = Boolean(product.color && product.color.length > 1);

    const setSelectedSize = useCallback((size: string) => {
        setSelectedSizeState(size);
    }, []);

    const setSelectedColor = useCallback((color: string) => {
        setSelectedColorState(color);
    }, []);

    const incrementQuantity = useCallback(() => {
        setQuantity(current => Math.min(current + 1, product.stock));
    }, [product.stock]);

    const decrementQuantity = useCallback(() => {
        setQuantity(current => Math.max(current - 1, 1));
    }, []);

    const isOptionsValid = useMemo(() => {
        if (isSizeRequired && !selectedSize) {
            return false;
        }

        if (isColorRequired && !selectedColor) {
            return false;
        }

        return true;
    }, [isColorRequired, isSizeRequired, selectedColor, selectedSize]);

    const isPurchasable = product.stock > 0 && isOptionsValid;

    return {
        selectedSize,
        selectedColor,
        quantity,
        setSelectedSize,
        setSelectedColor,
        incrementQuantity,
        decrementQuantity,
        isSizeRequired,
        isColorRequired,
        isOptionsValid,
        isPurchasable,
    };
}
