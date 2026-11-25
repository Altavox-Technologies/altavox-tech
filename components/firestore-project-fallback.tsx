'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, ExternalLink, Loader2 } from 'lucide-react'
import { doc, getDoc } from 'firebase/firestore'
import { db, handleFirestoreError, OperationType } from '@/lib/firebase'
import { ProjectItem } from '@/lib/site-data'
import { ProjectPreview } from '@/components/project-preview'
import { AltavoxHeader } from '@/components/altavox-header'
import { AltavoxFooter } from '@/components/altavox-footer'

export function FirestoreProjectFallback({ slug }: { slug: string }) {
  const [project, setProject] = useState<ProjectItem | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    async function load() {
      const path = `projects/${slug}`
      try {
        const snap = await getDoc(doc(db, 'projects', slug))
        if (active && snap.exists()) {
          const data = snap.data() as Record<string, unknown>
          setProject({
            slug: String(data.slug || slug),
            name: String(data.name || 'Project'),
            category: String(data.category || 'Engineering'),
            client: String(data.client || 'Altavox Technologies'),
            summary: String(data.summary || ''),
            description: String(data.description || ''),
            engineeringChallenge: typeof data.engineeringChallenge === 'string' ? data.engineeringChallenge : undefined,
            engineeringSolution: typeof data.engineeringSolution === 'string' ? data.engineeringSolution : undefined,
            status: (data.status as ProjectItem['status']) || 'Production',
            projectGroup: data.projectGroup === 'ecosystem' ? 'ecosystem' : 'client',
            url: String(data.url || 'https://altavox.space'),
            screenshotUrl: typeof data.screenshotUrl === 'string' ? data.screenshotUrl : undefined,
            tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
            keyFeatures: Array.isArray(data.keyFeatures) ? data.keyFeatures.map(String) : [],
          })
        }
      } catch (err) {
        if (active) {
          handleFirestoreError(err, OperationType.GET, path)
        }
      } finally {
        if (active) setLoading(false)
      }
    }
    void load()
    return () => {
      active = false
    }
  }, [slug])

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-900">
      <AltavoxHeader />
      <main className="flex-1 mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {loading ? (
          <div className="py-20 text-center text-xs text-slate-500 flex flex-col items-center gap-2">
            <Loader2 className="size-6 animate-spin text-[#f26522]" />
            <span>Loading project specification from Firebase...</span>
          </div>
        ) : !project ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-xs">
            <h1 className="text-2xl font-extrabold text-[#07294d]">Project Not Found</h1>
            <p className="mt-2 text-xs text-slate-500">
              No published project specification matches &quot;{slug}&quot;.
            </p>
            <Link
              href="/projects"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#07294d] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#0b3866]"
            >
              <ArrowLeft className="size-4" /> Back to Portfolio
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#07294d]"
            >
              <ArrowLeft className="size-4" /> Back to all projects
            </Link>

            <div className="space-y-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#f26522]">
                {project.category} · {project.status}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#07294d]">{project.name}</h1>
              <p className="text-sm text-slate-600 max-w-3xl">{project.summary}</p>
            </div>

            <ProjectPreview project={project} />

            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
                <h2 className="text-lg font-bold text-[#07294d]">Architecture & Scope</h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{project.description}</p>
                <ul className="space-y-2 pt-2">
                  {project.keyFeatures.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="size-4 text-[#f26522] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
                <span className="text-xs font-mono font-bold uppercase text-slate-400">Operator</span>
                <p className="text-sm font-bold text-[#07294d]">{project.client}</p>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#f26522] px-4 py-3 text-xs font-bold text-white hover:bg-[#d9531e]"
                >
                  Open Platform <ExternalLink className="size-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}
      </main>
      <AltavoxFooter />
    </div>
  )
}
