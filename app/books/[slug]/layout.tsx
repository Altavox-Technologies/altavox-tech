import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book Details',
  description: 'View book information and available formats in the Altavox Book Hub.',
  alternates: { canonical: '/books' },
  openGraph: {
    type: 'website',
    title: 'Book Details | Altavox Technologies',
    description: 'View book information and available formats in the Altavox Book Hub.',
    url: '/books',
    siteName: 'Altavox Technologies',
  },
  twitter: {
    card: 'summary',
    title: 'Book Details | Altavox Technologies',
    description: 'View book information and available formats in the Altavox Book Hub.',
  },
}

export default function RouteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
