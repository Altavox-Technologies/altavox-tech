import type { Metadata } from 'next'
import { AtlasPage } from '@/components/system-pages/atlas-page'

export const metadata: Metadata = { title: 'Atlas System Map | Altavox Tech', description: 'Explore the seven public Altavox systems and their documented roles.' }

export default function Page() {
  return <AtlasPage />
}
