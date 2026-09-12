import type { OrderStatus } from '@/entities/order/types/order.types';
import { cn } from '@/shared/lib/cn';

interface OrderTabsProps {
    activeTab: OrderStatus;
    onTabChange: (tab: OrderStatus) => void;
}

const TABS: { value: OrderStatus; label: string }[] = [
    { value: 'reserved', label: 'Reserved' },
    { value: 'purchased', label: 'Purchased' },
];

export const OrderTabs = ({ activeTab, onTabChange }: OrderTabsProps) => {
    return (
        <nav
            className='mb-lg flex justify-center gap-lg border-b border-gainsboro'
            aria-label='Order tabs'
        >
            {TABS.map(({ value, label }) => {
                const isActive = activeTab === value;

                return (
                    <button
                        key={value}
                        type='button'
                        role='tab'
                        aria-selected={isActive}
                        onClick={() => onTabChange(value)}
                        className={cn(
                            'cursor-pointer px-sm pb-sm text-sm font-medium transition-colors',
                            isActive
                                ? 'border-b-2 border-girly-red text-girly-red'
                                : 'border-b border-transparent text-dark-charcoal hover:text-girly-red'
                        )}
                    >
                        {label}
                    </button>
                );
            })}
        </nav>
    );
};
