import { useState } from 'react';

import { useAppSelector } from '@/app/store/hooks';
import type { OrderStatus } from '@/entities/order/types/order.types';
import { selectOrdersByStatus } from '@/features/orders/model/ordersSelectors';
import { OrdersEmptyState, OrdersList, OrderTabs } from '@/widgets/Orders';

export const OrdersPage = () => {
    const [activeTab, setActiveTab] = useState<OrderStatus>('reserved');
    const orders = useAppSelector(state => selectOrdersByStatus(state, activeTab));

    return (
        <div className='mx-auto max-w-screen-2xl px-md py-lg lg:px-lg'>
            <h1 className='sr-only'>Orders</h1>
            <OrderTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            {orders.length === 0 ? (
                <OrdersEmptyState tab={activeTab} />
            ) : (
                <OrdersList orders={orders} />
            )}
        </div>
    );
};
