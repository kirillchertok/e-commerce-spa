import { createFileRoute } from '@tanstack/react-router';

import { ProtectedRoute } from '@/features/auth/ui/ProtectedRoute';
import { NotFoundPage } from '@/pages/not-found/ui/NotFoundPage';

export const Route = createFileRoute('/$')({
    component: () => (
        <ProtectedRoute>
            <NotFoundPage />
        </ProtectedRoute>
    ),
});
