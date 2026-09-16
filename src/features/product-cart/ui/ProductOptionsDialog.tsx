import { useState } from 'react';

import type { Product } from '@/entities/product/types/product.types';
import { cn } from '@/shared/lib/cn';
import { Button, BUTTON_SIZE, BUTTON_STYLE } from '@/shared/ui/Button/Button';
import {
    Dialog,
    DIALOG_SIZE,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/shared/ui/Dialog';

interface ProductOptionsDialogProps {
    product: Product | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: (size?: string, color?: string) => void;
}

export const ProductOptionsDialog = ({
    product,
    open,
    onOpenChange,
    onConfirm,
}: ProductOptionsDialogProps) => {
    const [selectedSize, setSelectedSize] = useState<string>();
    const [selectedColor, setSelectedColor] = useState<string | undefined>(
        product?.color?.length === 1 ? product.color[0] : undefined
    );

    if (!product) {
        return null;
    }

    const isSizeRequired = Boolean(product.size?.length);
    const isColorRequired = Boolean(product.color && product.color.length > 1);
    const isValid =
        (!isSizeRequired || Boolean(selectedSize)) && (!isColorRequired || Boolean(selectedColor));

    const handleSizeChange = (event: React.MouseEvent<HTMLButtonElement>) => {
        setSelectedSize(event.currentTarget.dataset.value);
    };

    const handleColorChange = (event: React.MouseEvent<HTMLButtonElement>) => {
        setSelectedColor(event.currentTarget.dataset.value);
    };

    const handleConfirm = () => {
        if (isValid) {
            onConfirm(selectedSize, selectedColor);
        }
    };

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent size={DIALOG_SIZE.PRODUCT_OPTIONS}>
                <DialogHeader>
                    <DialogTitle>Select product options</DialogTitle>
                    <DialogDescription>{product.title}</DialogDescription>
                </DialogHeader>

                <div className='flex min-h-24 flex-col gap-lg'>
                    {product.size && product.size.length > 0 && (
                        <fieldset className='flex flex-col gap-sm'>
                            <legend className='text-sm font-semibold text-dark-charcoal'>
                                Size
                            </legend>
                            <div className='flex flex-wrap gap-sm'>
                                {product.size.map(size => (
                                    <Button
                                        key={size}
                                        type='button'
                                        variant={BUTTON_STYLE.FILTER}
                                        size={BUTTON_SIZE.DEFAULT}
                                        onClick={handleSizeChange}
                                        data-value={size}
                                        className={cn(
                                            'rounded-sm border px-md py-sm text-sm transition-colors',
                                            selectedSize === size
                                                ? 'border-soft-red bg-soft-red text-white'
                                                : 'border-matte-steel bg-white text-dark-charcoal hover:border-soft-red'
                                        )}
                                        aria-pressed={selectedSize === size}
                                    >
                                        {size}
                                    </Button>
                                ))}
                            </div>
                        </fieldset>
                    )}

                    {product.color && product.color.length > 0 && (
                        <fieldset className='flex flex-col gap-sm'>
                            <legend className='text-sm font-semibold text-dark-charcoal'>
                                Color
                            </legend>
                            <div className='flex flex-wrap gap-sm'>
                                {product.color.map(color => (
                                    <Button
                                        key={color}
                                        type='button'
                                        variant={BUTTON_STYLE.FILTER}
                                        size={BUTTON_SIZE.DEFAULT}
                                        onClick={handleColorChange}
                                        data-value={color}
                                        className={cn(
                                            'rounded-sm border px-md py-sm text-sm transition-colors',
                                            selectedColor === color
                                                ? 'border-soft-red bg-soft-red text-white'
                                                : 'border-matte-steel bg-white text-dark-charcoal hover:border-soft-red'
                                        )}
                                        aria-pressed={selectedColor === color}
                                    >
                                        {color}
                                    </Button>
                                ))}
                            </div>
                        </fieldset>
                    )}
                </div>

                <div className='mt-md flex justify-end'>
                    <Button
                        type='button'
                        variant={BUTTON_STYLE.ADD_TO_CART}
                        size={BUTTON_SIZE.DEFAULT}
                        onClick={handleConfirm}
                        disabled={!isValid || product.stock <= 0}
                    >
                        Add to Cart
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
