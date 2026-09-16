import { Link } from '@tanstack/react-router';

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
    onAddToCart?: (product: Product) => void;
    onToggleFavorite?: (productId: number | string) => void;
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
    const productLinkParams = { productId: String(product.id) };
    const handleAddToCart = () => onAddToCart?.(product);
    const handleToggleFavorite = () => onToggleFavorite?.(product.id);

    return (
        <article
            className={cn(
                'group relative flex flex-col overflow-hidden rounded-md bg-white shadow-xs transition-shadow duration-200 hover:shadow-md',
                className
            )}
        >
            <Link
                to='/products/$productId'
                params={productLinkParams}
                className='relative block w-full overflow-hidden'
            >
                <ProductImage
                    src={product.image}
                    alt={product.title}
                />

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
            </Link>

            {onToggleFavorite && (
                <FavoriteButtonUI
                    isFavorite={isFavorite}
                    onToggleFavorite={handleToggleFavorite}
                    className='z-20'
                />
            )}

            <div className='flex flex-1 flex-col justify-between p-md'>
                <Link
                    to='/products/$productId'
                    params={productLinkParams}
                    className='line-clamp-2 font-sans text-md font-normal text-dark-charcoal hover:text-soft-red'
                    title={product.title}
                >
                    {product.title}
                </Link>

                <div className='mt-md flex items-center justify-between'>
                    <Link
                        to='/products/$productId'
                        params={productLinkParams}
                        className='flex items-center gap-sm'
                    >
                        <span className='text-md font-semibold text-dark-charcoal'>
                            {formatPrice(product.price)}
                        </span>
                        {product.oldPrice !== null && product.oldPrice !== undefined && (
                            <span className='text-sm text-muted-foreground line-through'>
                                {formatPrice(product.oldPrice)}
                            </span>
                        )}
                    </Link>

                    {onAddToCart && (
                        <AddToCartButtonUI
                            isInCart={isInCart}
                            onAddToCart={handleAddToCart}
                            disabled={product.stock <= 0}
                        />
                    )}
                </div>
            </div>
        </article>
    );
};
