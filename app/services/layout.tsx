import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Technology Services',
  description: 'Explore Altavox software development, AI-enabled workflows, systems integration, digital infrastructure and technology consulting services.',
  alternates: { canonical: '/services' },
  openGraph: {
    type: 'website',
    title: 'Technology Services | Altavox Technologies',
    description: 'Explore Altavox software development, AI-enabled workflows, systems integration, digital infrastructure and technology consulting services.',
    url: '/services',
    siteName: 'Altavox Technologies',
  },
  twitter: {
    card: 'summary',
    title: 'Technology Services | Altavox Technologies',
    description: 'Explore Altavox software development, AI-enabled workflows, systems integration, digital infrastructure and technology consulting services.',
  },
}

export default function RouteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
