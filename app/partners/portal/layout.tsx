import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Partner Portal | Altavox Tech',
  description: 'Authorized partner operations and channel resources for Altavox Tech.',
  alternates: { canonical: '/partners/portal' },
  robots: { index: false, follow: false },
}

export default function PartnerPortalLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
