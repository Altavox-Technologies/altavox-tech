import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Technology Insights',
  description: 'Read Altavox insights on software engineering, AI, fintech integrations, digital operations and technology strategy.',
  alternates: { canonical: '/insights' },
  openGraph: {
    type: 'website',
    title: 'Technology Insights | Altavox Technologies',
    description: 'Read Altavox insights on software engineering, AI, fintech integrations, digital operations and technology strategy.',
    url: '/insights',
    siteName: 'Altavox Technologies',
  },
  twitter: {
    card: 'summary',
    title: 'Technology Insights | Altavox Technologies',
    description: 'Read Altavox insights on software engineering, AI, fintech integrations, digital operations and technology strategy.',
  },
}

export default function RouteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
