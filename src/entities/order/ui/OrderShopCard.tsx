import { cn } from '@/shared/lib/cn';

import type { Order } from '../types/order.types';
import { OrderProductCard } from './OrderProductCard';

interface OrderShopCardProps {
    order: Order;
    className?: string;
}

const SHOP_INFO_FIELDS = [
    { label: 'Shop', key: 'name' as const },
    { label: 'Location', key: 'location' as const },
    { label: 'Work hours', key: 'workHours' as const },
] as const;

function formatReservedDate(value: string) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return new Intl.DateTimeFormat('en-GB', {
        weekday: 'short',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    })
        .format(date)
        .toUpperCase();
}

export const OrderShopCard = ({ order, className }: OrderShopCardProps) => {
    const reservedTimeValue = order.reservedTime
        ? `${formatReservedDate(order.reservedTime.from)} - ${formatReservedDate(order.reservedTime.to)}`
        : undefined;

    return (
        <article className={cn('overflow-hidden rounded-md bg-white shadow-xs', className)}>
            <div className='grid grid-cols-2 gap-md p-md md:grid-cols-4'>
                {SHOP_INFO_FIELDS.map(({ label, key }) => (
                    <div
                        key={key}
                        className='flex flex-col gap-xs'
                    >
                        <span className='text-xs text-muted-foreground'>{label}</span>
                        <span className='text-sm font-medium text-dark-charcoal'>
                            {order.shop[key]}
                        </span>
                    </div>
                ))}

                {reservedTimeValue && (
                    <div className='flex flex-col gap-xs'>
                        <span className='text-xs text-muted-foreground'>Reserved time</span>
                        <span className='text-sm font-medium text-dark-charcoal'>
                            {reservedTimeValue}
                        </span>
                    </div>
                )}
            </div>

            <div className='border-b border-gainsboro' />

            <div className='grid grid-cols-1 gap-lg p-md sm:grid-cols-2 lg:grid-cols-3'>
                {order.products.map(product => (
                    <OrderProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </article>
    );
};
