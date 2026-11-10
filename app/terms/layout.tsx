import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Review the terms and service principles that apply to discussions and engagements with Altavox Technologies.',
  alternates: { canonical: '/terms' },
  openGraph: {
    type: 'website',
    title: 'Terms of Service | Altavox Technologies',
    description: 'Review the terms and service principles that apply to discussions and engagements with Altavox Technologies.',
    url: '/terms',
    siteName: 'Altavox Technologies',
  },
  twitter: {
    card: 'summary',
    title: 'Terms of Service | Altavox Technologies',
    description: 'Review the terms and service principles that apply to discussions and engagements with Altavox Technologies.',
  },
}

export default function RouteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
