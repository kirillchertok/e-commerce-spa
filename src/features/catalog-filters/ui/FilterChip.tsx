import { useCallback } from 'react';

import { CrossIcon } from '@/shared/constants/icons';
import { cn } from '@/shared/lib/cn';
import { Button, BUTTON_SIZE, BUTTON_STYLE } from '@/shared/ui/Button/Button';

interface FilterChipProps {
    label: string;
    onRemove: () => void;
    className?: string;
}

export const FilterChip = ({ label, onRemove, className }: FilterChipProps) => {
    const handleRemove = useCallback(
        (event: React.MouseEvent) => {
            event.stopPropagation();
            onRemove();
        },
        [onRemove],
    );

    return (
        <span
            className={cn(
                'inline-flex items-center gap-xs rounded-full bg-gainsboro px-md py-xs text-sm font-medium text-dark-charcoal transition hover:bg-matte-steel',
                className,
            )}
        >
            <span>{label}</span>
            <Button
                variant={BUTTON_STYLE.GHOST}
                size={BUTTON_SIZE.DEFAULT}
                onClick={handleRemove}
                aria-label={`Remove filter ${label}`}
                className='p-0 text-muted-foreground hover:bg-transparent hover:text-dark-charcoal'
            >
                <CrossIcon className='h-3.5 w-3.5' />
            </Button>
        </span>
    );
};
