import { Link, useSearch } from '@tanstack/react-router';

import type { GenderCategory } from '@/entities/product/types/product.types';
import { ChevronRightIcon } from '@/shared/constants/icons';
import { cn } from '@/shared/lib/cn';

export const CatalogBreadcrumbs = ({ className }: { className?: string }) => {
    const { gender, category, subCategory } = useSearch({ strict: false }) as {
        gender?: GenderCategory;
        category?: string;
        subCategory?: string;
    };

    const hasGender = !!gender;
    const hasCategory = !!category;

    return (
        <nav
            aria-label='Breadcrumb'
            className={cn('flex items-center gap-xs text-sm font-medium', className)}
        >
            <Link
                to='/'
                className='text-soft-red hover:underline'
            >
                Home
            </Link>

            {hasGender && (
                <>
                    <ChevronRightIcon className='h-4 w-4 text-matte-steel' />
                    <span className='cursor-pointer font-medium text-soft-red hover:underline'>
                        {gender === 'Women' ? 'Woman' : gender}
                    </span>
                </>
            )}

            {hasCategory && (
                <>
                    <ChevronRightIcon className='h-4 w-4 text-matte-steel' />
                    <span className={cn('text-muted-foreground', subCategory && 'text-soft-red')}>
                        {category}
                    </span>
                </>
            )}

            {subCategory && (
                <>
                    <ChevronRightIcon className='h-4 w-4 text-matte-steel' />
                    <span className='text-muted-foreground'>{subCategory}</span>
                </>
            )}
        </nav>
    );
};

