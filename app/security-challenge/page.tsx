import type { Metadata } from 'next'
import { SecurityChallengePage } from '@/components/system-pages/security-challenge-page'

export const metadata: Metadata = { title: 'Security Challenge | Altavox Tech', description: 'Practice defensive security decisions in a safe, offline engineering quiz.' }

export default function Page() {
  return <SecurityChallengePage />
}
