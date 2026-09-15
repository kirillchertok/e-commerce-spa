import { useNavigate, useSearch } from '@tanstack/react-router';
import { useCallback } from 'react';

import type { GenderCategory } from '@/entities/product/types/product.types';
import { CATEGORY_NAV_ITEMS } from '@/shared/constants/navigation';
import { cn } from '@/shared/lib/cn';
import { Button, BUTTON_SIZE, BUTTON_STYLE } from '@/shared/ui/Button/Button';

interface NavItemProps {
    label: GenderCategory;
    isSelected: boolean;
    isLast: boolean;
    onSelect: (category: GenderCategory) => void;
}

const NavItem = ({ label, isSelected, isLast, onSelect }: NavItemProps) => {
    const handleSelect = () => onSelect(label);

    return (
        <div className='flex items-center'>
            <Button
                variant={BUTTON_STYLE.GHOST}
                size={BUTTON_SIZE.DEFAULT}
                onClick={handleSelect}
                className={cn(
                    'rounded-full px-lg py-xs text-sm whitespace-nowrap text-dark-charcoal hover:bg-matte-steel',
                    isSelected && 'bg-matte-steel font-bold text-dark-charcoal'
                )}
            >
                {label}
            </Button>
            {!isLast && (
                <span
                    className='mx-xs h-4 w-0.5 bg-matte-steel'
                    aria-hidden='true'
                />
            )}
        </div>
    );
};

export const CategoryNavigation = () => {
    const navigate = useNavigate();
    const { gender } = useSearch({ strict: false }) as { gender?: string };

    const handleSelect = useCallback(
        (category: GenderCategory) => {
            navigate({ to: '/', search: { gender: category } });
        },
        [navigate]
    );

    return (
        <section className='w-full overflow-hidden bg-white py-md shadow-2xs'>
            <div className='mx-auto flex max-w-screen-2xl justify-center px-md lg:px-lg'>
                <div className='inline-flex max-w-full items-center overflow-x-auto rounded-full border border-matte-steel bg-white p-xs'>
                    {CATEGORY_NAV_ITEMS.map((category, index) => (
                        <NavItem
                            key={category}
                            label={category}
                            isSelected={gender === category}
                            isLast={index === CATEGORY_NAV_ITEMS.length - 1}
                            onSelect={handleSelect}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
