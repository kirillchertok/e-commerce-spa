import { HeartFilledIcon, HeartOutlineIcon } from '@/shared/constants/icons';
import { cn } from '@/shared/lib/cn';
import { Button, BUTTON_SIZE, BUTTON_STYLE } from '@/shared/ui/Button/Button';

interface FavoriteButtonUIProps {
    isFavorite: boolean;
    onToggleFavorite: () => void;
    className?: string;
    isLoading?: boolean;
}

export const FavoriteButtonUI = ({
    isFavorite,
    onToggleFavorite,
    className,
    isLoading = false,
}: FavoriteButtonUIProps) => {
    return (
        <Button
            variant={BUTTON_STYLE.GHOST}
            size={BUTTON_SIZE.DEFAULT}
            onClick={onToggleFavorite}
            disabled={isLoading}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            className={cn(
                'absolute top-sm right-sm z-10 h-8 w-8 rounded-full bg-black/20 p-0 text-white hover:bg-black/40',
                isFavorite && 'bg-white/80 text-soft-red hover:bg-white/80 hover:text-girly-red',
                className
            )}
        >
            {isFavorite ? (
                <HeartFilledIcon className='h-5 w-5 fill-current' />
            ) : (
                <HeartOutlineIcon className='h-5 w-5 stroke-current stroke-2' />
            )}
        </Button>
    );
};
