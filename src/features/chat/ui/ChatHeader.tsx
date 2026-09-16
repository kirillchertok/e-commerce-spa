import { ChatIcon, CrossIcon } from '@/shared/constants/icons';
import { cn } from '@/shared/lib/cn';
import { Button, BUTTON_SIZE, BUTTON_STYLE } from '@/shared/ui/Button/Button';

import { CONNECTION_STATUS, type ConnectionStatus } from '../model/chat.types';

interface ChatHeaderProps {
    connectionStatus: ConnectionStatus;
    onClose: () => void;
}

const connectionLabels: Record<ConnectionStatus, string> = {
    disconnected: 'Disconnected',
    connecting: 'Connecting...',
    connected: 'Connected',
    error: 'Connection error',
};

export const ChatHeader = ({ connectionStatus, onClose }: ChatHeaderProps) => {
    return (
        <div className='flex items-center justify-between border-b border-gainsboro bg-soft-red-transperant px-md py-sm'>
            <div className='flex items-center gap-sm'>
                <ChatIcon
                    className='h-5 w-5 text-soft-red'
                    aria-hidden='true'
                />
                <span className='font-medium text-dark-charcoal'>Chat</span>
            </div>
            <div className='flex items-center gap-sm'>
                <span className='inline-flex items-center gap-xs text-xs text-muted-foreground'>
                    <span
                        className={cn(
                            'h-2.5 w-2.5 rounded-full',
                            connectionStatus === CONNECTION_STATUS.CONNECTED && 'bg-waterfall',
                            connectionStatus === CONNECTION_STATUS.CONNECTING && 'bg-marzipan',
                            connectionStatus === CONNECTION_STATUS.ERROR && 'bg-error',
                            connectionStatus === CONNECTION_STATUS.DISCONNECTED && 'bg-matte-steel'
                        )}
                    />
                    {connectionLabels[connectionStatus]}
                </span>
                <Button
                    type='button'
                    variant={BUTTON_STYLE.ICON}
                    size={BUTTON_SIZE.DEFAULT}
                    className='h-8 w-8'
                    onClick={onClose}
                    aria-label='Close chat'
                >
                    <CrossIcon
                        className='h-4 w-4'
                        aria-hidden='true'
                    />
                </Button>
            </div>
        </div>
    );
};
