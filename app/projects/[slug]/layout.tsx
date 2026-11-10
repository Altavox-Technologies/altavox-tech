import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Project Details',
  description: 'View an individual Altavox project overview, its context and implementation details.',
  alternates: { canonical: '/projects' },
  openGraph: { type: 'website', title: 'Project Details | Altavox Technologies', description: 'View an individual Altavox project overview, its context and implementation details.', url: '/projects', siteName: 'Altavox Technologies' },
  twitter: { card: 'summary', title: 'Project Details | Altavox Technologies', description: 'View an individual Altavox project overview, its context and implementation details.' },
}

export default function RouteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
