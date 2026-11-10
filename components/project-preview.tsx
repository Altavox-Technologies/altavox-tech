'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ExternalLink, LockKeyhole, Monitor, Image as ImageIcon } from 'lucide-react'

type ProjectPreviewProps = {
  projectName: string
  projectUrl?: string
  screenshot?: string
  initialMode?: 'screenshot' | 'iframe'
}

export function ProjectPreview({ projectName, projectUrl, screenshot, initialMode = 'screenshot' }: ProjectPreviewProps) {
  const [mode, setMode] = useState<'screenshot' | 'iframe'>(initialMode)

  return (
    <section aria-label={`${projectName} website preview`} className="min-w-0">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500">
            Website preview
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            Static screenshot by default. The restricted live view loads only when requested.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-900">
          <LockKeyhole className="size-3" />
          Read-only sandbox
        </span>
      </div>

      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-slate-300 bg-slate-100 shadow-lg">
        {mode === 'screenshot' ? (
          screenshot ? (<Image
            src={screenshot}
            alt={`${projectName} website screenshot`}
            fill
            unoptimized
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 50vw"
            className="object-cover object-top"
          />) : (<div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#07294d] via-[#0b365f] to-[#041a33] px-6 text-center text-white">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-300">Altavox project preview</span>
            <span className="mt-3 text-2xl font-bold">{projectName}</span>
            <span className="mt-2 text-xs text-slate-300">Screenshot preview will be added after a verified capture.</span>
          </div>)
        ) : projectUrl ? (
          <iframe
            key={projectUrl}
            src={projectUrl}
            title={`${projectName} locked website preview`}
            loading="lazy"
            referrerPolicy="no-referrer"
            sandbox="allow-scripts"
            tabIndex={-1}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full border-0 bg-white"
          />
        ) : (
          screenshot ? (<Image
            src={screenshot}
            alt={`${projectName} website screenshot`}
            fill
            unoptimized
            className="object-cover object-top"
          />) : (<div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#07294d] via-[#0b365f] to-[#041a33] px-6 text-center text-white">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-300">Altavox project preview</span>
            <span className="mt-3 text-2xl font-bold">{projectName}</span>
            <span className="mt-2 text-xs text-slate-300">Screenshot preview will be added after a verified capture.</span>
          </div>)
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 border-t border-slate-200 bg-white/95 px-3 py-2 text-[10px] font-semibold text-slate-600 backdrop-blur-sm">
          <span className="flex min-w-0 items-center gap-1.5">
            <LockKeyhole className="size-3 shrink-0 text-amber-700" />
            <span className="truncate">
              {mode === 'iframe' ? 'Scripts only · no forms, clicks or top-level navigation' : 'Screenshot mode · no external page loaded'}
            </span>
          </span>
          <span className="shrink-0 font-mono uppercase tracking-wide">Sandboxed</span>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setMode((current) => current === 'screenshot' ? 'iframe' : 'screenshot')}
          disabled={!projectUrl}
          aria-pressed={mode === 'iframe'}
          className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800 transition hover:border-[#f26522] hover:text-[#c94e13] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {mode === 'screenshot' ? <Monitor className="size-3.5" /> : <ImageIcon className="size-3.5" />}
          {mode === 'screenshot' ? 'Load locked live preview' : 'Show screenshot'}
        </button>
        {projectUrl && (
          <a
            href={projectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-[#07294d] transition hover:bg-slate-100"
          >
            Open full website <ExternalLink className="size-3.5" />
          </a>
        )}
      </div>

      <p className="mt-2 text-[11px] leading-relaxed text-slate-500">
        The embedded page cannot receive pointer or keyboard input, submit forms, open popups, or navigate the parent site. Some websites block embedding; if that happens, switch back to the screenshot or open the site separately.
      </p>
    </section>
  )
}
