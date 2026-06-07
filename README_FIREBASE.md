Firebase setup and usage

1. Install the Firebase SDK

   In your project root run:

   ```powershell
   npm install firebase
   ```

2. Create a Firebase project in the Firebase Console and enable Email/Password Authentication.

3. Create a `.env.local` file in the project root and add your Firebase config (replace with your values):

   ```text
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. Start the dev server:

   ```powershell
   npm run dev
   ```

5. You can now sign in from `/login` with an email/password user created in Firebase Auth.

Notes:
- The project uses client-side Firebase Authentication. The `AuthProvider` in `lib/auth-context.tsx` listens to Firebase auth state and exposes `login` and `logout`.
- If you had middleware enforcing cookie auth, it was disabled to avoid server/client mismatch; if you need server-side protection, consider implementing Firebase Admin on the server to verify tokens.
