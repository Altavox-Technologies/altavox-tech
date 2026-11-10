import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Altavox Computer Services',
  description: 'Explore Altavox computer services and submit a request for technical assistance or computer-related support.',
  alternates: { canonical: '/computer' },
  openGraph: {
    type: 'website',
    title: 'Altavox Computer Services | Altavox Technologies',
    description: 'Explore Altavox computer services and submit a request for technical assistance or computer-related support.',
    url: '/computer',
    siteName: 'Altavox Technologies',
  },
  twitter: {
    card: 'summary',
    title: 'Altavox Computer Services | Altavox Technologies',
    description: 'Explore Altavox computer services and submit a request for technical assistance or computer-related support.',
  },
}

export default function RouteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
