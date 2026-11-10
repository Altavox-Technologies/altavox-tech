import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Read about selected Altavox project contexts, engineering decisions and technology implementation approaches.',
  alternates: { canonical: '/case-studies' },
  openGraph: { type: 'website', title: 'Case Studies | Altavox Technologies', description: 'Read about selected Altavox project contexts, engineering decisions and technology implementation approaches.', url: '/case-studies', siteName: 'Altavox Technologies' },
  twitter: { card: 'summary', title: 'Case Studies | Altavox Technologies', description: 'Read about selected Altavox project contexts, engineering decisions and technology implementation approaches.' },
}

export default function RouteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
