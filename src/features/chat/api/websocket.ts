import { CONNECTION_STATUS, type ConnectionStatus } from '../model/chat.types';

export type ChatMessageEvent = MessageEvent<string>;

export type StatusListener = (status: ConnectionStatus) => void;
export type MessageListener = (event: ChatMessageEvent) => void;

export class WebSocketChatService {
    private static readonly URL = 'wss://ws.ifelse.io';

    private socket: WebSocket | null = null;
    private statusListeners = new Set<StatusListener>();
    private messageListeners = new Set<MessageListener>();

    connect(): void {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            return;
        }

        this.emitStatus(CONNECTION_STATUS.CONNECTING);

        const socket = new WebSocket(WebSocketChatService.URL);
        this.socket = socket;

        socket.addEventListener('open', () => {
            this.emitStatus(CONNECTION_STATUS.CONNECTED);
        });

        socket.addEventListener('message', event => {
            this.messageListeners.forEach(listener => listener(event));
        });

        socket.addEventListener('error', () => {
            this.emitStatus(CONNECTION_STATUS.ERROR);
        });

        socket.addEventListener('close', () => {
            this.socket = null;
            this.emitStatus(CONNECTION_STATUS.DISCONNECTED);
        });
    }

    send(message: string): boolean {
        const trimmedMessage = message.trim();

        if (!trimmedMessage) {
            return false;
        }

        if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
            return false;
        }

        this.socket.send(trimmedMessage);
        return true;
    }

    disconnect(): void {
        if (this.socket) {
            this.socket.close();
            this.socket = null;
        }

        this.emitStatus(CONNECTION_STATUS.DISCONNECTED);
    }

    onStatusChange(listener: StatusListener): () => void {
        this.statusListeners.add(listener);

        return () => {
            this.statusListeners.delete(listener);
        };
    }

    onMessage(listener: MessageListener): () => void {
        this.messageListeners.add(listener);

        return () => {
            this.messageListeners.delete(listener);
        };
    }

    private emitStatus(status: ConnectionStatus): void {
        this.statusListeners.forEach(listener => listener(status));
    }
}

export const websocketChatService = new WebSocketChatService();
