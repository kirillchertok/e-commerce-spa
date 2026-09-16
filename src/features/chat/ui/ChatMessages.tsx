import type { RefObject } from 'react';

import type { ChatMessage as ChatMessageType } from '../model/chat.types';
import { ChatMessage } from './ChatMessage';

interface ChatMessagesProps {
    messages: ChatMessageType[];
    listRef: RefObject<HTMLDivElement | null>;
}

export const ChatMessages = ({ messages, listRef }: ChatMessagesProps) => {
    return (
        <div
            ref={listRef}
            className='flex-1 space-y-sm overflow-y-auto p-md'
        >
            {messages.length === 0 ? (
                <div className='rounded-md border border-dashed border-matte-steel bg-white p-sm text-sm text-muted-foreground'>
                    Start a conversation
                </div>
            ) : (
                messages.map(message => (
                    <ChatMessage
                        key={message.id}
                        message={message}
                    />
                ))
            )}
        </div>
    );
};
