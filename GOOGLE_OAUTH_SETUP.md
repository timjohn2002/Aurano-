# Google OAuth Setup Guide

## 1. Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set application type to "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:3000/auth/google/callback` (for development)
   - `https://yourdomain.com/auth/google/callback` (for production)

## 2. Environment Variables

Create a `.env.local` file in your project root:

```bash
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id-here
```

## 3. How It Works

1. User clicks "Sign in with Google"
2. Redirects to Google OAuth consent screen
3. User authorizes the application
4. Google redirects back to `/auth/google/callback` with an authorization code
5. The callback page handles the response and can exchange the code for user info

## 4. Next Steps for Full Implementation

To make this fully functional, you'll need to:

1. **Backend API**: Create endpoints to handle the OAuth code exchange
2. **User Management**: Store user data in your database
3. **Session Management**: Implement JWT tokens or session cookies
4. **Error Handling**: Add proper error handling and user feedback

## 5. Testing

1. Set up your Google OAuth credentials
2. Add the client ID to your `.env.local` file
3. Click "Sign in with Google" in the login modal
4. You should be redirected to Google's consent screen
5. After authorization, you'll be redirected back to the callback page

## Current Status

✅ **Frontend OAuth flow implemented**
✅ **Google consent screen integration**
✅ **Callback page created**
🔧 **Backend integration needed for full functionality**
