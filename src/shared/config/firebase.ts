import { type FirebaseApp, initializeApp } from 'firebase/app';

import { env } from './env';

let firebaseApp: FirebaseApp | undefined = undefined;

if (env.isFirebaseConfigured) {
    firebaseApp = initializeApp(env.firebase);
}

export { firebaseApp };
