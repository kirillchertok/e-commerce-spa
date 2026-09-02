import type { ErrorComponentProps } from '@tanstack/react-router';

import { ErrorDisplay } from './ErrorDisplay';

export function ErrorFallback({ error }: ErrorComponentProps) {
    const message = error instanceof Error ? error.message : 'Unknown error';

    return (
        <ErrorDisplay
            title='Something went wrong'
            message={message}
        />
    );
}
