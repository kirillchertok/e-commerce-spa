import { getStockStatus } from '@/entities/product/lib/getStockStatus';
import type { Product } from '@/entities/product/types/product.types';
import { useProductPurchaseOptions } from '@/features/product-cart/hooks/useProductPurchaseOptions';
import { AddConfiguredProductButton } from '@/features/product-cart/ui/AddConfiguredProductButton';
import { cn } from '@/shared/lib/cn';
import { Badge } from '@/shared/ui/Badge';
import { Button, BUTTON_SIZE, BUTTON_STYLE } from '@/shared/ui/Button/Button';

import { ProductOptions } from './ProductOptions';

interface ProductPurchaseProps {
    product: Product;
    className?: string;
}

const stockStatusStyles = {
    'In Stock': 'bg-waterfall text-white',
    'Low Stock': 'bg-marzipan text-windsor-tan',
    'Out of Stock': 'bg-gainsboro text-muted-foreground',
} as const;

export const ProductPurchase = ({ product, className }: ProductPurchaseProps) => {
    const {
        selectedSize,
        selectedColor,
        quantity,
        setSelectedSize,
        setSelectedColor,
        incrementQuantity,
        decrementQuantity,
        isPurchasable,
    } = useProductPurchaseOptions(product);

    const stockStatus = getStockStatus(product.stock);

    return (
        <div className={cn('flex flex-col gap-lg border-t border-gainsboro pt-lg', className)}>
            <ProductOptions
                product={product}
                selectedSize={selectedSize}
                selectedColor={selectedColor}
                onSizeChange={setSelectedSize}
                onColorChange={setSelectedColor}
            />

            <div className='flex flex-col gap-sm'>
                <p className='text-sm text-dark-charcoal'>
                    Stock: <span className='font-semibold'>{product.stock}</span>
                </p>
                <Badge
                    className={cn(
                        'w-fit px-sm text-xs font-semibold',
                        stockStatusStyles[stockStatus]
                    )}
                >
                    {stockStatus}
                </Badge>
            </div>

            {product.stock > 0 && (
                <div className='flex items-center gap-md'>
                    <span className='text-sm font-medium text-muted-foreground'>Quantity</span>
                    <div className='flex items-center gap-sm'>
                        <Button
                            type='button'
                            variant={BUTTON_STYLE.ICON}
                            size={BUTTON_SIZE.DEFAULT}
                            onClick={decrementQuantity}
                            disabled={quantity <= 1}
                            aria-label='Decrease quantity'
                            className='h-9 w-9 text-dark-charcoal'
                        >
                            −
                        </Button>
                        <span className='min-w-8 text-center text-md font-semibold text-dark-charcoal'>
                            {quantity}
                        </span>
                        <Button
                            type='button'
                            variant={BUTTON_STYLE.ICON}
                            size={BUTTON_SIZE.DEFAULT}
                            onClick={incrementQuantity}
                            disabled={quantity >= product.stock}
                            aria-label='Increase quantity'
                            className='h-9 w-9 text-dark-charcoal'
                        >
                            +
                        </Button>
                    </div>
                </div>
            )}

            <AddConfiguredProductButton
                product={product}
                selectedSize={selectedSize}
                selectedColor={selectedColor}
                quantity={quantity}
                disabled={!isPurchasable}
            />
        </div>
    );
};
