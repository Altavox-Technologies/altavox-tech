import Link from 'next/link'
import type { Metadata } from 'next'
import {
  ArrowRight,
  ArrowUpRight,
  Blocks,
  Cable,
  GraduationCap,
  Network,
  ServerCog,
  ShieldCheck,
} from 'lucide-react'
import { PageFrame } from '@/components/site-shell'
import { projects } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Solutions',
  description: 'Explore Altavox Tech solution areas across education technology, ISP operations, network operations, and cloud foundations.',
  alternates: { canonical: '/solutions' },
}

const solutionAreas = [
  {
    number: '01',
    title: 'Education & school operations',
    summary:
      'Public school websites and connected administration workflows that help keep school information organised and accessible.',
    scope: ['School websites', 'School information workflows', 'News and announcements', 'Admissions and document flows'],
    projectSlug: 'sammena',
    icon: GraduationCap,
  },
  {
    number: '02',
    title: 'Connectivity & ISP operations',
    summary:
      'Software concepts for subscriber administration, billing workflows, network integrations, and clearer operational visibility.',
    scope: ['Subscriber workflows', 'Billing integration', 'Network access systems', 'Operational visibility'],
    projectSlug: 'jaslyn-net',
    icon: Cable,
  },
  {
    number: '03',
    title: 'Network operations & billing',
    summary:
      'Tools and workflows focused on bringing network operations, service administration, and billing processes into a more coherent view.',
    scope: ['NOC workflows', 'Monitoring concepts', 'Billing operations', 'Administration tools'],
    projectSlug: 'netbill-noc',
    icon: Network,
  },
  {
    number: '04',
    title: 'Cloud & deployment foundations',
    summary:
      'Infrastructure-oriented work exploring deployment practices and dependable foundations for software services.',
    scope: ['Deployment workflows', 'Infrastructure planning', 'Service foundations', 'Maintainability'],
    projectSlug: 'nexora-cloud',
    icon: ServerCog,
  },
]

export default function SolutionsPage() {
  return (
    <PageFrame
      eyebrow="Solutions · Built around the work"
      title="Technology should fit the operation, not the other way around."
      intro="Altavox works across education, connectivity, network operations, and cloud foundations. These solution areas describe the problems and workflows we focus on, while each project keeps its own current development status."
    >
      <section className="mx-auto max-w-7xl px-5 py-12 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid gap-4 border-y border-[#dedbd3] py-6 sm:grid-cols-3 sm:gap-8">
          <div className="flex items-start gap-3">
            <Blocks className="mt-1 size-5 shrink-0 text-[#a36d00]" />
            <div><h2 className="font-semibold text-[#172438]">Start with the workflow</h2><p className="mt-1 text-sm leading-6 text-[#5d6470]">Understand the actual task before choosing tools.</p></div>
          </div>
          <div className="flex items-start gap-3">
            <Cable className="mt-1 size-5 shrink-0 text-[#a36d00]" />
            <div><h2 className="font-semibold text-[#172438]">Connect the moving parts</h2><p className="mt-1 text-sm leading-6 text-[#5d6470]">Make data, integrations, and ownership clear.</p></div>
          </div>
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-1 size-5 shrink-0 text-[#a36d00]" />
            <div><h2 className="font-semibold text-[#172438]">Build for maintenance</h2><p className="mt-1 text-sm leading-6 text-[#5d6470]">Prefer understandable systems over unnecessary complexity.</p></div>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {solutionAreas.map((area) => {
            const project = projects.find((item) => item.slug === area.projectSlug)
            const Icon = area.icon
            if (!project) return null
            return (
              <article key={area.number} className="group flex h-full flex-col border border-[#dedbd3] bg-white p-6 transition-colors hover:border-[#c99a35] sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex size-12 items-center justify-center border border-[#ead9ad] bg-[#fffaf0] text-[#8a5d00]"><Icon className="size-5" aria-hidden="true" /></span>
                  <span className="font-mono text-xs tracking-[.16em] text-[#8b9199]">{area.number}</span>
                </div>
                <h2 className="mt-7 text-2xl font-semibold tracking-tight text-[#172438]">{area.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[#5d6470]">{area.summary}</p>
                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {area.scope.map((item) => <li key={item} className="flex items-start gap-2 text-sm text-[#414b5b]"><span aria-hidden="true" className="mt-2 size-1.5 shrink-0 bg-[#c18b1d]" />{item}</li>)}
                </ul>
                <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[#eeeae1] pt-5">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#8a5d00]">Related project</p>
                    <p className="mt-1 text-sm font-semibold text-[#172438]">{project.name}</p>
                    <p className="mt-1 text-xs text-[#777f8b]">Status: {project.status}</p>
                  </div>
                  <Link href={`/projects/${project.slug}`} className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-[#172438] transition-colors hover:text-[#8a5d00] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a36d00]">
                    View project <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="border-y border-[#dedbd3] bg-[#f4f1e9]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-12 sm:flex-row sm:items-center sm:justify-between sm:py-16 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[.2em] text-[#8a5d00]">Have a specific challenge?</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#172438] sm:text-4xl">Let’s map the work before we build the system.</h2>
            <p className="mt-3 text-sm leading-7 text-[#5d6470]">Share the workflow, constraints, and outcome you need. We can define a practical starting point together.</p>
          </div>
          <Link href="/start-project" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 bg-[#101b2b] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#8a5d00] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a36d00]">
            Discuss a solution <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </PageFrame>
  )
}
