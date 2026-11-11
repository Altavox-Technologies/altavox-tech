'use client'

import { useEffect } from 'react'
import { RotateCcw, AlertTriangle } from 'lucide-react'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Automatically recover from stale chunk hashes following server rebuilds
    const msg = error?.message || ''
    if (
      msg.includes('ChunkLoadError') ||
      msg.includes('Failed to load chunk') ||
      error?.name === 'ChunkLoadError'
    ) {
      const lastRetry = sessionStorage.getItem('altavox_chunk_retry')
      const now = Date.now()
      if (!lastRetry || now - parseInt(lastRetry, 10) > 8000) {
        sessionStorage.setItem('altavox_chunk_retry', String(now))
        window.location.reload()
      }
    }
  }, [error])

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-[#070d19] text-slate-100 p-6">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-6 text-center space-y-4">
        <div className="size-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
          <AlertTriangle className="size-6" />
        </div>
        <h2 className="text-lg font-bold text-white">Temporary Asset Synchronization</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          Application chunks have updated following an engineering release. Refresh to sync with the current build.
        </p>
        <button
          onClick={() => {
            if (typeof window !== 'undefined') {
              window.location.reload()
            } else {
              reset()
            }
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition cursor-pointer"
        >
          <RotateCcw className="size-3.5" />
          <span>Reload Application</span>
        </button>
      </div>
    </div>
  )
}
