import { useLocation, useNavigate } from '@tanstack/react-router';
import type { PropsWithChildren } from 'react';
import { useEffect, useRef } from 'react';

import { useAppSelector } from '@/app/store/hooks';

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
    const { user, isLoading } = useAppSelector(state => state.auth);
    const location = useLocation();
    const navigate = useNavigate();
    const isRedirectingRef = useRef(false);

    useEffect(() => {
        if (!isLoading && !user && !isRedirectingRef.current) {
            isRedirectingRef.current = true;
            navigate({
                to: '/auth',
                search: { tab: 'login', redirect: location.href },
                replace: true,
            });
        }
    }, [isLoading, location.href, navigate, user]);

    if (isLoading || !user) {
        return null;
    }

    return children;
};
