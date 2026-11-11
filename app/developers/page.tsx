'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Code2,
  Terminal,
  Key,
  Webhook,
  BookOpen,
  Copy,
  Check,
  ShieldCheck,
  Zap,
  ArrowRight,
  ExternalLink,
  Layers,
  FileCode2,
  Lock,
  Trash2,
  RefreshCw,
  Plus
} from 'lucide-react'
import { AltavoxHeader } from '@/components/altavox-header'
import { AltavoxFooter } from '@/components/altavox-footer'

interface ApiKeyItem {
  id: string
  name: string
  keyPrefix: string
  createdAt: string
  lastUsedAt: string
  environment: 'live' | 'test'
  status: 'active' | 'revoked'
  scopes: string[]
}

export default function AltavoxDevelopersPage() {
  const [activeTab, setActiveTab] = useState<'docs' | 'keys' | 'webhooks' | 'sdks'>('docs')
  const [keys, setKeys] = useState<ApiKeyItem[]>([])
  const [newKeyName, setNewKeyName] = useState('')
  const [newKeyEnv, setNewKeyEnv] = useState<'test' | 'live'>('test')
  const [createdSecret, setCreatedSecret] = useState<string | null>(null)
  const [keyLoading, setKeyLoading] = useState(false)
  const [copiedSecret, setCopiedSecret] = useState(false)
  const [codeLang, setCodeLang] = useState<'curl' | 'typescript' | 'python'>('curl')

  // Webhook tester state
  const [webhookEvent, setWebhookEvent] = useState<'payment.captured' | 'course.enrolled' | 'ticket.created'>('payment.captured')
  const [webhookPayload, setWebhookPayload] = useState<string>('')
  const [copiedPayload, setCopiedPayload] = useState(false)

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedPayload(true)
    setTimeout(() => setCopiedPayload(false), 2000)
  }

  useEffect(() => {
    fetchKeys()
    updateWebhookPayload('payment.captured')
  }, [])

  const fetchKeys = async () => {
    try {
      const res = await fetch('/api/developers/keys')
      const data = await res.json()
      if (data.keys) setKeys(data.keys)
    } catch (err) {
      // Fallback
    }
  }

  const handleCreateKey = async () => {
    if (!newKeyName.trim()) return
    setKeyLoading(true)

    try {
      const res = await fetch('/api/developers/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newKeyName, environment: newKeyEnv })
      })
      const data = await res.json()
      if (data.key) {
        setCreatedSecret(data.key.secretKey)
        setNewKeyName('')
        fetchKeys()
      }
    } catch (err) {
      alert('Error creating API key.')
    } finally {
      setKeyLoading(false)
    }
  }

  const handleRevokeKey = async (id: string) => {
    if (!confirm('Are you sure you want to revoke this API key? This will immediately invalidate existing integrations.')) return
    try {
      await fetch(`/api/developers/keys?id=${id}`, { method: 'DELETE' })
      fetchKeys()
    } catch (err) {
      alert('Error revoking key.')
    }
  }

  const updateWebhookPayload = (event: 'payment.captured' | 'course.enrolled' | 'ticket.created') => {
    setWebhookEvent(event)
    const samples = {
      'payment.captured': {
        id: 'evt_pay_994821',
        event: 'payment.captured',
        timestamp: new Date().toISOString(),
        data: {
          orderId: 'ATX-882194',
          provider: 'paypal',
          amount: 149.0,
          currency: 'USD',
          status: 'completed',
          customerEmail: 'operator@altavox.space'
        }
      },
      'course.enrolled': {
        id: 'evt_enr_331049',
        event: 'course.enrolled',
        timestamp: new Date().toISOString(),
        data: {
          studentId: 'usr_mkweka_92',
          courseSlug: 'full-stack-web-development',
          enrolledAt: new Date().toISOString(),
          grantLmsAccess: true
        }
      },
      'ticket.created': {
        id: 'evt_tkt_774102',
        event: 'ticket.created',
        timestamp: new Date().toISOString(),
        data: {
          ticketId: 'TKT-8841',
          category: 'network_infrastructure',
          priority: 'critical',
          subject: 'BGP peering latency variance on DAR-01'
        }
      }
    }
    setWebhookPayload(JSON.stringify(samples[event], null, 2))
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-900 font-sans text-slate-100">
      <AltavoxHeader />

      <main className="flex-1 pb-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 py-16 sm:py-20">
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                <Code2 className="size-3.5" /> Altavox Developers Platform
              </div>
              <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                APIs, Webhooks & Integration Hub
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
                Connect your business systems with Altavox Tech. Automate course enrollments, verify PayPal payments, query edge telemetry, and build on our telecommunications infrastructure.
              </p>
            </div>

            {/* Division Tabs */}
            <div className="mt-10 flex flex-wrap gap-2 border-b border-white/10 pb-4">
              <button
                type="button"
                onClick={() => setActiveTab('docs')}
                className={`rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                  activeTab === 'docs' ? 'bg-[#f26522] text-white shadow-lg' : 'bg-white/5 text-slate-300 hover:text-white'
                }`}
              >
                API Reference (v1)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('keys')}
                className={`rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                  activeTab === 'keys' ? 'bg-[#f26522] text-white shadow-lg' : 'bg-white/5 text-slate-300 hover:text-white'
                }`}
              >
                API Keys ({keys.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('webhooks')}
                className={`rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                  activeTab === 'webhooks' ? 'bg-[#f26522] text-white shadow-lg' : 'bg-white/5 text-slate-300 hover:text-white'
                }`}
              >
                Webhooks Simulator
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('sdks')}
                className={`rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                  activeTab === 'sdks' ? 'bg-[#f26522] text-white shadow-lg' : 'bg-white/5 text-slate-300 hover:text-white'
                }`}
              >
                SDKs & Code Samples
              </button>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
          {/* TAB 1: API REFERENCE */}
          {activeTab === 'docs' && (
            <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
              <div className="space-y-6">
                <div className="rounded-2xl border border-white/10 bg-slate-800/60 p-6 sm:p-8">
                  <h2 className="text-lg font-bold text-white">RESTful Endpoints Overview</h2>
                  <p className="text-xs text-slate-400 mt-1">
                    All requests require standard TLS 1.3 encryption and JSON payload bodies.
                  </p>

                  <div className="mt-6 space-y-4">
                    {/* Endpoint 1 */}
                    <div className="rounded-xl border border-white/10 bg-slate-900/90 p-4 font-mono text-xs">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-emerald-500/20 text-emerald-300 px-2 py-0.5 text-[10px] font-bold">GET</span>
                        <span className="text-white">/api/payments/status</span>
                      </div>
                      <p className="mt-2 text-[11px] font-sans text-slate-400">
                        Returns registered payment provider states (PayPal, M-Pesa, Airtel, Yas, AzamPesa) and primary currency.
                      </p>
                    </div>

                    {/* Endpoint 2 */}
                    <div className="rounded-xl border border-white/10 bg-slate-900/90 p-4 font-mono text-xs">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-sky-500/20 text-sky-300 px-2 py-0.5 text-[10px] font-bold">POST</span>
                        <span className="text-white">/api/payments/paypal/create-order</span>
                      </div>
                      <p className="mt-2 text-[11px] font-sans text-slate-400">
                        Initiates server-side validated PayPal order for courses or marketplace items.
                      </p>
                    </div>

                    {/* Endpoint 3 */}
                    <div className="rounded-xl border border-white/10 bg-slate-900/90 p-4 font-mono text-xs">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-sky-500/20 text-sky-300 px-2 py-0.5 text-[10px] font-bold">POST</span>
                        <span className="text-white">/api/payments/paypal/capture-order</span>
                      </div>
                      <p className="mt-2 text-[11px] font-sans text-slate-400">
                        Captures authorized PayPal transaction and issues internal double-entry ledger reference.
                      </p>
                    </div>

                    {/* Endpoint 4 */}
                    <div className="rounded-xl border border-white/10 bg-slate-900/90 p-4 font-mono text-xs">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-emerald-500/20 text-emerald-300 px-2 py-0.5 text-[10px] font-bold">GET</span>
                        <span className="text-white">/api/bookstore/download/[id]</span>
                      </div>
                      <p className="mt-2 text-[11px] font-sans text-slate-400">
                        Generates a signed, time-limited 15-minute cryptographically bound download token for authorized digital purchases.
                      </p>
                    </div>

                    {/* Endpoint 5 */}
                    <div className="rounded-xl border border-white/10 bg-slate-900/90 p-4 font-mono text-xs">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-purple-500/20 text-purple-300 px-2 py-0.5 text-[10px] font-bold">POST</span>
                        <span className="text-white">/api/ai/assistant</span>
                      </div>
                      <p className="mt-2 text-[11px] font-sans text-slate-400">
                        Queries the server-side Altavox AI systems intelligence engine for network architecture and database schemas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Authentication Guide */}
              <div className="space-y-6">
                <div className="rounded-2xl border border-white/10 bg-slate-800/40 p-6">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    Authentication Headers
                  </h3>
                  <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                    Include your secret key in the Authorization header of every programmatic request:
                  </p>
                  <div className="mt-3 rounded-lg bg-slate-950 p-3 font-mono text-xs text-sky-400">
                    Authorization: Bearer avx_live_...
                  </div>
                  <p className="mt-3 text-[11px] text-slate-400 leading-relaxed">
                    Never check secret API keys into public git repositories. Use environment variables on your servers.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: API KEYS */}
          {activeTab === 'keys' && (
            <div className="rounded-2xl border border-white/10 bg-slate-800/60 p-6 sm:p-8 shadow-xl max-w-4xl space-y-8">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Key className="size-4 text-[#f26522]" /> Manage Secret API Keys
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  API keys allow your backend servers to programmatically access the Altavox Tech digital ecosystem.
                </p>
              </div>

              {/* Newly Created Secret Modal Notice */}
              {createdSecret && (
                <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-5">
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase font-mono">
                    <ShieldCheck className="size-4 text-amber-400" />
                    Save Your API Secret Key Now
                  </div>
                  <p className="mt-1 text-xs text-slate-300">
                    For your security, this key will <strong>never be shown again</strong>. Copy and store it in your encrypted environment manager.
                  </p>
                  <div className="mt-3 flex items-center gap-2 rounded-lg bg-slate-950 p-3 font-mono text-xs text-amber-300 border border-amber-500/30">
                    <span className="flex-1 truncate">{createdSecret}</span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(createdSecret)
                        setCopiedSecret(true)
                        setTimeout(() => setCopiedSecret(false), 2000)
                      }}
                      className="rounded bg-amber-500/20 px-3 py-1 text-xs font-bold text-amber-200 hover:bg-amber-500/30 transition flex items-center gap-1"
                    >
                      {copiedSecret ? <Check className="size-3 text-emerald-400" /> : <Copy className="size-3" />}
                      <span>{copiedSecret ? 'Copied' : 'Copy Key'}</span>
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCreatedSecret(null)}
                    className="mt-3 text-[11px] font-semibold text-slate-400 hover:text-white"
                  >
                    I have safely copied my key
                  </button>
                </div>
              )}

              {/* Generate New Key Form */}
              <div className="rounded-xl border border-white/10 bg-slate-900/80 p-5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                  Generate New API Key
                </span>
                <div className="mt-3 flex flex-wrap gap-3">
                  <input
                    type="text"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    placeholder="Key Label (e.g., Billing Microservice, Mobile App Backend)"
                    className="flex-1 min-w-[240px] rounded-lg border border-white/10 bg-slate-950 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-[#f26522] focus:outline-hidden"
                  />
                  <select
                    value={newKeyEnv}
                    onChange={(e) => setNewKeyEnv(e.target.value as any)}
                    className="rounded-lg border border-white/10 bg-slate-950 px-3.5 py-2 text-xs text-slate-300 focus:border-[#f26522] focus:outline-hidden"
                  >
                    <option value="test">Sandbox (avx_test_...)</option>
                    <option value="live">Production (avx_live_...)</option>
                  </select>
                  <button
                    type="button"
                    disabled={keyLoading || !newKeyName.trim()}
                    onClick={handleCreateKey}
                    className="rounded-lg bg-[#f26522] px-4 py-2 text-xs font-bold text-white hover:bg-[#d9531e] disabled:opacity-50 transition flex items-center gap-1.5"
                  >
                    <Plus className="size-3.5" /> Generate Key
                  </button>
                </div>
              </div>

              {/* Existing Keys Table */}
              <div className="overflow-x-auto rounded-xl border border-white/10 bg-slate-900/60">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 border-b border-white/10 text-[11px] uppercase font-mono">
                    <tr>
                      <th className="py-3 px-4">Key Label</th>
                      <th className="py-3 px-4">Prefix</th>
                      <th className="py-3 px-4">Env</th>
                      <th className="py-3 px-4">Last Active</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Revoke</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {keys.map((k) => (
                      <tr key={k.id} className="hover:bg-white/[0.02] transition">
                        <td className="py-3 px-4 font-bold text-white">{k.name}</td>
                        <td className="py-3 px-4 font-mono text-sky-400">{k.keyPrefix}••••••••</td>
                        <td className="py-3 px-4">
                          <span className={`rounded px-2 py-0.5 text-[10px] font-mono font-bold uppercase ${
                            k.environment === 'live' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-700 text-slate-300'
                          }`}>
                            {k.environment}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-400 text-[11px]">{k.lastUsedAt}</td>
                        <td className="py-3 px-4">
                          <span className={`text-[11px] font-semibold ${k.status === 'active' ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {k.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          {k.status === 'active' && (
                            <button
                              type="button"
                              onClick={() => handleRevokeKey(k.id)}
                              className="text-slate-400 hover:text-rose-400 transition"
                              title="Revoke Key"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: WEBHOOKS */}
          {activeTab === 'webhooks' && (
            <div className="rounded-2xl border border-white/10 bg-slate-800/60 p-6 sm:p-8 shadow-xl max-w-4xl space-y-6">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Webhook className="size-4 text-amber-400" /> Webhook Event Stream
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Listen to asynchronous platform events. Altavox Tech signs all webhooks with SHA-256 HMAC tokens in the <code className="text-amber-300">X-Altavox-Signature</code> header.
                </p>
              </div>

              {/* Event selector */}
              <div className="flex flex-wrap gap-2">
                {(['payment.captured', 'course.enrolled', 'ticket.created'] as const).map((evt) => (
                  <button
                    key={evt}
                    type="button"
                    onClick={() => updateWebhookPayload(evt)}
                    className={`rounded-lg px-3.5 py-1.5 text-xs font-mono font-bold transition ${
                      webhookEvent === evt
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-white/5 text-slate-300 hover:text-white'
                    }`}
                  >
                    {evt}
                  </button>
                ))}
              </div>

              {/* Payload viewer */}
              <div className="rounded-xl border border-white/10 bg-slate-950 p-5 font-mono text-xs text-slate-300">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3 text-[11px] text-slate-400">
                  <span>Sample Webhook Delivery Body (JSON)</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(webhookPayload)}
                    className="flex items-center gap-1 hover:text-white"
                  >
                    <Copy className="size-3" />
                    <span>Copy JSON</span>
                  </button>
                </div>
                <pre className="whitespace-pre-wrap leading-relaxed text-amber-200">
                  {webhookPayload}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 4: SDKs */}
          {activeTab === 'sdks' && (
            <div className="rounded-2xl border border-white/10 bg-slate-800/60 p-6 sm:p-8 shadow-xl max-w-4xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <FileCode2 className="size-4 text-sky-400" /> Code Integration Snippets
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Ready-to-run implementation examples for common programming languages.
                  </p>
                </div>

                <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg text-xs">
                  {(['curl', 'typescript', 'python'] as const).map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setCodeLang(lang)}
                      className={`px-3 py-1 rounded font-mono uppercase ${
                        codeLang === lang ? 'bg-[#f26522] text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-slate-950 p-5 font-mono text-xs text-slate-300">
                {codeLang === 'curl' && (
                  <pre className="text-sky-300 whitespace-pre-wrap leading-relaxed">
{`# Query Payment Rails Status
curl -X GET "https://altavox.space/api/payments/status" \\
  -H "Authorization: Bearer avx_live_your_key_here" \\
  -H "Content-Type: application/json"

# Create a PayPal Order Programmatically
curl -X POST "https://altavox.space/api/payments/paypal/create-order" \\
  -H "Authorization: Bearer avx_live_your_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "itemType": "course",
    "itemSlug": "full-stack-web-development"
  }'`}
                  </pre>
                )}

                {codeLang === 'typescript' && (
                  <pre className="text-emerald-300 whitespace-pre-wrap leading-relaxed">
{`import axios from 'axios';

const client = axios.create({
  baseURL: 'https://altavox.space/api',
  headers: {
    'Authorization': \`Bearer \${process.env.ALTAVOX_API_KEY}\`,
    'Content-Type': 'application/json'
  }
});

// Create Order
async function createAltavoxOrder(slug: string) {
  const { data } = await client.post('/payments/paypal/create-order', {
    itemType: 'course',
    itemSlug: slug
  });
  console.log('Internal Order ID:', data.order.internalOrderId);
  return data.order;
}`}
                  </pre>
                )}

                {codeLang === 'python' && (
                  <pre className="text-amber-300 whitespace-pre-wrap leading-relaxed">
{`import os
import requests

ALTAVOX_API_KEY = os.environ.get("ALTAVOX_API_KEY")
BASE_URL = "https://altavox.space/api"

headers = {
    "Authorization": f"Bearer {ALTAVOX_API_KEY}",
    "Content-Type": "application/json"
}

def verify_certificate(certificate_id: str):
    res = requests.get(f"{BASE_URL}/academy/verify/{certificate_id}", headers=headers)
    return res.status_code == 200

print("Altavox SDK Ready")`}
                  </pre>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <AltavoxFooter />
    </div>
  )
}
