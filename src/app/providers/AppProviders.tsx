import { createRouter, RouterProvider } from '@tanstack/react-router';
import type { ReactNode } from 'react';

import { routeTree } from '@/routeTree.gen';

import { QueryProvider } from './QueryProvider';
import { StoreProvider } from './StoreProvider';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

interface AppProvidersProps {
    children?: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
    return (
        <StoreProvider>
            <QueryProvider>
                <RouterProvider router={router} />
                {children}
            </QueryProvider>
        </StoreProvider>
    );
}
