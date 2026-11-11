'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Lock,
  ExternalLink,
  Monitor,
  Eye,
  ShieldCheck,
  RefreshCw,
  AlertCircle,
  Maximize2
} from 'lucide-react'
import { ProjectItem } from '@/lib/site-data'

interface ProjectPreviewProps {
  project?: ProjectItem
  projectName?: string
  projectUrl?: string
  screenshot?: string
  initialMode?: 'iframe' | 'screenshot'
  defaultMode?: 'iframe' | 'screenshot'
  className?: string
}

export function ProjectPreview({
  project,
  projectName,
  projectUrl,
  screenshot,
  initialMode,
  defaultMode = 'screenshot',
  className = ''
}: ProjectPreviewProps) {
  const name = project?.name || projectName || 'Project'
  const url = project?.url || projectUrl || 'https://altavox.space'
  const screenshotUrl = project?.screenshotUrl || screenshot || '/projects/mrisho-art-live.png'
  const slug = project?.slug || (url.includes('mrishoart') ? 'mrisho-art' : '')
  const infrastructure = project?.architecture?.infrastructure || 'Cloud Native Infrastructure'

  // Mrisho Art Gallery opens in iframe mode by default as requested
  const isDefaultIframe =
    defaultMode === 'iframe' ||
    initialMode === 'iframe' ||
    slug === 'mrisho-art' ||
    slug === 'mrisho-art-gallery' ||
    url.includes('mrishoart')

  const [mode, setMode] = useState<'iframe' | 'screenshot'>(isDefaultIframe ? 'iframe' : 'screenshot')
  const [iframeError, setIframeError] = useState(false)
  const [isInteractive, setIsInteractive] = useState(false)
  const [reloading, setReloading] = useState(false)

  const reloadIframe = () => {
    setReloading(true)
    setIframeError(false)
    setTimeout(() => setReloading(false), 600)
  }

  return (
    <div className={`overflow-hidden rounded-2xl border border-slate-300 bg-slate-900 shadow-xl ${className}`}>
      {/* Viewport Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-slate-950/90 px-4 py-2.5 text-xs text-slate-300 backdrop-blur-md">
        <div className="flex items-center gap-2">
          {/* Mac-style window controls */}
          <div className="flex items-center gap-1.5 mr-2">
            <span className="size-2.5 rounded-full bg-rose-500/80" />
            <span className="size-2.5 rounded-full bg-amber-500/80" />
            <span className="size-2.5 rounded-full bg-emerald-500/80" />
          </div>

          {/* Security lock indicator & read-only label */}
          <span className="inline-flex items-center gap-1 rounded bg-slate-800 border border-white/10 px-2 py-0.5 font-mono text-[11px] text-slate-200">
            <Lock className="size-3 text-amber-400" />
            <span className="font-semibold text-amber-300">READ-ONLY ISOLATED PREVIEW</span>
          </span>

          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-slate-400 font-mono">
            {url}
          </span>
        </div>

        {/* Mode Switcher & Controls */}
        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-lg bg-white/10 p-0.5 text-[11px] font-semibold">
            <button
              type="button"
              onClick={() => setMode('screenshot')}
              className={`rounded-md px-2.5 py-1 transition-colors ${
                mode === 'screenshot' ? 'bg-[#f26522] text-white shadow' : 'text-slate-300 hover:text-white'
              }`}
            >
              Screenshot
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('iframe')
                setIframeError(false)
              }}
              className={`rounded-md px-2.5 py-1 transition-colors ${
                mode === 'iframe' ? 'bg-[#f26522] text-white shadow' : 'text-slate-300 hover:text-white'
              }`}
            >
              Live Iframe
            </button>
          </div>

          {mode === 'iframe' && (
            <>
              <button
                type="button"
                onClick={() => setIsInteractive((prev) => !prev)}
                title={isInteractive ? 'Lock interaction (Safe)' : 'Enable scrolling interaction'}
                className={`rounded px-2 py-1 text-[11px] font-semibold border transition ${
                  isInteractive
                    ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
                    : 'border-white/15 bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                {isInteractive ? 'Scroll Unlocked' : 'Scroll Locked'}
              </button>

              <button
                type="button"
                onClick={reloadIframe}
                aria-label="Reload preview"
                className="rounded p-1 text-slate-400 hover:bg-white/10 hover:text-white"
              >
                <RefreshCw className={`size-3.5 ${reloading ? 'animate-spin' : ''}`} />
              </button>
            </>
          )}

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            title="Open official site in new window"
            className="inline-flex items-center gap-1 rounded bg-white/10 hover:bg-white/20 px-2 py-1 text-[11px] font-semibold text-slate-200 transition"
          >
            <span>Visit</span>
            <ExternalLink className="size-3" />
          </a>
        </div>
      </div>

      {/* Main Viewport Content */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
        {mode === 'screenshot' ? (
          <div className="relative h-full w-full">
            <Image
              src={screenshotUrl}
              alt={`${name} verified production screenshot`}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-top"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-3 left-3 rounded bg-black/70 backdrop-blur-xs px-2.5 py-1 text-[11px] font-mono text-slate-200">
              Verified Production Architecture Screenshot
            </div>
          </div>
        ) : (
          <div className="relative h-full w-full bg-slate-900">
            {iframeError ? (
              <div className="flex h-full flex-col items-center justify-center p-6 text-center text-slate-300">
                <AlertCircle className="size-10 text-amber-400 mb-3" />
                <h4 className="font-bold text-sm text-white">Live Iframe Embedding Restricted</h4>
                <p className="mt-1 max-w-md text-xs text-slate-400 leading-relaxed">
                  The target domain ({url}) enforces strict browser CSP or X-Frame-Options headers to protect its sessions. Switched to high-resolution production screenshot fallback.
                </p>
                <button
                  type="button"
                  onClick={() => setMode('screenshot')}
                  className="mt-4 rounded-lg bg-[#f26522] px-4 py-2 text-xs font-bold text-white hover:bg-[#d9531e]"
                >
                  View Screenshot Preview
                </button>
              </div>
            ) : (
              <>
                {!reloading && (
                  <iframe
                    src={url}
                    title={`${name} isolated read-only preview`}
                    // Strictly isolate: allow scripts for rendering, but no forms, no popups, no top navigation, no same-origin cookie access
                    sandbox="allow-scripts"
                    tabIndex={-1}
                    aria-hidden={!isInteractive}
                    className={`h-full w-full border-0 transition-opacity duration-300 ${
                      isInteractive ? 'pointer-events-auto' : 'pointer-events-none'
                    }`}
                    onError={() => setIframeError(true)}
                  />
                )}

                {/* Overlaid subtle security indicator when pointer-events are disabled */}
                {!isInteractive && (
                  <div className="pointer-events-none absolute bottom-3 right-3 rounded bg-slate-900/85 backdrop-blur-xs border border-white/10 px-2.5 py-1 text-[11px] font-mono text-amber-300 flex items-center gap-1.5">
                    <ShieldCheck className="size-3.5 text-emerald-400" />
                    <span>Isolated Sandbox Mode</span>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Viewport Footer Spec */}
      <div className="flex items-center justify-between border-t border-white/10 bg-slate-950/80 px-4 py-2 text-[11px] text-slate-400">
        <span>Domain: <strong className="text-slate-200 font-mono">{url.replace('https://', '')}</strong></span>
        <span>Infrastructure: <strong className="text-slate-200 font-medium">{infrastructure}</strong></span>
      </div>
    </div>
  )
}
