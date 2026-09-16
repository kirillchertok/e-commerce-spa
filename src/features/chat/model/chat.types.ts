export const CONNECTION_STATUS = {
    DISCONNECTED: 'disconnected',
    CONNECTING: 'connecting',
    CONNECTED: 'connected',
    ERROR: 'error',
} as const;

export type ConnectionStatus = (typeof CONNECTION_STATUS)[keyof typeof CONNECTION_STATUS];

export const CHAT_DIRECTION = {
    SENT: 'sent',
    RECEIVED: 'received',
} as const;

export type ChatDirection = (typeof CHAT_DIRECTION)[keyof typeof CHAT_DIRECTION];

export type ChatMessage = {
    id: string;
    text: string;
    timestamp: number;
    direction: ChatDirection;
};
