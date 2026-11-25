import { AltavoxHeader } from '@/components/altavox-header'
import { AltavoxFooter } from '@/components/altavox-footer'
import { CertificateVerifier } from '@/components/certificate-verifier'

export const dynamicParams = true

export function generateStaticParams() {
  return [{ certificateId: 'AVX-CERT-2026-001' }]
}

export default async function CertificateVerificationPage({
  params,
}: {
  params: Promise<{ certificateId: string }>
}) {
  const { certificateId } = await params

  return (
    <div className="flex min-h-screen flex-col bg-slate-100 font-sans text-slate-800">
      <AltavoxHeader />

      <main className="flex-1 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <CertificateVerifier certificateId={certificateId} />
        </div>
      </main>

      <AltavoxFooter />
    </div>
  )
}
