# Better Auth Setup Guide

## What's Been Configured

✅ **Better Auth with Drizzle ORM** - Fully integrated with your existing database
✅ **Database Tables** - All Better Auth tables have been created and migrated
✅ **API Routes** - Better Auth API endpoints are set up at `/api/auth/[...all]`
✅ **Middleware** - Route protection is configured via `src/proxy.ts`
✅ **Session Management** - Cookie caching enabled for improved performance
✅ **UI Components** - Sign-in/sign-up pages and authentication buttons
✅ **Like Button Integration** - Model likes require authentication
✅ **Email/Password Auth** - Enabled with auto sign-in
✅ **GitHub OAuth** - Configured for social authentication

## Environment Variables

All environment variables are validated using Valibot in `src/utils/env.ts`. Create a `.env` file in your project root with these variables:

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL="http://localhost:3000"  # or your production URL

# Better Auth Configuration
AUTH_SECRET="your-secret-key-here-change-this-in-production"
AUTH_DRIZZLE_URL="http://localhost:3000"  # Better Auth base URL (falls back to NEXT_PUBLIC_SITE_URL)

# GitHub OAuth
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Database
DATABASE_URL="your-neon-database-connection-string"
```

**Note**: `AUTH_DRIZZLE_URL` will fall back to `NEXT_PUBLIC_SITE_URL` if not set. The client-side auth client uses `NEXT_PUBLIC_APP_URL` (which should match `NEXT_PUBLIC_SITE_URL`).

## How to Get GitHub OAuth Credentials

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the application details:
   - **Application name**: Your app name
   - **Homepage URL**: `http://localhost:3000` (or your production URL)
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github` (or your production URL)
4. Click "Register application"
5. Copy the **Client ID** and generate a **Client Secret**
6. Add them to your `.env` file

## Features Available

### Authentication
- **Email/Password** - Users can sign up and sign in with email and password
- **GitHub OAuth** - Users can sign in with their GitHub account
- **Session Management** - Automatic session handling with cookie caching (5-minute cache)
- **Route Protection** - Protect routes that require authentication via middleware

### Like Functionality
- **Authentication Required** - Users must be signed in to like models
- **User Feedback** - Clear indication of authentication status and like state

### UI Integration
- **Navbar** - Shows user avatar (GitHub image if available), name/email, and sign-in/out buttons
- **Model Cards** - Like buttons require authentication
- **Sign-in/Sign-up Pages** - Clean, professional authentication interface

## Database Schema

The following Better Auth tables are integrated with your database:
- `user` - User accounts with email/password and OAuth support
- `account` - OAuth provider accounts (GitHub)
- `session` - User sessions with cookie caching
- `verification` - Email verification tokens

All tables are defined in `src/db/schema/auth.ts` and use Drizzle ORM v1 beta relations.

## Adding More Providers

To add more authentication providers (Google, Discord, etc.):

1. Add the provider configuration to `src/lib/auth.ts`:
   ```typescript
   socialProviders: {
     github: { ... },
     google: {
       clientId: env.GOOGLE_CLIENT_ID,
       clientSecret: env.GOOGLE_CLIENT_SECRET,
     },
   }
   ```
2. Add the environment variables to `src/utils/env.ts`:
   ```typescript
   GOOGLE_CLIENT_ID: string(),
   GOOGLE_CLIENT_SECRET: string(),
   ```
3. Update your `.env` file with the new credentials
4. Update the sign-in UI to include the new provider button

## Environment Variable Validation

All environment variables are validated at application startup using Valibot in `src/utils/env.ts`. If any required variable is missing or invalid, the application will fail to start with a clear error message.

**Server-side usage**: Import `env` from `@/utils/env` (e.g., `src/lib/auth.ts`, `src/db/index.ts`)

**Client-side usage**: Use `process.env.NEXT_PUBLIC_*` variables directly (e.g., `src/lib/auth-client.ts`)

## Next Steps

1. **Add Environment Variables** - Create `.env` with all required variables
2. **Test Authentication** - Try signing up/signing in with email/password and GitHub
3. **Customize UI** - Adjust the sign-in/sign-up pages and authentication UI to match your design
4. **Add More Providers** - Consider adding Google, Discord, or other providers
5. **Configure Production** - Update environment variables for production deployment

## Security Notes

- Change `AUTH_SECRET` to a strong, random string in production (use `openssl rand -base64 32`)
- Use HTTPS in production
- Keep `GITHUB_CLIENT_SECRET` and `AUTH_SECRET` secure and never commit them to version control
- Consider adding rate limiting for authentication endpoints
- The `.env` file should be in `.gitignore` (use `.env.example` for documentation)

## Known Issues

- Better Auth's `drizzleAdapter` may show warnings about models not found in query object due to Drizzle ORM v1 beta relations structure incompatibility. This is non-blocking - Better Auth falls back to direct table queries and functionality works correctly.
