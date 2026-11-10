import { timingSafeEqual } from 'node:crypto'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

type VercelDeployment = {
  uid?: string
  id?: string
  name?: string
  url?: string
  state?: string
  readyState?: string
  createdAt?: number
  target?: string | null
  meta?: {
    githubCommitSha?: string
    githubCommitRef?: string
    githubCommitMessage?: string
    githubRepo?: string
    githubOrg?: string
  }
}

type GitHubRun = {
  id: number
  name?: string
  display_title?: string
  status: string
  conclusion: string | null
  html_url: string
  head_sha: string
  head_branch: string
  created_at: string
  updated_at: string
}

function unauthorized() {
  return NextResponse.json(
    { error: 'Deployment desk access is not configured or authorized.' },
    { status: 401, headers: { 'Cache-Control': 'no-store' } },
  )
}

export async function GET(request: Request) {
  const expectedKey = process.env.DEPLOYMENT_DESK_KEY
  const supplied = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '')
  if (!expectedKey || !supplied) return unauthorized()

  const expectedBytes = Buffer.from(expectedKey)
  const suppliedBytes = Buffer.from(supplied)
  if (expectedBytes.length !== suppliedBytes.length || !timingSafeEqual(expectedBytes, suppliedBytes)) {
    return unauthorized()
  }

  const token = process.env.VERCEL_TOKEN
  const projectId = process.env.VERCEL_PROJECT_ID
  const teamId = process.env.VERCEL_TEAM_ID
  if (!token || !projectId) {
    return NextResponse.json(
      { error: 'Live data is not configured. Set VERCEL_TOKEN and VERCEL_PROJECT_ID in the server environment.' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } },
    )
  }

  const query = new URLSearchParams({ projectId, limit: '10' })
  if (teamId) query.set('teamId', teamId)

  try {
    const vercelResponse = await fetch(`https://api.vercel.com/v6/deployments?${query.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
      signal: AbortSignal.timeout(12000),
    })

    if (!vercelResponse.ok) {
      return NextResponse.json(
        { error: `Vercel API returned HTTP ${vercelResponse.status}. Check the server token, team access, and project ID.` },
        { status: 502, headers: { 'Cache-Control': 'no-store' } },
      )
    }

    const vercelPayload = await vercelResponse.json() as { deployments?: VercelDeployment[] }
    const deployments = (vercelPayload.deployments ?? []).map((item) => ({
      id: item.uid ?? item.id ?? 'unknown',
      name: item.name ?? 'Unnamed deployment',
      url: item.url ? `https://${item.url.replace(/^https?:\/\//, '')}` : null,
      state: item.readyState ?? item.state ?? 'UNKNOWN',
      createdAt: item.createdAt ?? null,
      target: item.target ?? 'preview',
      commit: item.meta?.githubCommitSha ?? null,
      branch: item.meta?.githubCommitRef ?? null,
      message: item.meta?.githubCommitMessage ?? null,
      repository: [item.meta?.githubOrg, item.meta?.githubRepo].filter(Boolean).join('/') || null,
    }))

    const githubHeaders: Record<string, string> = {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    }
    if (process.env.GITHUB_TOKEN) githubHeaders.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`

    let githubRuns: Pick<GitHubRun, 'id' | 'name' | 'display_title' | 'status' | 'conclusion' | 'html_url' | 'head_sha' | 'head_branch' | 'created_at' | 'updated_at'>[] = []
    let githubError: string | null = null
    try {
      const githubResponse = await fetch(
        'https://api.github.com/repos/yurian51/altavox-tech/actions/runs?per_page=5',
        { headers: githubHeaders, cache: 'no-store', signal: AbortSignal.timeout(10000) },
      )
      if (githubResponse.ok) {
        const githubPayload = await githubResponse.json() as { workflow_runs?: GitHubRun[] }
        githubRuns = (githubPayload.workflow_runs ?? []).map((run) => ({
          id: run.id,
          name: run.name ?? 'GitHub Actions',
          display_title: run.display_title ?? run.name ?? 'Workflow run',
          status: run.status,
          conclusion: run.conclusion,
          html_url: run.html_url,
          head_sha: run.head_sha,
          head_branch: run.head_branch,
          created_at: run.created_at,
          updated_at: run.updated_at,
        }))
      } else {
        githubError = `GitHub API returned HTTP ${githubResponse.status}.`
      }
    } catch {
      githubError = 'Unable to reach the GitHub Actions API.'
    }

    return NextResponse.json({
      source: 'Vercel API + GitHub Actions API',
      checkedAt: new Date().toISOString(),
      projectId,
      deployments,
      github: { repository: 'yurian51/altavox-tech', workflowRuns: githubRuns, error: githubError },
    }, { headers: { 'Cache-Control': 'no-store, max-age=0' } })
  } catch {
    return NextResponse.json(
      { error: 'Unable to reach Vercel API. Check network access and try again.' },
      { status: 502, headers: { 'Cache-Control': 'no-store' } },
    )
  }
}
