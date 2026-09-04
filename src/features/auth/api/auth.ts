import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    type User,
} from 'firebase/auth';
import { getAuth } from 'firebase/auth';

import { firebaseApp } from '@/shared/config/firebase';

import type { AuthData } from '../types/auth.types';

const auth = getAuth(firebaseApp);

export const registerUser = async ({ email, password }: AuthData): Promise<User> => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);

    return user;
};

export const loginUser = async ({ email, password }: AuthData): Promise<User> => {
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    return user;
};

export const logoutUser = async (): Promise<void> => {
    await signOut(auth);
};

export const subscribeToAuthState = (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, callback);
};
