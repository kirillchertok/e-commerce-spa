import { cn } from '@/shared/lib/cn';

export const ProductDetailsSkeleton = ({ className }: { className?: string }) => {
    return (
        <div className={cn('grid grid-cols-1 gap-lg lg:grid-cols-2 lg:gap-xl', className)}>
            <div className='aspect-square animate-pulse rounded-md bg-matte-steel' />

            <div className='flex flex-col gap-md rounded-md bg-white p-md shadow-xs md:p-lg'>
                <div className='h-8 w-3/4 animate-pulse rounded bg-matte-steel' />
                <div className='h-6 w-1/4 animate-pulse rounded bg-matte-steel' />
                <div className='h-4 w-1/3 animate-pulse rounded bg-matte-steel' />
                <div className='mt-md space-y-sm'>
                    <div className='h-4 w-full animate-pulse rounded bg-matte-steel' />
                    <div className='h-4 w-full animate-pulse rounded bg-matte-steel' />
                    <div className='h-4 w-2/3 animate-pulse rounded bg-matte-steel' />
                </div>
                <div className='mt-md flex gap-sm'>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div
                            key={index}
                            className='h-9 w-12 animate-pulse rounded-full bg-matte-steel'
                        />
                    ))}
                </div>
                <div className='mt-md h-4 w-1/4 animate-pulse rounded bg-matte-steel' />
                <div className='h-10 w-full animate-pulse rounded-md bg-matte-steel' />
            </div>
        </div>
    );
};
