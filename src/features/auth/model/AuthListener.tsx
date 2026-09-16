import type { User } from 'firebase/auth';
import { type PropsWithChildren, useEffect } from 'react';

import { useAppDispatch } from '@/app/store/hooks';

import { subscribeToAuthState } from '../api/auth';
import { setAuthLoading, setUser } from './authSlice';

const mapFirebaseUser = (user: User | null) => {
    if (!user) {
        return null;
    }

    return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
    };
};

export const AuthListener = ({ children }: PropsWithChildren) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const unsubscribe = subscribeToAuthState(firebaseUser => {
            dispatch(setUser(mapFirebaseUser(firebaseUser)));
            dispatch(setAuthLoading(false));
        });

        return unsubscribe;
    }, [dispatch]);

    return children;
};
