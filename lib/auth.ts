import { betterAuth } from 'better-auth'
import { pool } from '@/lib/db'

const baseURL = process.env.BETTER_AUTH_URL ?? (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : process.env.V0_RUNTIME_URL ?? 'http://localhost:3000')
export const auth = betterAuth({
  ...(pool ? { database: pool } : {}),
  baseURL,
  emailAndPassword: { enabled: true, autoSignIn: true },
  trustedOrigins: [
    ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000', ...['V0_RUNTIME_URL', 'V0_DEV_APP_URL', 'V0_BUILD_URL', 'V0_SANDBOX_URL'].flatMap((key) => process.env[key] ? [process.env[key] as string] : [])] : []),
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
