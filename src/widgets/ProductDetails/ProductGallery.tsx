import { useState } from 'react';

import { getProductImages } from '@/entities/product/lib/getProductImages';
import type { Product } from '@/entities/product/types/product.types';
import { ProductImage } from '@/entities/product/ui/ProductImage';
import { cn } from '@/shared/lib/cn';
import { Button, BUTTON_SIZE, BUTTON_STYLE } from '@/shared/ui/Button/Button';

interface ProductGalleryProps {
    product: Product;
    className?: string;
}

export const ProductGallery = ({ product, className }: ProductGalleryProps) => {
    const images = getProductImages(product);
    const [activeIndex, setActiveIndex] = useState(0);
    const activeImage = images[activeIndex] ?? product.image;
    const hasMultipleImages = images.length > 1;
    const handleThumbnailClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setActiveIndex(Number(event.currentTarget.dataset.index));
    };

    return (
        <div className={cn('flex flex-col gap-md', className)}>
            <div className='overflow-hidden rounded-md bg-white shadow-xs'>
                <ProductImage
                    src={activeImage}
                    alt={product.title}
                    loading='eager'
                    className='aspect-square'
                />
            </div>

            {hasMultipleImages && (
                <div className='flex gap-sm overflow-x-auto pb-xs'>
                    {images.map((image, index) => (
                        <Button
                            key={`${image}-${index}`}
                            type='button'
                            variant={BUTTON_STYLE.ICON}
                            size={BUTTON_SIZE.DEFAULT}
                            onClick={handleThumbnailClick}
                            data-index={index}
                            aria-label={`View image ${index + 1}`}
                            aria-current={activeIndex === index ? 'true' : undefined}
                            className={cn(
                                'h-16 w-16 shrink-0 overflow-hidden rounded-md border-2 bg-white transition-colors',
                                activeIndex === index
                                    ? 'border-soft-red'
                                    : 'border-matte-steel hover:border-gainsboro'
                            )}
                        >
                            <img
                                src={image}
                                alt=''
                                loading='lazy'
                                className='h-full w-full object-cover'
                            />
                        </Button>
                    ))}
                </div>
            )}
        </div>
    );
};
