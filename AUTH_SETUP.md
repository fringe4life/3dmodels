# Auth.js Setup Guide

## What's Been Configured

✅ **Auth.js with Drizzle ORM** - Fully integrated with your existing database
✅ **Database Tables** - All Auth.js tables have been created and migrated
✅ **API Routes** - Auth.js API endpoints are set up
✅ **Middleware** - Route protection is configured
✅ **Session Provider** - Wrapped around your app
✅ **UI Components** - Sign-in page and authentication buttons
✅ **Like Button Integration** - ModelCard now requires authentication to like

## Environment Variables Needed

Create a `.env.local` file in your project root with these variables:

```bash
# Auth.js Configuration
AUTH_SECRET="your-secret-key-here-change-this-in-production"
AUTH_URL="http://localhost:3000"

# Google OAuth (Optional - for Google sign-in)
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"

# Database (you already have this)
DATABASE_URL="your-neon-database-url"
```

## How to Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set application type to "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)
7. Copy the Client ID and Client Secret to your `.env.local`

## Features Available

### Authentication
- **Sign In/Out** - Users can sign in with Google (or other providers you add)
- **Session Management** - Automatic session handling
- **Route Protection** - Protect routes that require authentication

### Like Functionality
- **Authentication Required** - Users must be signed in to like models
- **Sign-in Redirect** - Clicking like when not authenticated redirects to sign-in
- **User Feedback** - Clear indication of authentication status

### UI Integration
- **Navbar** - Shows user name/email and sign-in/out buttons
- **Model Cards** - Like buttons require authentication
- **Sign-in Page** - Clean, professional sign-in interface

## Adding More Providers

To add more authentication providers (GitHub, Discord, etc.):

1. Install the provider package: `bun add @auth/core`
2. Add provider to `app/auth.ts`:
   ```typescript
   import GitHub from "next-auth/providers/github"
   
   providers: [
     Google({...}),
     GitHub({
       clientId: process.env.AUTH_GITHUB_ID,
       clientSecret: process.env.AUTH_GITHUB_SECRET,
     }),
   ]
   ```
3. Add environment variables for the provider
4. Update the SignInButton component to include the new provider

## Database Schema

The following Auth.js tables have been added to your database:
- `user` - User accounts
- `account` - OAuth provider accounts
- `session` - User sessions
- `verificationToken` - Email verification tokens
- `authenticator` - WebAuthn authenticators (for passwordless auth)

## Next Steps

1. **Add Environment Variables** - Create `.env.local` with the required variables
2. **Test Authentication** - Try signing in with Google
3. **Implement Like Logic** - Add actual like functionality to the database
4. **Add More Providers** - Consider adding GitHub, Discord, or other providers
5. **Customize UI** - Adjust the sign-in page and authentication UI to match your design

## Security Notes

- Change `AUTH_SECRET` to a strong, random string in production
- Use HTTPS in production
- Consider adding rate limiting for authentication endpoints
- Implement proper error handling for authentication failures
