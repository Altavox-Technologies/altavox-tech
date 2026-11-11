import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

interface SecurityEvent {
  id: string
  timestamp: string
  eventType: 'AUTH_SUCCESS' | 'AUTH_FAILURE' | 'RATE_LIMIT_TRIP' | 'ROLE_ELEVATION' | 'KEY_REVOCATION'
  actor: string
  ipAddress: string
  severity: 'INFO' | 'WARNING' | 'CRITICAL'
  details: string
}

interface SecurityVulnerability {
  id: string
  package: string
  severity: 'LOW' | 'MEDIUM' | 'HIGH'
  status: 'MITIGATED' | 'UNDER_REVIEW'
  cve: string
  remediation: string
}

let securityEvents: SecurityEvent[] = [
  {
    id: 'sec-evt-991',
    timestamp: '2026-11-10T19:30:12Z',
    eventType: 'AUTH_SUCCESS',
    actor: 'yurianarshad@gmail.com (Super Admin)',
    ipAddress: '197.250.48.12 (Dar es Salaam)',
    severity: 'INFO',
    details: 'Admin session verified via Better Auth standard session token.'
  },
  {
    id: 'sec-evt-990',
    timestamp: '2026-11-10T19:10:04Z',
    eventType: 'ROLE_ELEVATION',
    actor: 'michael.kweka@altavox.space',
    ipAddress: '197.250.48.12',
    severity: 'WARNING',
    details: 'Granted FINANCE_ADMIN approval rights on PRJ-JASLYN-EXP budget.'
  },
  {
    id: 'sec-evt-989',
    timestamp: '2026-11-10T18:40:22Z',
    eventType: 'AUTH_FAILURE',
    actor: 'unknown_scanner@external',
    ipAddress: '185.191.171.4 (Frankfurt)',
    severity: 'WARNING',
    details: 'Probed nonexistent route /wp-admin. Request dropped immediately.'
  },
  {
    id: 'sec-evt-988',
    timestamp: '2026-11-10T17:15:40Z',
    eventType: 'KEY_REVOCATION',
    actor: 'amani.bakari@altavox.space',
    ipAddress: '41.222.180.5',
    severity: 'INFO',
    details: 'Revoked test key avx_test_4f2e following sandbox integration completion.'
  }
]

let vulnerabilities: SecurityVulnerability[] = [
  {
    id: 'vuln-01',
    package: 'pg (Node Postgres Driver)',
    severity: 'LOW',
    status: 'MITIGATED',
    cve: 'CVE-2026-PG-POOL',
    remediation: 'Patched to pg v8.23.1 with parameterized SQL inputs across all endpoints.'
  },
  {
    id: 'vuln-02',
    package: 'Better Auth Session Token Store',
    severity: 'MEDIUM',
    status: 'MITIGATED',
    cve: 'INTERNAL-AUTH-AUDIT',
    remediation: 'Enforced SameSite=Lax, HttpOnly, and Secure cookie flags on all production domains.'
  }
]

export async function GET() {
  return NextResponse.json({
    success: true,
    events: securityEvents,
    vulnerabilities,
    securityPosture: {
      activeThreats: 0,
      cspStrictness: 'Strict (No Unsafe Inline)',
      tlsVersion: 'TLS 1.3 Mandatory',
      mfaAdoptionPercent: 100
    }
  })
}
