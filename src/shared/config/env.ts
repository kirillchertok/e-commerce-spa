interface FirebaseEnv {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
}

interface Env {
    firebase: FirebaseEnv;
    isFirebaseConfigured: boolean;
}

const firebaseEnv: FirebaseEnv = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? '',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? '',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? '',
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? '',
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? '',
    appId: import.meta.env.VITE_FIREBASE_APP_ID ?? '',
};

const requiredFirebaseKeys = Object.keys(firebaseEnv) as Array<keyof FirebaseEnv>;

function getMissingFirebaseKeys(): Array<keyof FirebaseEnv> {
    return requiredFirebaseKeys.filter(key => !firebaseEnv[key]);
}

export function validateEnv(): void {
    const missingKeys = getMissingFirebaseKeys();

    if (missingKeys.length > 0 && import.meta.env.DEV) {
        console.warn(`[env] Missing Firebase environment variables: ${missingKeys.join(', ')}`);
    }
}

export const env: Env = {
    firebase: firebaseEnv,
    isFirebaseConfigured: getMissingFirebaseKeys().length === 0,
};
