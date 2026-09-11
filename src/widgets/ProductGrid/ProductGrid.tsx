import { useSearch } from '@tanstack/react-router';
import { useCallback, useEffect, useRef } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { useInfiniteProducts } from '@/entities/product/api/useInfiniteProducts';
import type {
    GenderCategory,
    Product,
    ProductFilters,
} from '@/entities/product/types/product.types';
import { ProductCard } from '@/entities/product/ui/ProductCard';
import type { CatalogSearchParams } from '@/features/catalog-filters/model/searchParams';
import { SORT_DESC } from '@/features/catalog-filters/model/searchParams';
import { toggleCartItem } from '@/features/product-cart/model/cartSlice';
import { toggleFavorite } from '@/features/product-favorites/model/favoritesSlice';
import { cn } from '@/shared/lib/cn';
import { Button, BUTTON_SIZE, BUTTON_STYLE } from '@/shared/ui/Button/Button';

const GRID_COLUMNS_CLASS = 'grid grid-cols-1 gap-md sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';

export const ProductGrid = ({ className }: { className?: string }) => {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector(state => state.cart.items);
    const favoriteIds = useAppSelector(state => state.favorites.favoriteIds);

    const search = useSearch({ strict: false }) as CatalogSearchParams;

    const sort = search.sort === SORT_DESC ? 'price_desc' : 'price_asc';

    const filters: ProductFilters = {
        gender: search.gender as GenderCategory | undefined,
        category: search.category,
        subCategory: search.subCategory,
        colors: search.colors,
        sizes: search.sizes,
        brands: search.brands,
        conditions: search.conditions,
        shops: search.shops,
        sale: search.sale,
        search: search.search,
    };

    const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } =
        useInfiniteProducts(filters, sort);

    const loadMoreRef = useRef<HTMLDivElement>(null);

    const handleLoadMore = useCallback(() => {
        fetchNextPage();
    }, [fetchNextPage]);

    const handleAddToCart = useCallback(
        (productId: number | string) => {
            dispatch(toggleCartItem(productId));
        },
        [dispatch]
    );

    const handleToggleFavorite = useCallback(
        (productId: number | string) => {
            dispatch(toggleFavorite(productId));
        },
        [dispatch]
    );

    useEffect(() => {
        if (!hasNextPage || isFetchingNextPage) {
            return;
        }

        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting) {
                    fetchNextPage();
                }
            },
            { threshold: 0.1, rootMargin: '100px' }
        );

        const currentRef = loadMoreRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    const allProducts: Product[] = data?.pages.flatMap(page => page.items) || [];

    if (isLoading) {
        return (
            <div className={cn(GRID_COLUMNS_CLASS, className)}>
                {Array.from({ length: 8 }).map((_, index) => (
                    <div
                        key={index}
                        className='h-72 animate-pulse rounded-md bg-matte-steel'
                    />
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <div className='flex flex-col items-center justify-center py-xl text-center text-error'>
                <p className='text-lg font-semibold'>Failed to load products</p>
                <p className='text-sm text-muted-foreground'>
                    {error instanceof Error ? error.message : 'Unknown error'}
                </p>
            </div>
        );
    }

    if (allProducts.length === 0) {
        return (
            <div className='flex flex-col items-center justify-center rounded-lg border border-dashed border-matte-steel bg-white/50 py-xl text-center'>
                <p className='text-lg font-medium text-dark-charcoal'>
                    No products match your criteria
                </p>
                <p className='mt-xs text-sm text-muted-foreground'>
                    Try adjusting or resetting your active filters
                </p>
            </div>
        );
    }

    return (
        <div className={cn('flex flex-col gap-lg', className)}>
            <div className={GRID_COLUMNS_CLASS}>
                {allProducts.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        isInCart={cartItems.some(item => item.id === product.id)}
                        isFavorite={favoriteIds.includes(product.id)}
                        onAddToCart={() => handleAddToCart(product.id)}
                        onToggleFavorite={() => handleToggleFavorite(product.id)}
                    />
                ))}
            </div>

            <div
                ref={loadMoreRef}
                className='flex items-center justify-center py-md'
            >
                {isFetchingNextPage ? (
                    <div className='flex items-center gap-sm text-sm font-semibold text-muted-foreground'>
                        <div className='h-4 w-4 animate-spin rounded-full border-2 border-gemma border-t-transparent' />
                        <span>Loading more products...</span>
                    </div>
                ) : hasNextPage ? (
                    <Button
                        variant={BUTTON_STYLE.FILTER}
                        size={BUTTON_SIZE.DEFAULT}
                        onClick={handleLoadMore}
                        className='text-muted-foreground'
                    >
                        Load more
                    </Button>
                ) : (
                    <span className='text-sm text-muted-foreground'>All products loaded</span>
                )}
            </div>
        </div>
    );
};

