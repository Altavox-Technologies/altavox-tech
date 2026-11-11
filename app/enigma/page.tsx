import type { Metadata } from 'next'
import { EnigmaPage } from '@/components/system-pages/enigma-page'

export const metadata: Metadata = { title: 'Enigma Diagnostic | Altavox Tech', description: 'Use a local, defensive diagnostic checklist for common website, database, payment, and navigation symptoms.' }

export default function Page() {
  return <EnigmaPage />
}
