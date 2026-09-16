import { ChatIcon } from '@/shared/constants/icons';
import { cn } from '@/shared/lib/cn';
import { Button, BUTTON_SIZE, BUTTON_STYLE } from '@/shared/ui/Button/Button';

interface ChatButtonProps {
    isOpen: boolean;
    unreadCount?: number;
    onClick: () => void;
}

export const ChatButton = ({ isOpen, unreadCount = 0, onClick }: ChatButtonProps) => {
    return (
        <Button
            type='button'
            variant={BUTTON_STYLE.FIRST}
            size={BUTTON_SIZE.DEFAULT}
            className={cn('relative h-12 w-12 rounded-full shadow-md')}
            onClick={onClick}
            aria-label={isOpen ? 'Close chat' : 'Open chat'}
        >
            <ChatIcon
                className='h-5 w-5'
                aria-hidden='true'
            />
            {unreadCount > 0 && (
                <span className='absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-dark-charcoal px-1 text-[10px] font-semibold text-white'>
                    {unreadCount}
                </span>
            )}
        </Button>
    );
};
