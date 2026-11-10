'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { Check, ExternalLink, Monitor, PhoneCall, Activity, ArrowRight, Cpu, ShieldCheck } from 'lucide-react'
import { AltavoxHeader } from '@/components/altavox-header'
import { AltavoxFooter } from '@/components/altavox-footer'
import { ProjectPreview } from '@/components/project-preview'
import { projects } from '@/lib/site-data'

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 selection:bg-[#f26522] selection:text-white font-sans">
      <AltavoxHeader />

      <main className="flex-1">
        {/* Executive Hero Banner */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#07294d] via-[#093563] to-[#051c36] text-white py-16 sm:py-20 border-b border-white/10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-[#f26522]/20 border border-[#f26522]/40 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-orange-200 mb-4">
                <Activity className="size-3.5 text-[#f26522]" />
                <span>Featured Projects & Engineering Blueprints</span>
              </div>
              
              <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
                <div className="lg:col-span-8 space-y-4">
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                    Software Platforms. <span className="text-[#f26522]">Built for Real Operations.</span>
                  </h1>
                  <p className="max-w-2xl text-base sm:text-lg text-slate-200 leading-relaxed">
                    We focus our engineering work on connectivity infrastructure, education technology, and creative digital experiences. Explore Jaslyn Net, Sammena School, and Mrisho Art Gallery.
                  </p>
                </div>
                
                <div className="lg:col-span-4 border-l-2 border-[#f26522] pl-6 py-3 bg-white/5 rounded-r-2xl border border-white/10 backdrop-blur-md">
                  <span className="block text-3xl font-extrabold text-white font-mono">{String(projects.length).padStart(2, '0')}</span>
                  <span className="text-xs uppercase font-bold tracking-wider text-orange-300">
                    Featured Projects
                  </span>
                  <p className="text-[11px] text-slate-300 mt-1">
                    A growing portfolio of digital products and platforms
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects Showcase Grid */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end">
            <div>
              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#f26522]">
                Our Portfolio
              </span>
              <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold text-[#07294d]">
                Featured Platforms & Engineering Work
              </h2>
            </div>
            <p className="max-w-md text-xs sm:text-sm text-slate-500">
              Explore the projects built and presented by Altavox Tech. Status labels reflect the project lifecycle, not a live uptime check.
            </p>
          </div>

          <div className="space-y-16">
            {projects.map((project, index) => (
              <article
                id={project.slug}
                key={project.slug}
                className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm hover:border-[#f26522] transition-colors duration-150"
              >
                <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 items-center">
                  <div className="lg:col-span-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#f26522]">
                        0{index + 1} // {project.category}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-700">
                        {project.status}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#07294d]">{project.name}</h3>
                    <p className="text-sm font-semibold text-slate-700 leading-relaxed">{project.summary}</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{project.description}</p>

                    {/* Engineering Challenge & Solution */}
                    {(project.engineeringChallenge || project.engineeringSolution) && (
                      <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200 text-xs space-y-2">
                        {project.engineeringChallenge && (
                          <div>
                            <span className="font-bold text-[#07294d] uppercase text-[10px] tracking-wider block">Engineering Challenge:</span>
                            <p className="text-slate-600 mt-0.5 leading-relaxed">{project.engineeringChallenge}</p>
                          </div>
                        )}
                        {project.engineeringSolution && (
                          <div className="pt-2 border-t border-slate-200/60">
                            <span className="font-bold text-[#f26522] uppercase text-[10px] tracking-wider block">Engineering Solution:</span>
                            <p className="text-slate-700 mt-0.5 leading-relaxed font-medium">{project.engineeringSolution}</p>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.map((tag) => (
                        <span key={tag} className="rounded-md border border-slate-200 bg-slate-100 px-2.5 py-1 text-[11px] font-mono text-slate-700">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Core Capabilities:
                      </p>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {project.keyFeatures.map((feature) => (
                          <li key={feature} className="flex items-start gap-2.5">
                            <Check className="mt-0.5 size-4 shrink-0 text-[#f26522]" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 flex flex-wrap items-center gap-3">
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl bg-[#f26522] px-5 py-3 text-xs font-bold text-white shadow-md hover:bg-[#e05312] transition cursor-pointer"
                        >
                          <span>Visit Production Website</span>
                          <ExternalLink className="size-3.5" />
                        </a>
                      )}
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-xs font-semibold text-[#07294d] hover:bg-slate-100 transition"
                      >
                        <span>Architecture Spec</span>
                        <ArrowRight className="size-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Locked, read-only embedded website preview */}
                  <div className="lg:col-span-6">
                    <ProjectPreview
                      projectName={project.name}
                      projectUrl={project.url}
                      screenshot={project.screenshotUrl}
                      initialMode={project.slug === 'mrisho-art-gallery' ? 'iframe' : 'screenshot'}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Bottom CTA Section */}
        <section className="bg-slate-100 py-16 border-t border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-[#07294d] text-white p-8 sm:p-12 shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="max-w-2xl space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-300">
                  Engineering Partnership
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Have an Operational Platform to Architect?
                </h3>
                <p className="text-sm text-slate-300">
                  From custom ISP billing bridges to school SIMS portals, our team builds dependable software systems that stay running.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/start-project"
                  className="rounded-xl bg-[#f26522] px-6 py-3.5 text-xs font-bold text-white shadow-md hover:bg-[#e05312] transition"
                >
                  Start a Project
                </Link>
                <a
                  href="tel:+255750227073"
                  className="rounded-xl border border-white/20 bg-white/10 px-4 py-3.5 text-xs font-semibold text-white hover:bg-white/20 transition flex items-center gap-2"
                >
                  <PhoneCall className="size-4 text-[#f26522]" />
                  <span>+255 750 227 073</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <AltavoxFooter />
    </div>
  )
}
