import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

interface ProductOpsRegistryItem {
  id: string
  name: string
  slug: string
  productOwner: string
  status: 'DEVELOPMENT' | 'PREVIEW' | 'OPERATIONAL' | 'DEGRADED' | 'MAINTENANCE' | 'RETIRED'
  currentVersion: string
  productionUrl: string
  repositoryRef: string
  lastHealthCheck: string
  healthCheckResult: string
  roadmapHighlights: string[]
  changelog: { version: string; releaseDate: string; summary: string }[]
}

let productRegistry: ProductOpsRegistryItem[] = [
  {
    id: 'prod-jaslyn',
    name: 'Jaslyn Net ISP Operating System',
    slug: 'jaslyn-net',
    productOwner: 'Amani Bakari (Telecom Architect)',
    status: 'OPERATIONAL',
    currentVersion: 'v4.2.0',
    productionUrl: 'https://jaslyn-net.altavox.space',
    repositoryRef: 'branch:production • commit 3a1c0d4',
    lastHealthCheck: '2026-11-10T19:25:00Z',
    healthCheckResult: 'HTTP 200 (PPPoE radius pulse: healthy)',
    roadmapHighlights: [
      'Sub-second M-Pesa automatic throttling (Altavox Labs)',
      'Dual-homed BGP automatic failover to Arusha microwave POP'
    ],
    changelog: [
      { version: 'v4.2.0', releaseDate: 'Nov 8, 2026', summary: 'Added MikroTik RouterOS v7 dynamic profile synchronization' },
      { version: 'v4.1.2', releaseDate: 'Oct 20, 2026', summary: 'Integrated automated SMS renewal notifications' }
    ]
  },
  {
    id: 'prod-sammena',
    name: 'Sammena School Academic ERP & SIMS',
    slug: 'sammena',
    productOwner: 'Grace Mchome (Principal Engineer)',
    status: 'OPERATIONAL',
    currentVersion: 'v3.1.4',
    productionUrl: 'https://sammena.altavox.space',
    repositoryRef: 'branch:production • commit 9f2e4b8',
    lastHealthCheck: '2026-11-10T19:20:00Z',
    healthCheckResult: 'HTTP 200 (Biometric queue: 0 pending)',
    roadmapHighlights: [
      'Term 1 2027 report card digital signature export',
      'Automated parent fee payment reconciliation via Yas/Airtel'
    ],
    changelog: [
      { version: 'v3.1.4', releaseDate: 'Nov 5, 2026', summary: 'Biometric sync queue retry jitter tuning' },
      { version: 'v3.0.0', releaseDate: 'Sep 1, 2026', summary: 'PostgreSQL double-entry tuition fee ledger release' }
    ]
  },
  {
    id: 'prod-mrisho',
    name: 'Mrisho Art Curated E-Commerce Gallery',
    slug: 'mrisho-art-gallery',
    productOwner: 'Michael Kweka (CTO)',
    status: 'OPERATIONAL',
    currentVersion: 'v2.0.1',
    productionUrl: 'https://mrishoart.altavox.space',
    repositoryRef: 'branch:production • commit 1d6e8a0',
    lastHealthCheck: '2026-11-10T19:15:00Z',
    healthCheckResult: 'HTTP 200 (Sandbox iframe isolation active)',
    roadmapHighlights: [
      '3D spatial canvas preview using WebGL',
      'East African artist royalty tracking ledger'
    ],
    changelog: [
      { version: 'v2.0.1', releaseDate: 'Nov 2, 2026', summary: 'Isolated sandbox iframe with pointer lock toggle' }
    ]
  },
  {
    id: 'prod-wifi',
    name: 'Altavox WiFi Cloud Hotspot Controller',
    slug: 'altavox-wifi',
    productOwner: 'Amani Bakari (Carrier Ops)',
    status: 'OPERATIONAL',
    currentVersion: 'v2.4.0',
    productionUrl: 'https://altavox.space/wifi',
    repositoryRef: 'branch:main • commit 7b8f9e1',
    lastHealthCheck: '2026-11-10T19:28:00Z',
    healthCheckResult: 'HTTP 200 (RADIUS session pool responsive)',
    roadmapHighlights: [
      'Micro-voucher instant generation via Telegram bot',
      'Community mesh backhaul integration'
    ],
    changelog: [
      { version: 'v2.4.0', releaseDate: 'Oct 14, 2026', summary: 'Dynamic bandwidth profile QoS trees' }
    ]
  }
]

export async function GET() {
  return NextResponse.json({
    success: true,
    products: productRegistry
  })
}

export async function PATCH(req: NextRequest) {
  try {
    const { productId, status } = await req.json()
    const product = productRegistry.find((p) => p.id === productId)

    if (!product) {
      return NextResponse.json({ error: 'Product not found.' }, { status: 404 })
    }

    if (status) product.status = status
    product.lastHealthCheck = new Date().toISOString()

    return NextResponse.json({
      success: true,
      message: `Product ${product.name} lifecycle status updated to ${product.status}.`,
      product
    })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update product state.' }, { status: 500 })
  }
}
