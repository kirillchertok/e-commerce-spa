import { useCallback, useState } from 'react';

import { SlidersIcon } from '@/shared/constants/icons';
import { cn } from '@/shared/lib/cn';
import { Button, BUTTON_SIZE, BUTTON_STYLE } from '@/shared/ui/Button/Button';
import { CatalogBreadcrumbs } from '@/widgets/CatalogBreadcrumbs';
import { CatalogFilters } from '@/widgets/CatalogFilters';
import { CatalogSidebar } from '@/widgets/CatalogSidebar';
import { ProductGrid } from '@/widgets/ProductGrid';

export const ProductsPage = () => {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    const handleToggleSidebar = useCallback(() => {
        setIsMobileSidebarOpen(prev => !prev);
    }, []);

    return (
        <div className='mx-auto max-w-screen-2xl px-md py-lg lg:px-lg'>
            <div className='mb-lg md:hidden'>
                <Button
                    variant={BUTTON_STYLE.FILTER}
                    size={BUTTON_SIZE.DEFAULT}
                    onClick={handleToggleSidebar}
                    className='gap-sm'
                >
                    <SlidersIcon className='h-4 w-4' />
                    <span>{isMobileSidebarOpen ? 'Hide Categories' : 'Show Categories'}</span>
                </Button>
            </div>

            <div
                className={cn(
                    'mb-lg rounded-md border border-matte-steel bg-white p-md md:hidden',
                    !isMobileSidebarOpen && 'hidden'
                )}
            >
                <CatalogSidebar />
            </div>

            <div className='flex items-start gap-lg'>
                <CatalogSidebar className='sticky top-lg hidden w-44 shrink-0 md:block' />

                <div className='flex min-w-0 flex-1 flex-col gap-lg'>
                    <CatalogBreadcrumbs />
                    <CatalogFilters />
                    <ProductGrid />
                </div>
            </div>
        </div>
    );
};

