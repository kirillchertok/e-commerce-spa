import { createFileRoute } from '@tanstack/react-router';

import { NotFoundPage } from '@/pages/not-found/ui/NotFoundPage';

export const Route = createFileRoute('/$')({
    component: NotFoundPage,
});
