import Link from 'next/link'
import { ArrowRight, CheckCircle2, FileText, ShieldCheck } from 'lucide-react'
import { PageFrame } from '@/components/site-shell'
import { projects } from '@/lib/site-data'

export default function CaseStudies() {
  return (
    <PageFrame
      eyebrow="Case Studies & Results"
      title="Evidence Over Exaggeration."
      intro="Detailed architectural breakdowns and operational outcomes from our production deployments across East Africa."
    >
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {projects.slice(0, 4).map((project) => (
            <article
              key={project.slug}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7 sm:p-8 shadow-xs transition hover:border-[#f26522] hover:shadow-lg"
            >
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#f26522]">
                  Case Study · {project.category}
                </span>
                <h2 className="mt-3 text-2xl font-bold text-[#07294d]">{project.name}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{project.description}</p>

                <div className="mt-6 rounded-xl bg-slate-50 p-4 border border-slate-200/80 text-xs space-y-2">
                  <div>
                    <span className="font-bold text-[#07294d] uppercase text-[10px] tracking-wider block">Operational Challenge</span>
                    <p className="text-slate-600 mt-0.5 leading-relaxed">{project.engineeringChallenge}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-200/60">
                    <span className="font-bold text-[#f26522] uppercase text-[10px] tracking-wider block">Engineering Solution</span>
                    <p className="text-slate-700 mt-0.5 leading-relaxed font-medium">{project.engineeringSolution}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between pt-4 border-t border-slate-100">
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#f26522] hover:underline transition"
                >
                  Read full case breakdown <ArrowRight className="size-4" />
                </Link>

                <span className="inline-flex items-center gap-1 text-xs text-slate-500 font-medium">
                  <ShieldCheck className="size-4 text-emerald-600" /> Verified deployment
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-8 text-center sm:p-12 shadow-xs">
          <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-orange-100 text-[#f26522]">
            <FileText className="size-6" />
          </div>
          <h3 className="mt-4 text-xl font-bold text-[#07294d]">Responsible Engineering Documentation</h3>
          <p className="mx-auto mt-2 max-w-xl text-xs sm:text-sm leading-relaxed text-slate-600">
            We only publish technical case studies once production metrics have stabilized, security audits have concluded, and the operating partner has approved public disclosure.
          </p>
        </div>
      </section>
    </PageFrame>
  )
}

