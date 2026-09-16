import type { Order } from '@/entities/order/types/order.types';
import { OrderShopCard } from '@/entities/order/ui/OrderShopCard';

interface OrdersListProps {
    orders: Order[];
}

export const OrdersList = ({ orders }: OrdersListProps) => {
    return (
        <div className='flex flex-col gap-lg'>
            {orders.map(order => (
                <OrderShopCard
                    key={order.id}
                    order={order}
                />
            ))}
        </div>
    );
};
