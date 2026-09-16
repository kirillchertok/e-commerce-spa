import { Link, useParams } from '@tanstack/react-router';

import { useProductQuery } from '@/entities/product/api/useProductQuery';
import { Button, BUTTON_SIZE, BUTTON_STYLE } from '@/shared/ui/Button/Button';
import {
    ProductDetails,
    ProductDetailsBreadcrumbs,
    ProductDetailsSkeleton,
} from '@/widgets/ProductDetails';

export const ProductDetailsPage = () => {
    const { productId } = useParams({ from: '/_shop/products/$productId' });
    const { data: product, isLoading, isError, refetch } = useProductQuery(productId);
    const handleRefetch = () => refetch();

    return (
        <div className='mx-auto max-w-screen-2xl px-md py-lg lg:px-lg'>
            {isLoading && (
                <>
                    <div className='mb-lg h-4 w-64 animate-pulse rounded bg-matte-steel' />
                    <ProductDetailsSkeleton />
                </>
            )}

            {isError && (
                <div className='flex flex-col items-center justify-center rounded-lg border border-dashed border-matte-steel bg-white/50 py-xl text-center'>
                    <p className='text-lg font-semibold text-dark-charcoal'>
                        Unable to load this product.
                    </p>
                    <p className='mt-xs text-sm text-muted-foreground'>
                        Please try again in a moment.
                    </p>
                    <Button
                        variant={BUTTON_STYLE.FIRST}
                        size={BUTTON_SIZE.DEFAULT}
                        onClick={handleRefetch}
                        className='mt-md'
                    >
                        Try again
                    </Button>
                </div>
            )}

            {!isLoading && !isError && product === null && (
                <div className='flex flex-col items-center justify-center rounded-lg border border-dashed border-matte-steel bg-white/50 py-xl text-center'>
                    <p className='text-lg font-semibold text-dark-charcoal'>Product not found.</p>
                    <p className='mt-xs text-sm text-muted-foreground'>
                        The product you&apos;re looking for does not exist or is no longer
                        available.
                    </p>
                    <Button
                        asChild
                        variant={BUTTON_STYLE.FIRST}
                        size={BUTTON_SIZE.DEFAULT}
                        className='mt-md'
                    >
                        <Link to='/'>Back to Shopping</Link>
                    </Button>
                </div>
            )}

            {!isLoading && !isError && product && (
                <>
                    <ProductDetailsBreadcrumbs product={product} />
                    <ProductDetails product={product} />
                </>
            )}
        </div>
    );
};
