import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your Altavox account.',
  alternates: { canonical: '/sign-in' },
  robots: { index: false, follow: false, noarchive: true },
}

export default function PrivateAreaLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
