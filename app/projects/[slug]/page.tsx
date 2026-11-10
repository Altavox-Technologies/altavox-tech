import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowUpRight, CheckCircle2, Cpu, ExternalLink, Globe, Layers, Server, ShieldCheck } from 'lucide-react'
import { notFound } from 'next/navigation'
import { PageFrame } from '@/components/site-shell'
import { projects } from '@/lib/site-data'

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }))
}

export default async function Project({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projects.find((item) => item.slug === slug)
  if (!project) notFound()

  const hasScreenshot = ['sammena', 'jaslyn-net'].includes(project.slug)

  return (
    <PageFrame
      eyebrow={project.category}
      title={project.name}
      intro={project.summary}
    >
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="mb-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#07294d] transition"
          >
            <ArrowLeft className="size-4" /> Back to all projects
          </Link>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            {/* System Visual Preview */}
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-slate-200 bg-[#07294d] shadow-sm">
              {hasScreenshot ? (
                <Image
                  src={`/projects/${project.slug}-live.png`}
                  alt={`${project.name} live system screenshot`}
                  fill
                  className="object-cover object-top"
                  sizes="(min-width: 1024px) 70vw, 100vw"
                  priority
                />
              ) : (
                <div className="flex h-full w-full flex-col justify-between p-8 bg-gradient-to-br from-[#07294d] via-[#093563] to-[#051c36]">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-wider text-[#f26522] font-bold">
                      {project.category}
                    </span>
                    <span className="rounded-full bg-white/10 px-3 py-1 font-mono text-xs text-white border border-white/20">
                      {project.status}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-3xl font-extrabold text-white">{project.name}</h3>
                    <p className="mt-2 text-sm text-slate-300">{project.description}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Problem & Context */}
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-7 sm:p-8 shadow-xs">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#f26522]">
                Context & Operational Scope
              </span>
              <h2 className="mt-2 text-2xl font-bold text-[#07294d]">The problem behind the build</h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-slate-600">
                {project.description}
              </p>
            </div>

            {/* Key Delivered Capabilities */}
            {project.keyFeatures && (
              <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-7 sm:p-8 shadow-xs">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#f26522]">
                  Delivered Capabilities
                </span>
                <h3 className="mt-2 text-xl font-bold text-[#07294d]">Core functional modules</h3>
                <div className="mt-6 space-y-3">
                  {project.keyFeatures.map((feat) => (
                    <div key={feat} className="flex items-start gap-3 rounded-xl bg-slate-50 p-3.5 border border-slate-200">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#f26522]" />
                      <span className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Aside Information */}
          <aside className="space-y-6">
            {/* Status & Quick Specs */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                Project Status
              </span>
              <p className="mt-2 text-xl font-extrabold text-[#07294d]">{project.status}</p>

              <div className="mt-6 border-t border-slate-100 pt-5">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                  Client / Operator
                </span>
                <p className="mt-1 text-sm font-bold text-[#07294d]">{project.client}</p>
              </div>

              {project.url && (
                <div className="mt-6 pt-5 border-t border-slate-100">
                  <Link
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#f26522] px-4 py-3 text-xs font-bold text-white transition hover:bg-[#d95316] shadow-sm"
                  >
                    Open Live Deployment <ExternalLink className="size-4" />
                  </Link>
                </div>
              )}
            </div>

            {/* Architecture Specifications */}
            {project.architecture && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#f26522]">
                  Architecture Specification
                </span>
                <div className="mt-4 space-y-4 text-xs">
                  <div>
                    <p className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Frontend</p>
                    <p className="mt-1 font-mono text-slate-800 font-semibold">{project.architecture.frontend}</p>
                  </div>
                  <div>
                    <p className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Backend & Workers</p>
                    <p className="mt-1 font-mono text-slate-800 font-semibold">{project.architecture.backend}</p>
                  </div>
                  <div>
                    <p className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Database & Storage</p>
                    <p className="mt-1 font-mono text-slate-800 font-semibold">{project.architecture.database}</p>
                  </div>
                  <div>
                    <p className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Infrastructure</p>
                    <p className="mt-1 font-mono text-slate-800 font-semibold">{project.architecture.infrastructure}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Operational Challenge & Solution */}
            {(project.engineeringChallenge || project.engineeringSolution) && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#f26522]">
                  Engineering Details
                </span>
                <div className="mt-4 space-y-3 text-xs">
                  {project.engineeringChallenge && (
                    <div>
                      <p className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">Operational Challenge</p>
                      <p className="mt-1 text-slate-600 leading-relaxed">{project.engineeringChallenge}</p>
                    </div>
                  )}
                  {project.engineeringSolution && (
                    <div className="border-t border-slate-100 pt-3">
                      <p className="font-bold text-[#f26522] uppercase tracking-wider text-[10px]">Engineering Solution</p>
                      <p className="mt-1 text-slate-700 leading-relaxed font-medium">{project.engineeringSolution}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tags */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                Technology Tags
              </span>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span key={tag} className="rounded-md bg-slate-100 border border-slate-200 px-2.5 py-1 text-xs text-slate-600 font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </PageFrame>
  )
}
