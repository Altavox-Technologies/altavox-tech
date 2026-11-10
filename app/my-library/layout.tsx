import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Library',
  description: 'Access digital books assigned to your Altavox account.',
  alternates: { canonical: '/my-library' },
  robots: { index: false, follow: false, noarchive: true },
}

export default function PrivateAreaLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
