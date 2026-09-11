import { cn } from '@/shared/lib/cn';
import { Badge } from '@/shared/ui/Badge';

import { formatPrice } from '../lib/formatPrice';
import type { Product } from '../types/product.types';
import { AddToCartButtonUI } from './AddToCartButtonUI';
import { FavoriteButtonUI } from './FavoriteButtonUI';
import { ProductImage } from './ProductImage';

interface ProductCardProps {
    product: Product;
    isInCart?: boolean;
    isFavorite?: boolean;
    onAddToCart?: () => void;
    onToggleFavorite?: () => void;
    className?: string;
}

export const ProductCard = ({
    product,
    isInCart = false,
    isFavorite = false,
    onAddToCart,
    onToggleFavorite,
    className,
}: ProductCardProps) => {
    return (
        <article
            className={cn(
                'group relative flex flex-col overflow-hidden rounded-md bg-white shadow-xs transition-shadow duration-200 hover:shadow-md',
                className
            )}
        >
            <div className='relative w-full overflow-hidden'>
                <ProductImage
                    src={product.image}
                    alt={product.title}
                />

                {onToggleFavorite && (
                    <FavoriteButtonUI
                        isFavorite={isFavorite}
                        onToggleFavorite={onToggleFavorite}
                    />
                )}

                <div className='absolute bottom-sm left-sm z-10 flex flex-wrap gap-xs'>
                    {product.isNew && (
                        <Badge className='bg-waterfall px-sm text-xs font-semibold text-white'>
                            New
                        </Badge>
                    )}
                    {product.isReserved && (
                        <Badge className='bg-marzipan px-sm text-xs font-semibold text-windsor-tan'>
                            Reserved
                        </Badge>
                    )}
                </div>
            </div>

            <div className='flex flex-1 flex-col justify-between p-md'>
                <h3
                    className='line-clamp-2 font-sans text-md font-normal text-dark-charcoal'
                    title={product.title}
                >
                    {product.title}
                </h3>

                <div className='mt-md flex items-center justify-between'>
                    <div className='flex items-center gap-sm'>
                        <span className='text-md font-semibold text-dark-charcoal'>
                            {formatPrice(product.price)}
                        </span>
                        {product.oldPrice !== null && product.oldPrice !== undefined && (
                            <span className='text-sm text-muted-foreground line-through'>
                                {formatPrice(product.oldPrice)}
                            </span>
                        )}
                    </div>

                    {onAddToCart && (
                        <AddToCartButtonUI
                            isInCart={isInCart}
                            onAddToCart={onAddToCart}
                        />
                    )}
                </div>
            </div>
        </article>
    );
};

