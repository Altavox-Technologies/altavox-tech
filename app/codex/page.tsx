import type { Metadata } from 'next'
import { CodexPage } from '@/components/system-pages/codex-page'

export const metadata: Metadata = { title: 'Codex Knowledge | Altavox Tech', description: 'Search published engineering decisions and operating principles from Altavox Tech.' }

export default function Page() {
  return <CodexPage />
}
