import type { OrderStatus } from '@/entities/order/types/order.types';
import { Button, BUTTON_SIZE, BUTTON_STYLE } from '@/shared/ui/Button';
import { Link } from '@/shared/ui/Link';

interface OrdersEmptyStateProps {
    tab: OrderStatus;
}

const EMPTY_MESSAGES: Record<OrderStatus, string> = {
    reserved: 'No reserved orders yet.',
    purchased: 'No purchased orders yet.',
};

export const OrdersEmptyState = ({ tab }: OrdersEmptyStateProps) => {
    return (
        <div className='flex flex-col items-center gap-md py-xl text-center'>
            <p className='text-base text-dark-charcoal'>{EMPTY_MESSAGES[tab]}</p>
            <Button
                asChild
                variant={BUTTON_STYLE.FIRST}
                size={BUTTON_SIZE.DEFAULT}
            >
                <Link
                    to='/'
                    className='text-white no-underline hover:no-underline'
                >
                    Continue Shopping
                </Link>
            </Button>
        </div>
    );
};
