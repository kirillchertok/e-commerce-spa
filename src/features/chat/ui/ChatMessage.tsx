import { cn } from '@/shared/lib/cn';

import type { ChatMessage as ChatMessageType } from '../model/chat.types';
import { CHAT_DIRECTION } from '../model/chat.types';

interface ChatMessageProps {
    message: ChatMessageType;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
    return (
        <div
            className={cn(
                'flex w-full',
                message.direction === CHAT_DIRECTION.SENT ? 'justify-end' : 'justify-start'
            )}
        >
            <div
                className={cn(
                    'max-w-[80%] rounded-lg px-sm py-xs text-sm',
                    message.direction === CHAT_DIRECTION.SENT
                        ? 'bg-soft-red-transperant text-dark-charcoal'
                        : 'bg-matte-steel text-dark-charcoal'
                )}
            >
                {message.text}
            </div>
        </div>
    );
};
