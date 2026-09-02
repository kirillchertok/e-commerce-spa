import '@/app/styles/global.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { AppProviders } from '@/app/providers/AppProviders';
import { validateEnv } from '@/shared/config/env';

validateEnv();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AppProviders />
    </StrictMode>
);
