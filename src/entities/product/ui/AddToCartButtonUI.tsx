import { ShoppingBagIcon } from '@/shared/constants/icons';
import { cn } from '@/shared/lib/cn';
import { Button, BUTTON_SIZE, BUTTON_STYLE } from '@/shared/ui/Button/Button';

interface AddToCartButtonUIProps {
    isInCart: boolean;
    onAddToCart: () => void;
    className?: string;
    isLoading?: boolean;
    disabled?: boolean;
}

export const AddToCartButtonUI = ({
    isInCart,
    onAddToCart,
    className,
    isLoading = false,
    disabled = false,
}: AddToCartButtonUIProps) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        onAddToCart();
    };

    return (
        <Button
            variant={BUTTON_STYLE.GHOST}
            size={BUTTON_SIZE.DEFAULT}
            onClick={handleClick}
            disabled={isLoading || disabled}
            aria-label={isInCart ? 'Remove from cart' : 'Add to cart'}
            className={cn(
                'p-0 text-dark-charcoal hover:bg-transparent hover:text-gemma',
                isInCart && 'text-sm font-semibold text-soft-red hover:text-girly-red',
                className
            )}
        >
            {isInCart ? <span>Added</span> : <ShoppingBagIcon className='h-5 w-5 stroke-2' />}
        </Button>
    );
};
