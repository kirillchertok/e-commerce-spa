import { Link } from '@tanstack/react-router';

import type { Product } from '@/entities/product/types/product.types';
import { ChevronRightIcon } from '@/shared/constants/icons';
import { cn } from '@/shared/lib/cn';

interface ProductDetailsBreadcrumbsProps {
    product: Product;
    className?: string;
}

export const ProductDetailsBreadcrumbs = ({
    product,
    className,
}: ProductDetailsBreadcrumbsProps) => {
    return (
        <nav
            aria-label='Breadcrumb'
            className={cn('mb-lg flex flex-wrap items-center gap-xs text-sm font-medium', className)}
        >
            <Link
                to='/'
                className='text-soft-red hover:underline'
            >
                Home
            </Link>

            <ChevronRightIcon className='h-4 w-4 shrink-0 text-matte-steel' />

            <Link
                to='/'
                search={{ category: product.category }}
                className='text-soft-red hover:underline'
            >
                {product.category}
            </Link>

            {product.subCategory && (
                <>
                    <ChevronRightIcon className='h-4 w-4 shrink-0 text-matte-steel' />
                    <Link
                        to='/'
                        search={{ category: product.category, subCategory: product.subCategory }}
                        className='text-soft-red hover:underline'
                    >
                        {product.subCategory}
                    </Link>
                </>
            )}

            <ChevronRightIcon className='h-4 w-4 shrink-0 text-matte-steel' />

            <span className='text-muted-foreground'>{product.title}</span>
        </nav>
    );
};
