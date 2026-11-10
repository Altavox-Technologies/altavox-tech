import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Altavox Academy Courses',
  description: 'Explore practical technology learning paths from Altavox Academy, covering software, cloud, networking, cybersecurity and applied AI.',
  alternates: { canonical: '/courses' },
  openGraph: {
    type: 'website',
    title: 'Altavox Academy Courses | Altavox Technologies',
    description: 'Explore practical technology learning paths from Altavox Academy, covering software, cloud, networking, cybersecurity and applied AI.',
    url: '/courses',
    siteName: 'Altavox Technologies',
  },
  twitter: {
    card: 'summary',
    title: 'Altavox Academy Courses | Altavox Technologies',
    description: 'Explore practical technology learning paths from Altavox Academy, covering software, cloud, networking, cybersecurity and applied AI.',
  },
}

export default function RouteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
