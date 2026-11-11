import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export const dynamic = 'force-dynamic'

interface DevApiKey {
  id: string
  name: string
  keyPrefix: string
  secretKey?: string // Only returned on creation
  createdAt: string
  lastUsedAt: string
  environment: 'live' | 'test'
  status: 'active' | 'revoked'
  scopes: string[]
}

// Memory-backed developer key registry
let devKeys: DevApiKey[] = [
  {
    id: 'key-dev-01',
    name: 'Production Gateway Key',
    keyPrefix: 'avx_live_9a7d',
    createdAt: '2026-10-15T08:30:00Z',
    lastUsedAt: '2026-11-10T19:42:00Z',
    environment: 'live',
    status: 'active',
    scopes: ['orders:create', 'courses:read', 'telemetry:read']
  },
  {
    id: 'key-dev-02',
    name: 'Sandbox Integration Tester',
    keyPrefix: 'avx_test_4f2e',
    createdAt: '2026-11-02T14:10:00Z',
    lastUsedAt: '2026-11-10T21:15:00Z',
    environment: 'test',
    status: 'active',
    scopes: ['*']
  }
]

export async function GET() {
  // Return list of keys without sensitive raw secret
  const safeKeys = devKeys.map(({ secretKey, ...rest }) => rest)
  return NextResponse.json({ success: true, keys: safeKeys })
}

export async function POST(req: NextRequest) {
  try {
    const { name, environment = 'test', scopes = ['courses:read', 'orders:create'] } = await req.json()

    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: 'Key name is required.' }, { status: 400 })
    }

    const randomBytes = crypto.randomBytes(24).toString('hex')
    const prefix = environment === 'live' ? 'avx_live_' : 'avx_test_'
    const rawSecretKey = `${prefix}${randomBytes}`
    const keyPrefix = `${prefix}${randomBytes.slice(0, 4)}`

    const newKey: DevApiKey = {
      id: `key-dev-${Date.now()}`,
      name: name.trim(),
      keyPrefix,
      secretKey: rawSecretKey, // Only provided once on creation
      createdAt: new Date().toISOString(),
      lastUsedAt: 'Never',
      environment: environment === 'live' ? 'live' : 'test',
      status: 'active',
      scopes: Array.isArray(scopes) ? scopes : ['courses:read']
    }

    devKeys = [newKey, ...devKeys]

    return NextResponse.json({
      success: true,
      message: 'API Key generated successfully. Save this secret now; you will not be able to view it again.',
      key: newKey
    })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to generate developer API key.' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Key ID is required.' }, { status: 400 })
    }

    devKeys = devKeys.map((k) => (k.id === id ? { ...k, status: 'revoked' as const } : k))

    return NextResponse.json({ success: true, message: 'API key revoked successfully.' })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to revoke API key.' }, { status: 500 })
  }
}
