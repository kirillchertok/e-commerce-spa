import { Component, type ErrorInfo, type ReactNode } from 'react';

import { ErrorDisplay } from './ErrorDisplay';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = {
        hasError: false,
        error: null,
    };

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return {
            hasError: true,
            error,
        };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render(): ReactNode {
        if (this.state.hasError) {
            return (
                <ErrorDisplay
                    title='Application error'
                    message={this.state.error?.message ?? 'Unknown error'}
                />
            );
        }

        return this.props.children;
    }
}
