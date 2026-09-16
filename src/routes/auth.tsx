import { createFileRoute } from '@tanstack/react-router';

import { type AuthSearch, DEFAULT_TAB } from '@/features/auth/types/auth.types';
import { AuthPage } from '@/pages/auth/ui/AuthPage';

export const Route = createFileRoute('/auth')({
    validateSearch: (search: Record<string, unknown>): AuthSearch => ({
        tab: search.tab === 'register' ? 'register' : DEFAULT_TAB,
        redirect: typeof search.redirect === 'string' ? search.redirect : undefined,
    }),
    component: AuthPage,
});
