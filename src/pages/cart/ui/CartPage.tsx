import { useState } from 'react';

import { useOrdersQuery } from '@/entities/order/api/useOrdersQuery';
import type { OrderStatus } from '@/entities/order/types/order.types';
import { OrdersEmptyState, OrdersList,OrderTabs } from '@/widgets/Orders';

const OrdersLoadingSkeleton = () => (
    <div className='flex flex-col gap-lg'>
        {[1, 2].map(key => (
            <div
                key={key}
                className='animate-pulse overflow-hidden rounded-md bg-white shadow-xs'
            >
                <div className='grid grid-cols-2 gap-md p-md md:grid-cols-4'>
                    {[1, 2, 3, 4].map(field => (
                        <div
                            key={field}
                            className='flex flex-col gap-xs'
                        >
                            <div className='h-3 w-16 rounded bg-matte-steel' />
                            <div className='h-4 w-24 rounded bg-matte-steel' />
                        </div>
                    ))}
                </div>
                <div className='border-b border-gainsboro' />
                <div className='grid grid-cols-1 gap-lg p-md sm:grid-cols-2'>
                    {[1, 2].map(product => (
                        <div
                            key={product}
                            className='flex gap-md'
                        >
                            <div className='h-40 w-32 shrink-0 rounded-md bg-matte-steel sm:h-48 sm:w-36' />
                            <div className='flex flex-1 flex-col gap-sm'>
                                <div className='h-5 w-3/4 rounded bg-matte-steel' />
                                <div className='h-4 w-1/2 rounded bg-matte-steel' />
                                <div className='h-4 w-2/3 rounded bg-matte-steel' />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ))}
    </div>
);

export const CartPage = () => {
    const [activeTab, setActiveTab] = useState<OrderStatus>('reserved');
    const { data: orders = [], isLoading } = useOrdersQuery(activeTab);

    return (
        <div className='mx-auto max-w-screen-2xl px-md py-lg lg:px-lg'>
            <OrderTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            {isLoading ? (
                <OrdersLoadingSkeleton />
            ) : orders.length === 0 ? (
                <OrdersEmptyState tab={activeTab} />
            ) : (
                <OrdersList orders={orders} />
            )}
        </div>
    );
};
