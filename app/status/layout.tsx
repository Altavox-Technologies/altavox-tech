import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Platform Service Status | Altavox Tech',
  description: 'Infrastructure architecture status and public uptime monitoring for Altavox Tech services.',
  alternates: { canonical: '/status' },
}

export default function StatusLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
