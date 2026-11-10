import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects & Deployments',
  description: 'Explore selected Altavox technology projects and implementation work across digital platforms and operational systems.',
  alternates: { canonical: '/projects' },
  openGraph: {
    type: 'website',
    title: 'Projects & Deployments | Altavox Technologies',
    description: 'Explore selected Altavox technology projects and implementation work across digital platforms and operational systems.',
    url: '/projects',
    siteName: 'Altavox Technologies',
  },
  twitter: {
    card: 'summary',
    title: 'Projects & Deployments | Altavox Technologies',
    description: 'Explore selected Altavox technology projects and implementation work across digital platforms and operational systems.',
  },
}

export default function RouteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
