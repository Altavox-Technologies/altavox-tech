import { PageFrame } from '@/components/site-shell'
import { InquiryForm } from '@/components/inquiry-form'

export default function StartProject() {
  return (
    <PageFrame
      eyebrow="Start a project"
      title="Bring us the hard part."
      intro="A short, useful brief is enough to begin. Tell us about the operation, the constraint, and what a dependable system would make possible."
    >
      <section className="mx-auto max-w-4xl px-6 py-14 lg:px-8">
        <InquiryForm detailed />
      </section>
    </PageFrame>
  )
}
