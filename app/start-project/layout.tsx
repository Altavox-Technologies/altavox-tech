import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Start a Technology Project',
  description: 'Share your project goals and technical requirements with Altavox Technologies to begin an engineering discussion.',
  alternates: { canonical: '/start-project' },
  openGraph: {
    type: 'website',
    title: 'Start a Technology Project | Altavox Technologies',
    description: 'Share your project goals and technical requirements with Altavox Technologies to begin an engineering discussion.',
    url: '/start-project',
    siteName: 'Altavox Technologies',
  },
  twitter: {
    card: 'summary',
    title: 'Start a Technology Project | Altavox Technologies',
    description: 'Share your project goals and technical requirements with Altavox Technologies to begin an engineering discussion.',
  },
}

export default function RouteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
