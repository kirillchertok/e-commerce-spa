import { createFileRoute } from '@tanstack/react-router';

import { type AuthTab, DEFAULT_TAB } from '@/features/auth/types/auth.types';
import { AuthPage } from '@/pages/auth/ui/AuthPage';

export const Route = createFileRoute('/auth')({
    validateSearch: (search: Record<string, unknown>): { tab: AuthTab } => ({
        tab: search.tab === 'register' ? 'register' : DEFAULT_TAB,
    }),
    component: AuthPage,
});
