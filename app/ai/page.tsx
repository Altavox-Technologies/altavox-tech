'use client'

import { useState } from 'react'
import {
  Brain,
  Sparkles,
  Cpu,
  FileText,
  Send,
  ShieldCheck,
  Zap,
  Terminal,
  Activity,
  Copy,
  Check,
  RefreshCw,
  Sliders,
  Layers
} from 'lucide-react'
import { AltavoxHeader } from '@/components/altavox-header'
import { AltavoxFooter } from '@/components/altavox-footer'

export default function AltavoxAIPage() {
  const [activeTab, setActiveTab] = useState<'assistant' | 'summarize' | 'registry'>('assistant')
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [aiResponse, setAiResponse] = useState<any>(null)
  const [copied, setCopied] = useState(false)

  // Document summarizer state
  const [docText, setDocText] = useState('')
  const [docLoading, setDocLoading] = useState(false)
  const [docSummary, setDocSummary] = useState<any>(null)

  const samplePrompts = [
    'How do we configure a multi-POP OSPF backbone on RouterOS v7 with dynamic PPPoE?',
    'What is the optimal PostgreSQL double-entry financial ledger schema for M-Pesa & PayPal reconciliation?',
    'Explain the security architecture for embedding external client platforms in isolated sandboxes.'
  ]

  const handleAsk = async (queryText?: string) => {
    const q = queryText || prompt
    if (!q.trim()) return

    setLoading(true)
    setAiResponse(null)

    try {
      const res = await fetch('/api/ai/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: q, context: 'systems-architecture' })
      })
      const data = await res.json()
      setAiResponse(data)
    } catch (err) {
      setAiResponse({ error: 'Failed to connect to Altavox AI Engine.' })
    } finally {
      setLoading(false)
    }
  }

  const handleSummarize = async () => {
    if (!docText.trim()) return

    setDocLoading(true)
    setDocSummary(null)

    try {
      const res = await fetch('/api/ai/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentText: docText, focus: 'architecture-and-risk' })
      })
      const data = await res.json()
      setDocSummary(data)
    } catch (err) {
      setDocSummary({ error: 'Failed to summarize document.' })
    } finally {
      setDocLoading(false)
    }
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-900 font-sans text-slate-100">
      <AltavoxHeader />

      <main className="flex-1 pb-24">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 py-16 sm:py-20">
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-purple-400">
                <Brain className="size-3.5" /> Altavox AI Division
              </div>
              <h1 className="mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Enterprise AI & Systems Intelligence
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
                Server-side AI models designed for high-concurrency systems analysis, automated document intelligence, telecommunications config generation, and business automation.
              </p>
            </div>

            {/* Division Navigation Tabs */}
            <div className="mt-10 flex flex-wrap gap-2 border-b border-white/10 pb-4">
              <button
                type="button"
                onClick={() => setActiveTab('assistant')}
                className={`rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                  activeTab === 'assistant'
                    ? 'bg-[#f26522] text-white shadow-lg'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                Systems Architecture Assistant
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('summarize')}
                className={`rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                  activeTab === 'summarize'
                    ? 'bg-[#f26522] text-white shadow-lg'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                Document & RFC Intelligence
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('registry')}
                className={`rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                  activeTab === 'registry'
                    ? 'bg-[#f26522] text-white shadow-lg'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                Prompt Registry & Governance
              </button>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
          {/* TAB 1: ARCHITECTURE ASSISTANT */}
          {activeTab === 'assistant' && (
            <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
              <div className="rounded-2xl border border-white/10 bg-slate-800/60 p-6 sm:p-8 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <div>
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <Sparkles className="size-4 text-[#f26522]" /> Altavox Systems Engine
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Enter any query regarding network engineering, PostgreSQL schemas, or Next.js distributed architecture.
                    </p>
                  </div>
                  <span className="rounded bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 text-[10px] font-mono font-bold text-emerald-400">
                    SERVER-SIDE ACTIVE
                  </span>
                </div>

                {/* Quick Prompts */}
                <div className="mb-4 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Suggested Inquiries:</span>
                  <div className="flex flex-col gap-2">
                    {samplePrompts.map((p, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setPrompt(p)
                          handleAsk(p)
                        }}
                        className="text-left text-xs bg-white/5 hover:bg-white/10 text-slate-300 rounded-lg p-2.5 transition border border-white/5 hover:border-white/15"
                      >
                        → {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Input box */}
                <div className="mt-4 flex gap-2">
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
                    placeholder="Ask technical question (e.g., RouterOS v7 BGP config, double-entry financial schema...)"
                    className="flex-1 rounded-xl border border-white/10 bg-slate-900/90 px-4 py-3 text-xs text-white placeholder-slate-500 focus:border-[#f26522] focus:outline-hidden"
                  />
                  <button
                    type="button"
                    disabled={loading || !prompt.trim()}
                    onClick={() => handleAsk()}
                    className="rounded-xl bg-[#f26522] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#d9531e] disabled:opacity-50 flex items-center gap-1.5"
                  >
                    {loading ? <RefreshCw className="size-3.5 animate-spin" /> : <Send className="size-3.5" />}
                    <span>Query</span>
                  </button>
                </div>

                {/* Output Screen */}
                {aiResponse && (
                  <div className="mt-6 rounded-xl border border-white/10 bg-slate-950 p-5 font-mono text-xs text-slate-200">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3 text-[11px] text-slate-400">
                      <span>Model: <strong className="text-sky-400">{aiResponse.model}</strong> ({aiResponse.version})</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(aiResponse.answer)}
                        className="flex items-center gap-1 text-slate-300 hover:text-white"
                      >
                        {copied ? <Check className="size-3 text-emerald-400" /> : <Copy className="size-3" />}
                        <span>{copied ? 'Copied' : 'Copy Response'}</span>
                      </button>
                    </div>
                    <pre className="whitespace-pre-wrap leading-relaxed overflow-x-auto text-slate-300 text-xs">
                      {aiResponse.answer}
                    </pre>
                  </div>
                )}
              </div>

              {/* Engine Specs Sidebar */}
              <div className="space-y-6">
                <div className="rounded-2xl border border-white/10 bg-slate-800/40 p-6">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    Model Architecture
                  </h3>
                  <div className="mt-4 space-y-3 text-xs text-slate-300">
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-slate-400">Primary Provider:</span>
                      <span className="font-mono text-white">Google Gen AI SDK</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-slate-400">Production Alias:</span>
                      <span className="font-mono text-white">gemini-2.5-flash</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-slate-400">Inference Runtime:</span>
                      <span className="font-mono text-emerald-400">Server-Side Proxy</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-slate-400">Max Context Window:</span>
                      <span className="font-mono text-white">1,000,000 Tokens</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Client Secrets Exposure:</span>
                      <span className="font-mono text-emerald-400 font-bold">Zero (Server Secret)</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-800/40 p-6">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    Security & Compliance
                  </h3>
                  <ul className="mt-4 space-y-2 text-xs text-slate-300">
                    <li className="flex items-start gap-2">
                      <ShieldCheck className="size-4 text-[#f26522] shrink-0 mt-0.5" />
                      <span>Zero customer document retention in 3rd party training sets.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ShieldCheck className="size-4 text-[#f26522] shrink-0 mt-0.5" />
                      <span>Audit logging for enterprise customer inquiries.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ShieldCheck className="size-4 text-[#f26522] shrink-0 mt-0.5" />
                      <span>Rate limiting applied per client organization tenant.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DOCUMENT SUMMARIZER */}
          {activeTab === 'summarize' && (
            <div className="rounded-2xl border border-white/10 bg-slate-800/60 p-6 sm:p-8 shadow-xl max-w-4xl">
              <div className="border-b border-white/10 pb-4 mb-6">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <FileText className="size-4 text-purple-400" /> Technical RFC & Architecture Analyzer
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Paste your technical specification, DDL migration, or network topology plan to produce executive highlights and risk mitigation matrices.
                </p>
              </div>

              <textarea
                rows={7}
                value={docText}
                onChange={(e) => setDocText(e.target.value)}
                placeholder="Paste architectural specification, RouterOS script, or database schema text..."
                className="w-full rounded-xl border border-white/10 bg-slate-900/90 p-4 text-xs font-mono text-white placeholder-slate-500 focus:border-[#f26522] focus:outline-hidden"
              />

              <div className="mt-4 flex justify-between items-center">
                <span className="text-[11px] text-slate-400">
                  {docText.length} characters • {docText ? docText.split(/\s+/).length : 0} words
                </span>

                <button
                  type="button"
                  disabled={docLoading || !docText.trim()}
                  onClick={handleSummarize}
                  className="rounded-xl bg-[#f26522] px-6 py-2.5 text-xs font-bold text-white transition hover:bg-[#d9531e] disabled:opacity-50 flex items-center gap-2"
                >
                  {docLoading ? <RefreshCw className="size-3.5 animate-spin" /> : <Sparkles className="size-3.5" />}
                  <span>Generate Assessment</span>
                </button>
              </div>

              {docSummary && (
                <div className="mt-8 rounded-xl border border-white/10 bg-slate-950 p-6">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold block mb-2">
                    Executive Analysis Output ({docSummary.model}):
                  </span>
                  <div className="prose prose-invert prose-xs max-w-none text-slate-200 leading-relaxed whitespace-pre-wrap">
                    {docSummary.summary}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PROMPT REGISTRY */}
          {activeTab === 'registry' && (
            <div className="rounded-2xl border border-white/10 bg-slate-800/60 p-6 sm:p-8 shadow-xl max-w-4xl space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sliders className="size-4 text-amber-400" /> Prompt Versioning & Model Governance
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Active production system prompts with strict architectural grounding and temperature parameters.
                </p>
              </div>

              <div className="space-y-4">
                <div className="rounded-xl border border-white/10 bg-slate-900/80 p-5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-white">Prompt ID: AVX-SYS-ENGINE-v2.4</span>
                    <span className="rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] px-2 py-0.5">
                      PRODUCTION (100% TRAFFIC)
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-400">
                    Enforces accurate RouterOS syntax, double-entry financial rules, and zero pill-clutter frontend guidelines.
                  </p>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-[11px] font-mono text-slate-300 border-t border-white/5 pt-3">
                    <span>Temp: 0.2</span>
                    <span>Top-P: 0.95</span>
                    <span>Safety: Strict Block</span>
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-slate-900/80 p-5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-white">Prompt ID: AVX-DOC-ANALYZER-v1.8</span>
                    <span className="rounded bg-sky-500/20 text-sky-300 font-mono text-[10px] px-2 py-0.5">
                      STAGING
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-400">
                    Assesses technical RFCs and DDL scripts for operational downtime risks and integration feasibility scores.
                  </p>
                  <div className="mt-3 grid grid-cols-3 gap-2 text-[11px] font-mono text-slate-300 border-t border-white/5 pt-3">
                    <span>Temp: 0.3</span>
                    <span>Top-P: 0.90</span>
                    <span>Safety: Strict Block</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <AltavoxFooter />
    </div>
  )
}
