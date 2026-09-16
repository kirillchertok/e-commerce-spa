import { useEffect, useRef, useState } from 'react';

import { websocketChatService } from '../api/websocket';
import {
    CHAT_DIRECTION,
    type ChatMessage,
    CONNECTION_STATUS,
    type ConnectionStatus,
} from '../model/chat.types';

const createChatMessage = (text: string, direction: ChatMessage['direction']): ChatMessage => ({
    id: crypto.randomUUID(),
    text,
    timestamp: Date.now(),
    direction,
});

export const useChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(
        CONNECTION_STATUS.DISCONNECTED
    );
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [draft, setDraft] = useState('');
    const [unreadCount, setUnreadCount] = useState(0);
    const isOpenRef = useRef(isOpen);

    useEffect(() => {
        isOpenRef.current = isOpen;
    }, [isOpen]);

    useEffect(() => {
        const unsubscribeStatus = websocketChatService.onStatusChange(setConnectionStatus);
        const unsubscribeMessages = websocketChatService.onMessage(event => {
            const text = String(event.data ?? '').trim();

            if (!text) {
                return;
            }

            setMessages(current => [...current, createChatMessage(text, CHAT_DIRECTION.RECEIVED)]);

            if (!isOpenRef.current) {
                setUnreadCount(current => current + 1);
            }
        });

        return () => {
            unsubscribeStatus();
            unsubscribeMessages();
        };
    }, []);

    const openChat = () => {
        setIsOpen(true);
        setUnreadCount(0);
        websocketChatService.connect();
    };

    const closeChat = () => {
        setIsOpen(false);
        websocketChatService.disconnect();
    };

    const reconnect = () => {
        setUnreadCount(0);
        websocketChatService.connect();
    };

    const sendMessage = () => {
        const trimmedDraft = draft.trim();

        if (!trimmedDraft || connectionStatus !== CONNECTION_STATUS.CONNECTED) {
            return;
        }

        setMessages(current => [...current, createChatMessage(trimmedDraft, CHAT_DIRECTION.SENT)]);
        websocketChatService.send(trimmedDraft);
        setDraft('');
    };

    return {
        isOpen,
        connectionStatus,
        messages,
        draft,
        unreadCount,
        setDraft,
        openChat,
        closeChat,
        reconnect,
        sendMessage,
    };
};
