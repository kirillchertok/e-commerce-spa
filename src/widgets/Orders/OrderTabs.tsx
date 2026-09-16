import type { OrderStatus } from '@/entities/order/types/order.types';
import { cn } from '@/shared/lib/cn';
import { Button, BUTTON_SIZE, BUTTON_STYLE } from '@/shared/ui/Button/Button';

interface OrderTabsProps {
    activeTab: OrderStatus;
    onTabChange: (tab: OrderStatus) => void;
}

const TABS: { value: OrderStatus; label: string }[] = [
    { value: 'reserved', label: 'Reserved' },
    { value: 'purchased', label: 'Purchased' },
];

export const OrderTabs = ({ activeTab, onTabChange }: OrderTabsProps) => {
    const handleTabChange = (event: React.MouseEvent<HTMLButtonElement>) => {
        onTabChange(event.currentTarget.dataset.tab as OrderStatus);
    };

    return (
        <nav
            className='mb-lg flex justify-center gap-lg border-b border-gainsboro'
            aria-label='Order tabs'
        >
            {TABS.map(({ value, label }) => {
                const isActive = activeTab === value;

                return (
                    <Button
                        key={value}
                        type='button'
                        variant={BUTTON_STYLE.LINK}
                        size={BUTTON_SIZE.DEFAULT}
                        role='tab'
                        aria-selected={isActive}
                        onClick={handleTabChange}
                        data-tab={value}
                        className={cn(
                            'cursor-pointer px-sm pb-sm text-sm font-medium transition-colors',
                            isActive
                                ? 'border-b-2 border-girly-red text-girly-red'
                                : 'border-b border-transparent text-dark-charcoal hover:text-girly-red'
                        )}
                    >
                        {label}
                    </Button>
                );
            })}
        </nav>
    );
};
