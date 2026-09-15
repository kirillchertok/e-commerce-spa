import { useState } from 'react';

import { useAppSelector } from '@/app/store/hooks';
import { useOrdersQuery } from '@/entities/order/api/useOrdersQuery';
import type { OrderStatus } from '@/entities/order/types/order.types';
import { getEffectiveOrder } from '@/features/orders/model/ordersSelectors';
import { OrdersEmptyState, OrdersList, OrderTabs } from '@/widgets/Orders';

export const OrdersPage = () => {
    const [activeTab, setActiveTab] = useState<OrderStatus>('reserved');
    const { user, isLoading: isAuthLoading } = useAppSelector(state => state.auth);
    const { data: loadedOrders = [], isPending, isError, error } = useOrdersQuery(user?.uid);
    const orders = loadedOrders
        .map(order => getEffectiveOrder(order))
        .filter(order => order.status === activeTab);

    return (
        <div className='mx-auto max-w-screen-2xl px-md py-lg lg:px-lg'>
            <h1 className='sr-only'>Orders</h1>
            <OrderTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            {isAuthLoading || isPending ? (
                <p className='py-xl text-center text-muted-foreground'>Loading orders...</p>
            ) : isError ? (
                <div className='py-xl text-center text-error'>
                    <p className='font-semibold'>Failed to load orders</p>
                    <p className='mt-xs text-sm text-muted-foreground'>
                        {error instanceof Error ? error.message : 'Unknown error'}
                    </p>
                </div>
            ) : orders.length === 0 ? (
                <OrdersEmptyState tab={activeTab} />
            ) : (
                <OrdersList orders={orders} />
            )}
        </div>
    );
};
