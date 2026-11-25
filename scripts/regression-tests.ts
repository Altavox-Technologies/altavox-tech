import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { coursesData } from '../lib/courses-data'
import { projects } from '../lib/site-data'
import { checkRateLimit } from '../lib/rate-limit'
import { capturePayPalOrder } from '../lib/payments/paypal'

async function runTests() {
  let passed = 0
  const test = async (name: string, fn: () => void | Promise<void>) => {
    await fn()
    passed += 1
    console.log(`PASS: ${name}`)
  }

  await test('Academy catalog contains exactly 20 valid courses with unique slugs', () => {
    assert.equal(coursesData.length, 20, `Expected 20 courses, got ${coursesData.length}`)
    const slugs = new Set<string>()
    const ids = new Set<string>()
    for (const c of coursesData) {
      assert.match(c.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, `Invalid course slug: ${c.slug}`)
      assert.ok(!slugs.has(c.slug), `Duplicate course slug: ${c.slug}`)
      assert.ok(!ids.has(c.id), `Duplicate course id: ${c.id}`)
      slugs.add(c.slug)
      ids.add(c.id)
      assert.ok(c.discountPrice > 0 && c.originalPrice >= c.discountPrice, `Invalid pricing for ${c.slug}`)
      assert.ok(c.modules.length > 0, `Missing modules for ${c.slug}`)
      assert.ok(c.learningObjectives.length > 0, `Missing objectives for ${c.slug}`)
    }
  })

  await test('Unified projects portfolio covers all client and ecosystem deployments', () => {
    const expectedSlugs = [
      'jaslyn-net',
      'sammena',
      'mrisho-art-gallery',
      'altavox-wifi',
      'altavox-academy',
      'altavox-bookstore',
      'altavox-computer-desk',
      'netbill-noc',
      'nexora-cloud',
    ]
    const actualSlugs = new Set(projects.map((p) => p.slug))
    for (const slug of expectedSlugs) {
      assert.ok(actualSlugs.has(slug), `Missing expected project slug: ${slug}`)
    }
    const mrisho = projects.find((p) => p.slug === 'mrisho-art-gallery')
    assert.ok(mrisho?.screenshotUrl, 'mrisho-art-gallery should have verified screenshotUrl')
    assert.ok(mrisho?.engineeringChallenge && mrisho?.engineeringSolution, 'mrisho-art-gallery should have case study challenge & solution')
    assert.ok(mrisho?.architecture, 'mrisho-art-gallery should have architecture stack summary')
  })

  await test('Projects conform to firebase-blueprint.json schema rules', () => {
    const blueprint = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'firebase-blueprint.json'), 'utf8'))
    const slugPattern = new RegExp(blueprint.entities.Project.properties.slug.pattern)
    for (const p of projects) {
      assert.match(p.slug, slugPattern, `Project slug failed blueprint regex: ${p.slug}`)
      assert.ok(p.name.length >= 2 && p.name.length <= 160)
      assert.ok(p.summary.length >= 10 && p.summary.length <= 500)
      assert.ok(p.description.length >= 10 && p.description.length <= 3000)
      assert.ok(Array.isArray(p.tags) && p.tags.length > 0 && p.tags.length <= 12)
      assert.ok(Array.isArray(p.keyFeatures) && p.keyFeatures.length > 0 && p.keyFeatures.length <= 12)
    }
  })

  await test('Rate limiter enforces window ceiling and isolates client keys', () => {
    const keyA = `test-rl-a-${Date.now()}`
    const keyB = `test-rl-b-${Date.now()}`
    for (let i = 0; i < 3; i++) {
      const r = checkRateLimit(keyA, 3, 60_000)
      assert.equal(r.allowed, true)
    }
    const blocked = checkRateLimit(keyA, 3, 60_000)
    assert.equal(blocked.allowed, false)
    assert.equal(blocked.remaining, 0)
    assert.ok(blocked.retryAfterSeconds >= 1)

    const isolated = checkRateLimit(keyB, 3, 60_000)
    assert.equal(isolated.allowed, true)
  })

  await test('PayPal capture refuses mock/unconfigured orders', async () => {
    const res = await capturePayPalOrder({
      internalOrderId: 'ATX-TEST-1',
      providerOrderId: 'MOCK-PAYPAL-BYPASS',
      expectedAmount: 49,
      expectedCurrency: 'USD',
    })
    assert.equal(res.success, false)
    assert.equal(res.status, 'failed')
    assert.equal(res.transactionId, '')
  })

  await test('Protected admin and OS API routes enforce authentication helpers', () => {
    const guardedFiles = [
      'app/api/developers/keys/route.ts',
      'app/api/inquiries/route.ts',
      'app/api/support/tickets/route.ts',
      'app/api/os/analytics/route.ts',
      'app/api/os/crm/route.ts',
      'app/api/os/erp/route.ts',
      'app/api/os/flow/route.ts',
      'app/api/os/productops/route.ts',
      'app/api/os/security/route.ts',
      'app/api/os/subscriptions/route.ts',
    ]
    for (const relPath of guardedFiles) {
      const source = fs.readFileSync(path.join(process.cwd(), relPath), 'utf8')
      const hasGuard =
        source.includes('requireAdminApiAccess') || source.includes('getVerifiedAdminActor')
      assert.ok(hasGuard, `Missing server admin auth check in ${relPath}`)
    }
  })

  console.log(`\nAll ${passed} regression tests passed cleanly.`)
}

runTests().catch((err) => {
  console.error('Regression test failure:', err)
  process.exit(1)
})
