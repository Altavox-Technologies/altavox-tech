'use client'

import { useCallback, useState } from 'react'
import { Activity, ExternalLink, GitBranch, LockKeyhole, RefreshCw, ShieldCheck } from 'lucide-react'
import { PageFrame } from '@/components/site-shell'

type Deployment = {
  id: string
  name: string
  url: string | null
  state: string
  createdAt: number | null
  target: string
  commit: string | null
  branch: string | null
  message: string | null
  repository: string | null
}

type WorkflowRun = {
  id: number
  name: string
  display_title: string
  status: string
  conclusion: string | null
  html_url: string
  head_sha: string
  head_branch: string
  created_at: string
  updated_at: string
}

type DeskResponse = {
  source?: string
  checkedAt?: string
  projectId?: string
  deployments?: Deployment[]
  github?: { repository: string; workflowRuns: WorkflowRun[]; error: string | null }
  error?: string
}

function stateTone(state: string) {
  const value = state.toUpperCase()
  if (value === 'READY' || value === 'SUCCESS' || value === 'COMPLETED' && !['failure', 'cancelled', 'timed_out'].includes(value.toLowerCase())) return 'border-emerald-300 bg-emerald-50 text-emerald-800'
  if (value === 'ERROR' || value === 'CANCELED' || value === 'BLOCKED' || value === 'FAILURE' || value === 'CANCELLED' || value === 'TIMED_OUT') return 'border-red-300 bg-red-50 text-red-800'
  return 'border-amber-300 bg-amber-50 text-amber-800'
}

export default function DeploymentDeskPage() {
  const [key, setKey] = useState('')
  const [data, setData] = useState<DeskResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const refresh = useCallback(async () => {
    if (!key.trim()) {
      setError('Enter the deployment desk access key.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/deployment-desk', {
        headers: { Authorization: `Bearer ${key.trim()}` },
        cache: 'no-store',
      })
      const result = await response.json() as DeskResponse
      if (!response.ok) throw new Error(result.error ?? `Request failed with HTTP ${response.status}`)
      setData(result)
    } catch (cause) {
      setData(null)
      setError(cause instanceof Error ? cause.message : 'Unable to load deployment status.')
    } finally {
      setLoading(false)
    }
  }, [key])

  return <PageFrame eyebrow="Operations / Deployment" title="Deployment desk" intro="A private operations view of Vercel deployments and GitHub Actions runs. Status and commit details are fetched live from provider APIs, not generated or hard-coded.">
    <section className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-14">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_2fr]">
        <div className="h-fit border border-[#dedbd3] bg-white p-5 sm:p-6">
          <div className="mb-4 flex items-center gap-3"><span className="flex size-10 items-center justify-center bg-[#f4f1e9] text-[#8a5d00]"><LockKeyhole className="size-5" /></span><div><h2 className="font-semibold">Secure access</h2><p className="text-xs text-[#69717c]">Key is sent only to this site's server endpoint.</p></div></div>
          <label htmlFor="desk-key" className="mb-2 block text-sm font-medium">Access key</label>
          <input id="desk-key" type="password" autoComplete="current-password" value={key} onChange={(event) => setKey(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') void refresh() }} className="min-h-11 w-full border border-[#cfcac0] bg-[#fbfaf7] px-3 text-sm outline-none focus:border-[#a36d00] focus:ring-2 focus:ring-[#a36d00]/20" placeholder="Deployment desk key" />
          <button type="button" onClick={() => void refresh()} disabled={loading} className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 bg-[#101b2b] px-4 py-3 text-sm font-semibold text-white hover:bg-[#263a55] disabled:opacity-60">{loading ? <RefreshCw className="size-4 animate-spin" /> : <ShieldCheck className="size-4" />}{loading ? 'Checking live status…' : 'Load deployment status'}</button>
          {error && <p role="alert" className="mt-4 border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p>}
          <p className="mt-5 text-xs leading-6 text-[#69717c]">Configure the access key and provider credentials as server environment variables. Credentials are never returned to the browser. Do not use a Vercel token as the access key.</p>
        </div>
        <div className="min-w-0">
          {!data && !error && <div className="flex min-h-64 flex-col items-center justify-center border border-dashed border-[#cfcac0] bg-white px-6 text-center"><Activity className="mb-3 size-8 text-[#8a5d00]" /><h2 className="font-semibold">Live deployment status</h2><p className="mt-2 max-w-md text-sm leading-6 text-[#69717c]">Authenticate to request recent deployment and workflow history from Vercel and GitHub.</p></div>}
          {data && <>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border border-[#dedbd3] bg-white p-4"><div><p className="text-xs uppercase tracking-wider text-[#69717c]">Live sources</p><p className="mt-1 font-semibold">Vercel + GitHub Actions <span className="font-normal text-[#69717c]">· {(data.deployments?.length ?? 0) + (data.github?.workflowRuns.length ?? 0)} records</span></p><p className="mt-1 break-all font-mono text-xs text-[#69717c]">Vercel project {data.projectId}</p></div><button type="button" onClick={() => void refresh()} disabled={loading} aria-label="Refresh deployment data" className="inline-flex min-h-10 items-center gap-2 border border-[#dedbd3] px-3 text-sm hover:border-[#a36d00] disabled:opacity-60"><RefreshCw className={`size-4 ${loading ? 'animate-spin' : ''}`} />Refresh</button></div>
            <p className="mb-5 text-xs text-[#69717c]">Last checked: {data.checkedAt ? new Date(data.checkedAt).toLocaleString() : 'Unknown'}</p>
            <section className="mb-8"><div className="mb-3 flex items-center gap-2"><GitBranch className="size-5 text-[#8a5d00]" /><h2 className="text-lg font-semibold">GitHub Actions</h2></div><p className="mb-3 text-xs text-[#69717c]">{data.github?.repository ?? 'yurian51/altavox-tech'} · latest workflow runs from GitHub API</p>
              {data.github?.error && <p role="status" className="mb-3 border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">{data.github.error}</p>}
              {data.github?.workflowRuns.map((run) => <article key={run.id} className="mb-3 border border-[#dedbd3] bg-white p-4"><div className="flex flex-wrap items-start justify-between gap-3"><div className="min-w-0"><p className="break-words font-semibold">{run.display_title}</p><p className="mt-1 text-xs text-[#69717c]">{run.head_branch} · {run.head_sha.slice(0, 8)}</p></div><span className={`shrink-0 border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${stateTone(run.status === 'completed' ? (run.conclusion ?? 'UNKNOWN') : run.status)}`}>{run.status === 'completed' ? run.conclusion ?? run.status : run.status}</span></div><p className="mt-3 text-xs text-[#69717c]">Updated {new Date(run.updated_at).toLocaleString()}</p><a href={run.html_url} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#8a5d00] underline underline-offset-4 hover:no-underline">View workflow <ExternalLink className="size-4" /></a></article>)}
              {data.github && !data.github.error && data.github.workflowRuns.length === 0 && <p className="border border-[#dedbd3] bg-white p-5 text-sm text-[#69717c]">GitHub returned no workflow runs. This is an empty result, not a passing check.</p>}
            </section>
            <section><h2 className="mb-3 text-lg font-semibold">Vercel deployments</h2><div className="space-y-3">{(data.deployments ?? []).map((deployment) => <article key={deployment.id} className="border border-[#dedbd3] bg-white p-4 sm:p-5"><div className="flex flex-wrap items-start justify-between gap-3"><div className="min-w-0"><p className="break-all font-mono text-xs text-[#69717c]">{deployment.id}</p><h3 className="mt-1 break-words font-semibold">{deployment.branch ?? deployment.name}</h3><p className="mt-1 break-words text-sm text-[#4e5662]">{deployment.message ?? 'No commit message provided by source metadata.'}</p></div><span className={`shrink-0 border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${stateTone(deployment.state)}`}>{deployment.state}</span></div><div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#69717c]"><span>Target: {deployment.target ?? 'unknown'}</span><span>{deployment.createdAt ? new Date(deployment.createdAt).toLocaleString() : 'Creation time unavailable'}</span>{deployment.commit && <span>Commit: {deployment.commit.slice(0, 8)}</span>}</div>{deployment.url && <a href={deployment.url} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#8a5d00] underline underline-offset-4 hover:no-underline">Open deployment <ExternalLink className="size-4" /></a>}</article>)}</div>
              {data.deployments?.length === 0 && <p className="border border-[#dedbd3] bg-white p-6 text-sm text-[#69717c]">Vercel returned no deployments for this project.</p>}
            </section>
          </>}
        </div>
      </div>
    </section>
  </PageFrame>
}
