import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects Portfolio',
  description:
    'Explore all client platforms and Altavox Tech ecosystem systems including Jaslyn Net, Sammena School, Mrisho Art Gallery, Altavox WiFi, Academy, Bookstore, NetBill NOC, and Nexora Cloud.',
  alternates: { canonical: '/projects' },
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children
}
