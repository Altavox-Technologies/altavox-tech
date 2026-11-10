import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Altavox Technologies',
  description: 'Learn about Altavox Technologies, its engineering principles, mission and approach to building practical digital systems in Tanzania and beyond.',
  alternates: { canonical: '/about' },
  openGraph: {
    type: 'website',
    title: 'About Altavox Technologies | Altavox Technologies',
    description: 'Learn about Altavox Technologies, its engineering principles, mission and approach to building practical digital systems in Tanzania and beyond.',
    url: '/about',
    siteName: 'Altavox Technologies',
  },
  twitter: {
    card: 'summary',
    title: 'About Altavox Technologies | Altavox Technologies',
    description: 'Learn about Altavox Technologies, its engineering principles, mission and approach to building practical digital systems in Tanzania and beyond.',
  },
}

export default function RouteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
