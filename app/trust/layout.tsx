import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Trust, Security & Compliance Center | Altavox Tech',
  description: 'Data classification policy, subprocessors disclosure, encryption standards, and data subject rights requests.',
  alternates: { canonical: '/trust' },
}

export default function TrustLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
