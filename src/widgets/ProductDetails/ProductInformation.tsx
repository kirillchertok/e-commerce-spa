import { formatPrice } from '@/entities/product/lib/formatPrice';
import type { Product } from '@/entities/product/types/product.types';
import { FavoriteButton } from '@/features/product-favorites/ui/FavoriteButton';
import { cn } from '@/shared/lib/cn';
import { Badge } from '@/shared/ui/Badge';

interface ProductInformationProps {
    product: Product;
    className?: string;
}

export const ProductInformation = ({ product, className }: ProductInformationProps) => {
    return (
        <div className={cn('flex flex-col gap-md', className)}>
            <div className='flex items-start justify-between gap-md'>
                <h1 className='text-xl font-semibold text-dark-charcoal md:text-2xl'>
                    {product.title}
                </h1>
                <FavoriteButton productId={product.id} />
            </div>

            <div className='flex flex-wrap items-center gap-sm'>
                <span className='text-xl font-semibold text-dark-charcoal'>
                    {formatPrice(product.price)}
                </span>
                {product.oldPrice !== null && product.oldPrice !== undefined && (
                    <span className='text-md text-muted-foreground line-through'>
                        {formatPrice(product.oldPrice)}
                    </span>
                )}
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

            <div>
                <p className='text-sm font-medium text-muted-foreground'>Category</p>
                <p className='text-md text-dark-charcoal'>{product.category}</p>
            </div>

            {product.description && (
                <div>
                    <p className='mb-xs text-sm font-medium text-muted-foreground'>Description</p>
                    <p className='text-md leading-relaxed whitespace-pre-wrap text-dark-charcoal'>
                        {product.description}
                    </p>
                </div>
            )}
        </div>
    );
};
