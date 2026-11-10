import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Corporate Technology Solutions',
  description: 'Explore Altavox corporate technology capabilities for connected operations, business platforms, digital workflows and infrastructure.',
  alternates: { canonical: '/corporate' },
  openGraph: {
    type: 'website',
    title: 'Corporate Technology Solutions | Altavox Technologies',
    description: 'Explore Altavox corporate technology capabilities for connected operations, business platforms, digital workflows and infrastructure.',
    url: '/corporate',
    siteName: 'Altavox Technologies',
  },
  twitter: {
    card: 'summary',
    title: 'Corporate Technology Solutions | Altavox Technologies',
    description: 'Explore Altavox corporate technology capabilities for connected operations, business platforms, digital workflows and infrastructure.',
  },
}

export default function RouteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
