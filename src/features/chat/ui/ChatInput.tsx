import { Button, BUTTON_SIZE, BUTTON_STYLE } from '@/shared/ui/Button/Button';

interface ChatInputProps {
    value: string;
    disabled: boolean;
    onChange: (value: string) => void;
    onSend: () => void;
}

export const ChatInput = ({ value, disabled, onChange, onSend }: ChatInputProps) => {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            onSend();
        }
    };

    return (
        <div className='flex gap-sm'>
            <input
                type='text'
                value={value}
                onChange={event => onChange(event.target.value)}
                onKeyDown={handleKeyDown}
                placeholder='Type a message...'
                className='flex-1 rounded-md border border-gainsboro bg-white px-sm py-xs text-sm text-dark-charcoal outline-none ring-0 placeholder:text-muted-foreground'
                disabled={disabled}
            />
            <Button
                type='button'
                variant={BUTTON_STYLE.FIRST}
                size={BUTTON_SIZE.DEFAULT}
                className='shrink-0'
                disabled={disabled || !value.trim()}
                onClick={onSend}
            >
                Send
            </Button>
        </div>
    );
};
