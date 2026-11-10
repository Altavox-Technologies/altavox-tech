import { betterAuth } from 'better-auth'
import { pool } from '@/lib/db'

const baseURL = process.env.BETTER_AUTH_URL ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : process.env.V0_RUNTIME_URL ?? 'http://localhost:3000')

if (process.env.NODE_ENV === 'production' && (!process.env.BETTER_AUTH_SECRET || process.env.BETTER_AUTH_SECRET.length < 32)) {
  throw new Error('BETTER_AUTH_SECRET must be configured with at least 32 characters in production.')
}

export const auth = betterAuth({
  ...(pool ? { database: pool } : {}),
  secret: process.env.BETTER_AUTH_SECRET ?? 'local-development-only-secret-change-before-deploy-123456',
  baseURL,
  emailAndPassword: { enabled: true, autoSignIn: true },
  trustedOrigins: [
    ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000', 'http://0.0.0.0:3000', ...['V0_RUNTIME_URL', 'V0_DEV_APP_URL', 'V0_BUILD_URL', 'V0_SANDBOX_URL'].flatMap((key) => process.env[key] ? [process.env[key] as string] : [])] : []),
    ...(process.env.NODE_ENV === 'production' ? [ ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []), ...(process.env.VERCEL_PROJECT_PRODUCTION_URL ? [`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`] : []) ] : []),
  ],
  session: { expiresIn: 60 * 60 * 24 * 7, updateAge: 60 * 60 * 24 },
  advanced: {
    database: {
      validateSchema: false,
    },
    ...(process.env.NODE_ENV === 'development' ? { defaultCookieAttributes: { sameSite: 'none' as const, secure: true } } : {}),
  },
})
