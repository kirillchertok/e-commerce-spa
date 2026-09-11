import { useState } from 'react';

import { cn } from '@/shared/lib/cn';

interface ProductImageProps {
    src: string;
    alt: string;
    className?: string;
}

export const ProductImage = ({ src, alt, className }: ProductImageProps) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    const handleLoad = () => setIsLoaded(true);

    const handleError = () => {
        setHasError(true);
        setIsLoaded(true);
    };

    return (
        <div
            className={cn(
                'relative aspect-3/4 w-full overflow-hidden bg-matte-steel',
                className,
            )}
        >
            {!isLoaded && !hasError && (
                <div className='absolute inset-0 animate-pulse bg-matte-steel' />
            )}
            <img
                src={
                    hasError
                        ? 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=600&q=80'
                        : src
                }
                alt={alt}
                loading='lazy'
                onLoad={handleLoad}
                onError={handleError}
                className={cn(
                    'h-full w-full object-cover transition-transform duration-300 group-hover:scale-105',
                    isLoaded ? 'opacity-100' : 'opacity-0',
                )}
            />
        </div>
    );
};
