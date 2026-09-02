import { createRootRoute } from '@tanstack/react-router';

import { RootLayout } from '@/app/layouts/RootLayout';
import { NotFoundPage } from '@/pages/not-found/ui/NotFoundPage';
import { ErrorFallback } from '@/shared/ui/ErrorBoundary/ErrorFallback';

export const Route = createRootRoute({
    component: RootLayout,
    errorComponent: ErrorFallback,
    notFoundComponent: NotFoundPage,
});
