import type { Product } from '@/entities/product/types/product.types';
import { cn } from '@/shared/lib/cn';
import { Button, BUTTON_SIZE, BUTTON_STYLE } from '@/shared/ui/Button/Button';

interface ProductOptionsProps {
    product: Product;
    selectedSize?: string;
    selectedColor?: string;
    onSizeChange: (size: string) => void;
    onColorChange: (color: string) => void;
    className?: string;
}

export const ProductOptions = ({
    product,
    selectedSize,
    selectedColor,
    onSizeChange,
    onColorChange,
    className,
}: ProductOptionsProps) => {
    const hasSizes = Boolean(product.size && product.size.length > 0);
    const hasColors = Boolean(product.color && product.color.length > 1);

    if (!hasSizes && !hasColors) {
        return null;
    }

    const handleSizeChange = (event: React.MouseEvent<HTMLButtonElement>) => {
        onSizeChange(event.currentTarget.dataset.value ?? '');
    };

    const handleColorChange = (event: React.MouseEvent<HTMLButtonElement>) => {
        onColorChange(event.currentTarget.dataset.value ?? '');
    };

    return (
        <div className={cn('flex flex-col gap-md', className)}>
            {hasSizes && (
                <div>
                    <p className='mb-sm text-sm font-medium text-muted-foreground'>Size</p>
                    <div className='flex flex-wrap gap-sm'>
                        {product.size?.map(size => (
                            <Button
                                key={size}
                                type='button'
                                variant={BUTTON_STYLE.FILTER}
                                size={BUTTON_SIZE.DEFAULT}
                                onClick={handleSizeChange}
                                data-value={size}
                                className={cn(
                                    selectedSize === size &&
                                        'border-soft-red bg-white text-soft-red ring-1 ring-soft-red'
                                )}
                            >
                                {size}
                            </Button>
                        ))}
                    </div>
                </div>
            )}

            {hasColors && (
                <div>
                    <p className='mb-sm text-sm font-medium text-muted-foreground'>Color</p>
                    <div className='flex flex-wrap gap-sm'>
                        {product.color?.map(color => (
                            <Button
                                key={color}
                                type='button'
                                variant={BUTTON_STYLE.FILTER}
                                size={BUTTON_SIZE.DEFAULT}
                                onClick={handleColorChange}
                                data-value={color}
                                className={cn(
                                    selectedColor === color &&
                                        'border-soft-red bg-white text-soft-red ring-1 ring-soft-red'
                                )}
                            >
                                {color}
                            </Button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
