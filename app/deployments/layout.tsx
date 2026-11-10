import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Deployment Services',
  description: 'Learn about Altavox deployment and implementation work for web platforms, integrations and operational technology systems.',
  alternates: { canonical: '/deployments' },
  openGraph: {
    type: 'website',
    title: 'Deployment Services | Altavox Technologies',
    description: 'Learn about Altavox deployment and implementation work for web platforms, integrations and operational technology systems.',
    url: '/deployments',
    siteName: 'Altavox Technologies',
  },
  twitter: {
    card: 'summary',
    title: 'Deployment Services | Altavox Technologies',
    description: 'Learn about Altavox deployment and implementation work for web platforms, integrations and operational technology systems.',
  },
}

export default function RouteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
