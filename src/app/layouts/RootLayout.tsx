import { Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { ErrorBoundary } from '@/shared/ui/ErrorBoundary/ErrorBoundary';

export function RootLayout() {
    return (
        <>
            <ErrorBoundary>
                <Outlet />
            </ErrorBoundary>
            {import.meta.env.DEV && <TanStackRouterDevtools />}
        </>
    );
}
