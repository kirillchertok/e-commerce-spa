import { useState } from 'react';

import { cn } from '@/shared/lib/cn';

interface ProductImageProps {
    src: string;
    alt: string;
    className?: string;
    loading?: 'eager' | 'lazy';
}

export const ProductImage = ({ src, alt, className, loading = 'lazy' }: ProductImageProps) => {
    const [isLoaded, setIsLoaded] = useState(!src);
    const [hasError, setHasError] = useState(!src);

    const handleLoad = () => setIsLoaded(true);

    const handleError = () => {
        setHasError(true);
        setIsLoaded(true);
    };

    return (
        <div className={cn('relative aspect-3/4 w-full overflow-hidden bg-matte-steel', className)}>
            {!isLoaded && !hasError && (
                <div className='absolute inset-0 animate-pulse bg-matte-steel' />
            )}
            {src && !hasError ? (
                <img
                    src={src}
                    alt={alt}
                    loading={loading}
                    onLoad={handleLoad}
                    onError={handleError}
                    className={cn(
                        'h-full w-full object-cover transition-transform duration-300 group-hover:scale-105',
                        isLoaded ? 'opacity-100' : 'opacity-0'
                    )}
                />
            ) : (
                <div className='flex h-full w-full items-center justify-center text-sm text-muted-foreground'>
                    Image unavailable
                </div>
            )}
        </div>
    );
};
