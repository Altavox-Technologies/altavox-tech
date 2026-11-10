import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Read how Altavox Technologies describes the information submitted through its website and how privacy inquiries can be made.',
  alternates: { canonical: '/privacy' },
  openGraph: {
    type: 'website',
    title: 'Privacy Policy | Altavox Technologies',
    description: 'Read how Altavox Technologies describes the information submitted through its website and how privacy inquiries can be made.',
    url: '/privacy',
    siteName: 'Altavox Technologies',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy | Altavox Technologies',
    description: 'Read how Altavox Technologies describes the information submitted through its website and how privacy inquiries can be made.',
  },
}

export default function RouteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
