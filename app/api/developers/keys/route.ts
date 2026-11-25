import { NextRequest, NextResponse } from 'next/server'
import crypto from 'node:crypto'
import { requireAdminApiAccess } from '@/lib/api-auth'

export const dynamic = 'force-dynamic'

interface DevApiKey {
  id: string
  name: string
  keyPrefix: string
  secretKey?: string
  createdAt: string
  lastUsedAt: string
  environment: 'live' | 'test'
  status: 'active' | 'revoked'
  scopes: string[]
}

let devKeys: DevApiKey[] = []

export async function GET(req: NextRequest) {
  const authCheck = await requireAdminApiAccess(req)
  if (!authCheck.ok) return authCheck.response

  const safeKeys = devKeys.map(({ secretKey, ...rest }) => rest)
  return NextResponse.json(
    { success: true, keys: safeKeys },
    { headers: { 'Cache-Control': 'no-store' } }
  )
}

export async function POST(req: NextRequest) {
  const authCheck = await requireAdminApiAccess(req)
  if (!authCheck.ok) return authCheck.response

  try {
    const body = await req.json().catch(() => null)
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
    }

    const { name, environment = 'test', scopes = ['courses:read', 'orders:create'] } = body

    if (!name || typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 80) {
      return NextResponse.json({ error: 'Valid key name (2-80 chars) is required.' }, { status: 400 })
    }

    const randomBytes = crypto.randomBytes(24).toString('hex')
    const prefix = environment === 'live' ? 'avx_live_' : 'avx_test_'
    const rawSecretKey = `${prefix}${randomBytes}`
    const keyPrefix = `${prefix}${randomBytes.slice(0, 4)}`

    const newKey: DevApiKey = {
      id: `key-dev-${Date.now()}`,
      name: name.trim(),
      keyPrefix,
      secretKey: rawSecretKey,
      createdAt: new Date().toISOString(),
      lastUsedAt: 'Never',
      environment: environment === 'live' ? 'live' : 'test',
      status: 'active',
      scopes: Array.isArray(scopes) ? scopes.map(String).slice(0, 10) : ['courses:read'],
    }

    devKeys = [newKey, ...devKeys]

    return NextResponse.json(
      {
        success: true,
        message: 'API Key generated successfully. Save this secret now; you will not be able to view it again.',
        key: newKey,
      },
      { headers: { 'Cache-Control': 'no-store' } }
    )
  } catch {
    return NextResponse.json({ error: 'Failed to generate developer API key.' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const authCheck = await requireAdminApiAccess(req)
  if (!authCheck.ok) return authCheck.response

  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id || id.length > 64) {
      return NextResponse.json({ error: 'Valid Key ID is required.' }, { status: 400 })
    }

    const exists = devKeys.some((k) => k.id === id)
    if (!exists) {
      return NextResponse.json({ error: 'Key not found.' }, { status: 404 })
    }

    devKeys = devKeys.map((k) => (k.id === id ? { ...k, status: 'revoked' as const } : k))

    return NextResponse.json({ success: true, message: 'API key revoked successfully.' })
  } catch {
    return NextResponse.json({ error: 'Failed to revoke API key.' }, { status: 500 })
  }
}
