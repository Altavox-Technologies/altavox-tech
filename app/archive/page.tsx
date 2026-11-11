import type { Metadata } from 'next'
import { ArchivePage } from '@/components/system-pages/archive-page'

export const metadata: Metadata = { title: 'Digital Archive | Altavox Tech', description: 'Browse the public records and published system indexes available from Altavox Tech.' }

export default function Page() {
  return <ArchivePage />
}
