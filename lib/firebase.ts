// Firebase initialization (client-side only)
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Read config from environment variables. Create a `.env.local` with these values:
// NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
// NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
// NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
// NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
// NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
// NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

console.log("API KEY:", process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig as any);
} else {
  app = getApps()[0];
}

export const auth = getAuth(app);

export default app;
