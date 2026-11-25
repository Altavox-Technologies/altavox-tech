import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Altavox Enterprise OS',
  description: 'Internal ERP, CRM, Subscription Entitlements, Automation Flow, and Security Operations for Altavox Tech.',
  alternates: { canonical: '/os' },
  robots: { index: false, follow: false, noarchive: true },
}

export default function OsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
