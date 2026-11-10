import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Altavox Technologies',
  description: 'Contact Altavox Technologies in Tanzania to discuss software development, digital systems, integrations or a technology project.',
  alternates: { canonical: '/contact' },
  openGraph: {
    type: 'website',
    title: 'Contact Altavox Technologies | Altavox Technologies',
    description: 'Contact Altavox Technologies in Tanzania to discuss software development, digital systems, integrations or a technology project.',
    url: '/contact',
    siteName: 'Altavox Technologies',
  },
  twitter: {
    card: 'summary',
    title: 'Contact Altavox Technologies | Altavox Technologies',
    description: 'Contact Altavox Technologies in Tanzania to discuss software development, digital systems, integrations or a technology project.',
  },
}

export default function RouteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
