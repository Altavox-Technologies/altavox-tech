import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Technology & Engineering',
  description: 'Discover the technologies and engineering practices behind Altavox software platforms, integrations and digital infrastructure.',
  alternates: { canonical: '/technology' },
  openGraph: {
    type: 'website',
    title: 'Technology & Engineering | Altavox Technologies',
    description: 'Discover the technologies and engineering practices behind Altavox software platforms, integrations and digital infrastructure.',
    url: '/technology',
    siteName: 'Altavox Technologies',
  },
  twitter: {
    card: 'summary',
    title: 'Technology & Engineering | Altavox Technologies',
    description: 'Discover the technologies and engineering practices behind Altavox software platforms, integrations and digital infrastructure.',
  },
}

export default function RouteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
