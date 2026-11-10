'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, BookOpen, ChevronRight, Clock3, Filter, MessageSquare, Search, ShieldCheck } from 'lucide-react'
import { PageFrame } from '@/components/site-shell'

const articles = [
  {
    slug: 'designing-dependable-operational-software',
    category: 'Systems Architecture',
    title: 'Designing dependable operational software for teams that cannot stop',
    summary: 'A practical field guide for turning complex, paper-heavy workflows into clear, observable systems that operators can trust during peak loads.',
    readTime: '8 min read',
    date: 'Oct 2026',
    topics: ['Observability', 'Failover', 'Data Integrity']
  },
  {
    slug: 'isp-billing-mikrotik-automation',
    category: 'ISP Operations',
    title: 'Automating MikroTik RouterOS billing without breaking active connections',
    summary: 'How to structure queue provisioning, RADIUS accounting, and M-Pesa webhook reconciliation so subscribers receive instant renewal without dropping live VoIP or video streams.',
    readTime: '11 min read',
    date: 'Oct 2026',
    topics: ['MikroTik API', 'M-Pesa Webhooks', 'RouterOS']
  },
  {
    slug: 'security-boundaries-before-features',
    category: 'Security & Auth',
    title: 'Security boundaries before features: Role-based access in school management systems',
    summary: 'Why separating student report card editing rights from fee payment verification is essential, and how to enforce it at the database schema layer with Drizzle & PostgreSQL.',
    readTime: '6 min read',
    date: 'Sep 2026',
    topics: ['RBAC', 'PostgreSQL', 'SIMS Security']
  },
  {
    slug: 'truthful-telemetry-monitoring',
    category: 'Network Operations',
    title: 'From telemetry noise to actionable decisions in local networks',
    summary: 'What a truthful operations dashboard must display before claiming an ISP cluster is healthy, and how to avoid vanity ping charts.',
    readTime: '7 min read',
    date: 'Sep 2026',
    topics: ['SNMP', 'Network Telemetry', 'Latency Tracking']
  }
]

export default function Insights() {
  const [selectedTopic, setSelectedTopic] = useState('All')

  const allTopics = ['All', 'Systems Architecture', 'ISP Operations', 'Security & Auth', 'Network Operations']

  const filteredArticles = selectedTopic === 'All'
    ? articles
    : articles.filter((a) => a.category === selectedTopic)

  return (
    <PageFrame
      eyebrow="Community & Field Notes"
      title="Practical Insights for Real Operations."
      intro="Technical notes, architecture patterns, and operational lessons from our production software and ISP deployments across East Africa."
    >
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            {/* Filter Tabs */}
            <div className="mb-8 flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2 flex items-center gap-1">
                <Filter className="size-3.5" /> Topic:
              </span>
              {allTopics.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => setSelectedTopic(topic)}
                  className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                    selectedTopic === topic
                      ? 'bg-[#07294d] text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>

            {/* Articles List */}
            <div className="space-y-6">
              {filteredArticles.map((article) => (
                <article
                  key={article.slug}
                  className="rounded-2xl border border-slate-200 bg-white p-7 shadow-xs transition hover:border-[#f26522] hover:shadow-lg"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#f26522]">
                      {article.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-400 font-medium">
                      <Clock3 className="size-3.5" /> {article.readTime} · {article.date}
                    </span>
                  </div>

                  <h2 className="mt-3 text-xl font-bold text-[#07294d] sm:text-2xl leading-snug">
                    {article.title}
                  </h2>

                  <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600">
                    {article.summary}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-4">
                    <div className="flex flex-wrap gap-1.5">
                      {article.topics.map((t) => (
                        <span key={t} className="rounded-md bg-slate-100 border border-slate-200 px-2.5 py-1 text-[11px] text-slate-600 font-medium">
                          {t}
                        </span>
                      ))}
                    </div>

                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#f26522] hover:underline transition"
                    >
                      Discuss this topic <ChevronRight className="size-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="flex items-center gap-2 text-sm font-bold text-[#07294d]">
                <BookOpen className="size-4 text-[#f26522]" /> Field Notes Mission
              </div>
              <p className="mt-3 text-xs leading-relaxed text-slate-600">
                We write for network engineers, school administrators, and product leaders building systems in developing digital infrastructures. No superficial marketing fluff.
              </p>
            </div>

            <div className="rounded-2xl border border-orange-200 bg-orange-50/70 p-6 shadow-xs">
              <ShieldCheck className="size-5 text-[#f26522]" />
              <h3 className="mt-3 text-sm font-bold text-[#07294d]">Trust is an engineering feature</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Every technical claim should have a verifiable architecture, a timestamp, and an accountable maintainer.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
              <MessageSquare className="size-5 text-[#07294d]" />
              <h3 className="mt-3 text-sm font-bold text-[#07294d]">Have a technical question?</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Send us your operational challenge or architecture questions.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#f26522] hover:underline transition"
              >
                Send a question <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </PageFrame>
  )
}
