import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Altavox Store',
  description: 'Explore digital products and resources available through the Altavox online store.',
  alternates: { canonical: '/store' },
  openGraph: {
    type: 'website',
    title: 'Altavox Store | Altavox Technologies',
    description: 'Explore digital products and resources available through the Altavox online store.',
    url: '/store',
    siteName: 'Altavox Technologies',
  },
  twitter: {
    card: 'summary',
    title: 'Altavox Store | Altavox Technologies',
    description: 'Explore digital products and resources available through the Altavox online store.',
  },
}

export default function RouteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
