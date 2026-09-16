import { ChevronDown } from 'lucide-react';

import { formatPrice } from '@/entities/product/lib/formatPrice';
import { cn } from '@/shared/lib/cn';
import { Button, BUTTON_SIZE, BUTTON_STYLE } from '@/shared/ui/Button/Button';

import type { OrderProduct } from '../types/order.types';

interface OrderProductCardProps {
    product: OrderProduct;
    className?: string;
}

export const OrderProductCard = ({ product, className }: OrderProductCardProps) => {
    return (
        <div className={cn('flex flex-col gap-md sm:flex-row', className)}>
            <div className='relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-md bg-matte-steel sm:aspect-auto sm:h-48 sm:w-36'>
                <img
                    src={product.image}
                    alt={product.name}
                    loading='lazy'
                    className='h-full w-full object-cover'
                />
            </div>

            <div className='flex min-w-0 flex-1 flex-col gap-sm'>
                <h3 className='font-serif text-base font-medium leading-snug text-dark-charcoal'>
                    {product.name}
                </h3>

                <div className='flex flex-col gap-xs text-sm'>
                    <div className='flex gap-xs'>
                        <span className='text-muted-foreground'>Price:</span>
                        <span className='text-dark-charcoal'>{formatPrice(product.price)}</span>
                    </div>

                    <div className='flex flex-wrap gap-x-md gap-y-xs'>
                        {product.options.color && (
                            <div className='flex gap-xs'>
                                <span className='text-muted-foreground'>Color:</span>
                                <span className='text-dark-charcoal'>{product.options.color}</span>
                            </div>
                        )}
                        {product.options.size && (
                            <div className='flex gap-xs'>
                                <span className='text-muted-foreground'>Size:</span>
                                <span className='text-dark-charcoal'>{product.options.size}</span>
                            </div>
                        )}
                    </div>

                    <div className='flex gap-xs'>
                        <span className='text-muted-foreground'>Delivery time:</span>
                        <span className='text-dark-charcoal'>{product.deliveryTime}</span>
                    </div>
                </div>

                <div className='mt-xs flex flex-col gap-xs'>
                    <Button
                        type='button'
                        variant={BUTTON_STYLE.LINK}
                        size={BUTTON_SIZE.DEFAULT}
                        className='flex w-fit items-center gap-xs text-sm text-dark-charcoal'
                        aria-label={`Shipping to ${product.shippingCountry}`}
                    >
                        <span>Shipping to {product.shippingCountry}</span>
                        <ChevronDown className='h-4 w-4' />
                    </Button>
                    <p className='text-sm text-muted-foreground'>
                        Free shipping from {formatPrice(product.freeShippingFrom)}
                    </p>
                </div>
            </div>
        </div>
    );
};
