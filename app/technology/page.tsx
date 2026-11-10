import Link from 'next/link'
import { ArrowRight, CheckCircle2, Code2, Database, Globe, Network, Server, Shield, Terminal } from 'lucide-react'
import { PageFrame } from '@/components/site-shell'

const stackLayers = [
  {
    layer: 'Frontend & Interactive Web',
    tech: 'TypeScript, Next.js 15, React 19, Tailwind CSS, Base UI, Lucide Icons',
    focus: 'Fast, accessible, mobile-first interfaces with server-side rendering, zero client layout shifts, and predictable state management.',
    icon: Globe,
    tools: ['Next.js App Router', 'Tailwind CSS v4', 'TypeScript Strict Mode', 'Base UI primitives']
  },
  {
    layer: 'Backend Services & APIs',
    tech: 'Node.js, Go, Express, Fastify, REST, WebSockets, OpenAPI',
    focus: 'Typed endpoint contracts, structured JSON schemas, asynchronous workers, robust error handling, and minimal cold-start latencies.',
    icon: Server,
    tools: ['Node.js 22 LTS', 'Clean architecture', 'Micro-services & Monoliths', 'JSON Webhook handlers']
  },
  {
    layer: 'Data Architecture & Storage',
    tech: 'PostgreSQL, Drizzle ORM, Redis, Connection Pooling, SQLite',
    focus: 'ACID-compliant relational integrity, normalized schemas, automated migrations, high-performance indexing, and encrypted storage.',
    icon: Database,
    tools: ['PostgreSQL 16+', 'Drizzle ORM', 'Redis in-memory caching', 'Automated nightly backups']
  },
  {
    layer: 'ISP & Telecom Engineering',
    tech: 'MikroTik RouterOS API, RADIUS AAA, SNMP v2/v3, WireGuard, Netflow',
    focus: 'Bandwidth throttling, automated user queue management, billing isolation, uptime surveillance, and packet telemetry.',
    icon: Network,
    tools: ['RouterOS REST & Binary API', 'FreeRADIUS accounting', 'Prometheus & SNMP probes', 'M-Pesa payment gateways']
  },
  {
    layer: 'DevOps, CI/CD & Governance',
    tech: 'Docker, Linux Ubuntu/Debian, GitHub Actions, TLS/SSL, Reverse Proxies',
    focus: 'Predictable containerized releases, automated build gates, environment-variable vaults, audit trails, and zero-downtime rollback.',
    icon: Shield,
    tools: ['Docker multi-stage builds', 'Caddy / Nginx reverse proxy', 'Automated Let’s Encrypt TLS', 'Role-based access control']
  }
]

export default function Technology() {
  return (
    <PageFrame
      eyebrow="Technology Architecture"
      title="A Practical, Battle-Tested Stack."
      intro="We prioritize reliability, maintainability, and operational transparency over hype. Our architectural choices are shaped by real production constraints."
    >
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid gap-6">
          {stackLayers.map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={item.layer}
                className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-8 shadow-xs transition hover:border-[#f26522] hover:shadow-lg"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex items-start gap-4">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-[#f26522]">
                      <Icon className="size-6" />
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#f26522]">Layer 0{idx + 1}</span>
                        <span className="text-slate-300">/</span>
                        <h3 className="text-xl font-bold text-[#07294d]">{item.layer}</h3>
                      </div>
                      <p className="mt-1 font-mono text-xs font-semibold text-[#f26522]">{item.tech}</p>
                      <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600 max-w-3xl">{item.focus}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 lg:flex-col lg:items-end">
                    {item.tools.map((t) => (
                      <span key={t} className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-600 font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Technical Governance Standards */}
        <div className="mt-16 rounded-2xl border border-slate-200 bg-white p-7 sm:p-10 shadow-xs">
          <div className="max-w-2xl">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#f26522]">
              Engineering Standards
            </span>
            <h2 className="mt-2 text-2xl font-extrabold text-[#07294d] sm:text-3xl">
              Strict rules we follow on every project.
            </h2>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Strict Type-Safety',
                desc: 'Every endpoint, database query, and UI property is strictly typed with TypeScript. No hidden runtime exceptions.'
              },
              {
                title: 'Zero Secrets in Code',
                desc: 'Database credentials, API tokens, and private keys reside exclusively in protected server-side environment variables.'
              },
              {
                title: 'Observable Logging',
                desc: 'Requests, errors, and background transactions emit structured logs with correlated request IDs for instant debugging.'
              },
              {
                title: 'Data Integrity First',
                desc: 'Relational foreign keys, ACID transaction blocks, and immutable audit logs ensure financial and student data cannot be corrupted.'
              },
              {
                title: 'Offline & Graceful Fallbacks',
                desc: 'When third-party APIs or network equipment are temporarily offline, systems fail safely with clear user feedback.'
              },
              {
                title: 'Operator Ownership',
                desc: 'Clean documentation, schema migration scripts, and architecture maps allow our clients to own and maintain their code.'
              }
            ].map((std) => (
              <div key={std.title} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-[#f26522]" />
                  <h4 className="font-bold text-[#07294d] text-sm">{std.title}</h4>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">{std.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl bg-[#07294d] p-8 text-white sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-white/10">
          <div>
            <h2 className="text-xl font-bold">Have technical constraints or an existing stack?</h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-300">
              We integrate with legacy databases, custom hardware APIs, and existing hosting environments.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#f26522] px-6 py-3 text-xs font-bold text-white transition hover:bg-[#d95316] shadow-sm"
          >
            Review your architecture <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </PageFrame>
  )
}
