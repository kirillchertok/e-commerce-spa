import { useNavigate, useSearch } from '@tanstack/react-router';
import { useCallback } from 'react';

import type { CatalogSearchParams } from '@/features/catalog-filters/model/searchParams';
import { SORT_ASC, SORT_DESC } from '@/features/catalog-filters/model/searchParams';
import { cn } from '@/shared/lib/cn';
import { Button, BUTTON_SIZE, BUTTON_STYLE } from '@/shared/ui/Button/Button';

export const SortBar = ({ className }: { className?: string }) => {
    const navigate = useNavigate();
    const { sort } = useSearch({ strict: false }) as CatalogSearchParams;

    const isDescending = sort === SORT_DESC;

    const handleSortAsc = useCallback(() => {
        navigate({
            to: '/',
            search: prev => ({ ...prev, sort: SORT_ASC })
        });
    }, [navigate]);

    const handleSortDesc = useCallback(() => {
        navigate({
            to: '/',
            search: prev => ({ ...prev, sort: SORT_DESC })
        });
    }, [navigate]);

    return (
        <div className={cn('flex items-center gap-md text-sm', className)}>
            <span className='font-medium text-muted-foreground'>Sort by:</span>
            <div className='flex items-center gap-lg'>
                <Button
                    variant={BUTTON_STYLE.LINK}
                    size={BUTTON_SIZE.DEFAULT}
                    onClick={handleSortAsc}
                    className={cn(
                        'text-dark-charcoal hover:text-girly-red',
                        !isDescending && 'font-semibold text-soft-red'
                    )}
                >
                    Ascending price
                </Button>
                <Button
                    variant={BUTTON_STYLE.LINK}
                    size={BUTTON_SIZE.DEFAULT}
                    onClick={handleSortDesc}
                    className={cn(
                        'text-dark-charcoal hover:text-girly-red',
                        isDescending && 'font-semibold text-soft-red'
                    )}
                >
                    Descending price
                </Button>
            </div>
        </div>
    );
};