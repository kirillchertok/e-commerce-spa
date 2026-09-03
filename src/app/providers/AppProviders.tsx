import { createRouter, RouterProvider } from '@tanstack/react-router';

import { AuthListener } from '@/features/auth/model/AuthListener';
import { routeTree } from '@/routeTree.gen';

import { QueryProvider } from './QueryProvider';
import { StoreProvider } from './StoreProvider';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

export function AppProviders() {
    return (
        <StoreProvider>
            <QueryProvider>
                <AuthListener>
                    <RouterProvider router={router} />
                </AuthListener>
            </QueryProvider>
        </StoreProvider>
    );
}
