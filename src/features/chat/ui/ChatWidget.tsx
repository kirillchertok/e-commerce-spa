import { createPortal } from 'react-dom';

import { cn } from '@/shared/lib/cn';
import { Button, BUTTON_SIZE, BUTTON_STYLE } from '@/shared/ui/Button/Button';

import { useChat } from '../hooks/useChat';
import { useChatAutoScroll } from '../hooks/useChatAutoScroll';
import { CONNECTION_STATUS } from '../model/chat.types';
import { ChatButton } from './ChatButton';
import { ChatHeader } from './ChatHeader';
import { ChatInput } from './ChatInput';
import { ChatMessages } from './ChatMessages';

export const ChatWidget = () => {
    const chat = useChat();
    const listRef = useChatAutoScroll(chat.messages);

    const content = !chat.isOpen ? (
        <div className='fixed right-md bottom-md z-50'>
            <ChatButton
                isOpen={false}
                unreadCount={chat.unreadCount}
                onClick={chat.openChat}
            />
        </div>
    ) : (
        <div className='fixed right-md bottom-md z-50 w-88 overflow-hidden rounded-lg border border-gainsboro bg-white shadow-lg'>
            <ChatHeader
                connectionStatus={chat.connectionStatus}
                onClose={chat.closeChat}
            />

            <div className='flex min-h-88 flex-col bg-white'>
                <ChatMessages
                    messages={chat.messages}
                    listRef={listRef}
                />

                <div className='border-t border-gainsboro p-md'>
                    <div className='mb-sm flex items-center justify-between text-xs text-muted-foreground'>
                        <span>Connection</span>
                        {chat.connectionStatus !== CONNECTION_STATUS.CONNECTED && (
                            <Button
                                type='button'
                                variant={BUTTON_STYLE.LINK}
                                size={BUTTON_SIZE.DEFAULT}
                                className={cn('h-auto p-0 text-xs')}
                                onClick={chat.reconnect}
                            >
                                Reconnect
                            </Button>
                        )}
                    </div>
                    <ChatInput
                        value={chat.draft}
                        disabled={chat.connectionStatus !== CONNECTION_STATUS.CONNECTED}
                        onChange={chat.setDraft}
                        onSend={chat.sendMessage}
                    />
                </div>
            </div>
        </div>
    );

    return createPortal(content, document.body);
};
