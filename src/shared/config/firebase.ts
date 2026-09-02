import { type FirebaseApp, initializeApp } from 'firebase/app';
import { type Firestore, getFirestore } from 'firebase/firestore';

import { env } from './env';

let firebaseApp: FirebaseApp | null = null;
let db: Firestore | null = null;

if (env.isFirebaseConfigured) {
    firebaseApp = initializeApp(env.firebase);
    db = getFirestore(firebaseApp);
}

export { db, firebaseApp };
