import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, ShieldCheck, Terminal, Network, Server, Layers, ArrowUpRight } from 'lucide-react'

// Official WhatsApp Vector Icon
function WhatsAppIcon({ className = 'size-3.5' }: { className?: string }) {
  return (
    <svg
      className={`${className} fill-current shrink-0 text-emerald-400`}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export function AltavoxFooter() {
  return (
    <footer className="bg-[#051c36] text-slate-300 pt-8 sm:pt-14 pb-6 sm:pb-10 border-t-4 border-[#f26522]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Trust Strip - 2 columns on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-6 lg:grid-cols-4 pb-6 sm:pb-10 border-b border-white/10 text-xs">
          <div className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded bg-white/[0.02] sm:bg-transparent">
            <span className="flex size-7 sm:size-10 items-center justify-center rounded bg-white/5 text-[#f26522] border border-white/10 shrink-0">
              <Network className="size-3.5 sm:size-5" />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] sm:text-xs font-bold text-white truncate">Carrier ISP</p>
              <p className="text-[9px] sm:text-[11px] text-slate-400 truncate">MikroTik & M-Pesa</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded bg-white/[0.02] sm:bg-transparent">
            <span className="flex size-7 sm:size-10 items-center justify-center rounded bg-white/5 text-[#f26522] border border-white/10 shrink-0">
              <Layers className="size-3.5 sm:size-5" />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] sm:text-xs font-bold text-white truncate">School SIMS</p>
              <p className="text-[9px] sm:text-[11px] text-slate-400 truncate">Registry & academic</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded bg-white/[0.02] sm:bg-transparent">
            <span className="flex size-7 sm:size-10 items-center justify-center rounded bg-white/5 text-emerald-400 border border-white/10 shrink-0">
              <Server className="size-3.5 sm:size-5" />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] sm:text-xs font-bold text-white truncate">Infrastructure</p>
              <p className="text-[9px] sm:text-[11px] text-slate-400 truncate">99.98% uptime SLA</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded bg-white/[0.02] sm:bg-transparent">
            <span className="flex size-7 sm:size-10 items-center justify-center rounded bg-white/5 text-cyan-300 border border-white/10 shrink-0">
              <ShieldCheck className="size-3.5 sm:size-5" />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] sm:text-xs font-bold text-white truncate">Governance</p>
              <p className="text-[9px] sm:text-[11px] text-slate-400 truncate">Strict audit & RBAC</p>
            </div>
          </div>
        </div>

        {/* Brand & Contacts Row - 2-column split on mobile, full column on desktop */}
        <div className="grid grid-cols-2 gap-4 py-6 border-b border-white/10 text-xs xl:hidden">
          {/* Left Side: Brand */}
          <div className="space-y-1.5">
            <Link href="/" className="inline-flex items-center gap-2 group" aria-label="Altavox Tech Home">
              <Image
                src="/capricorn_emblem_clean_black.svg"
                alt="Altavox Tech Capricorn emblem"
                width={32}
                height={36}
                className="h-8 w-7 object-contain brightness-0 invert"
                referrerPolicy="no-referrer"
              />
              <span className="text-sm font-extrabold tracking-wider text-white whitespace-nowrap">
                ALTAVOX <span className="text-[#f26522]">TECH</span>
              </span>
            </Link>
            <p className="text-[10px] text-slate-400 leading-tight">
              Sovereign software, carrier networks & technical education.
            </p>
            <div className="text-[10px] text-slate-400 flex items-center gap-1 pt-1">
              <MapPin className="size-3 text-[#f26522] shrink-0" />
              <span>Dar es Salaam & Arusha HQ</span>
            </div>
          </div>

          {/* Right Side: Direct Contacts */}
          <div className="space-y-1.5 text-[11px]">
            <div className="flex items-center gap-1.5">
              <Phone className="size-3 text-[#f26522] shrink-0" />
              <a href="tel:+255750227073" className="font-bold text-white hover:text-[#f26522] truncate">
                +255 750 227 073
              </a>
            </div>

            <div className="flex items-center gap-1.5">
              <WhatsAppIcon className="size-3.5" />
              <a
                href="https://wa.me/255750227073?text=Habari%20Altavox%20Engineering%2C%20nahitaji%20maelezo%20kuhusu%20mifumo%20yenu."
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 font-semibold hover:underline truncate"
              >
                WhatsApp Desk
              </a>
            </div>

            <div className="flex items-center gap-1.5">
              <Mail className="size-3 text-[#f26522] shrink-0" />
              <a href="mailto:engineering@altavox.space" className="text-slate-300 hover:text-white truncate">
                engineering@altavox.space
              </a>
            </div>
          </div>
        </div>

        {/* Main Footer Links - Strictly 2 columns on mobile, 4-5 on desktop */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-6 py-6 sm:py-10 xl:grid-cols-5 border-b border-white/10 text-xs">
          
          {/* Col 1 on Desktop: Brand & Contacts */}
          <div className="hidden xl:block col-span-1 space-y-3">
            <Link href="/" className="inline-flex items-center gap-2.5 group" aria-label="Altavox Tech Home">
              <Image
                src="/capricorn_emblem_clean_black.svg"
                alt="Altavox Tech Capricorn emblem"
                width={36}
                height={42}
                className="h-9 w-8 object-contain brightness-0 invert"
                referrerPolicy="no-referrer"
              />
              <span className="text-base font-extrabold tracking-wider text-white">
                ALTAVOX <span className="text-[#f26522]">TECH</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sovereign software platforms, carrier ISP systems, and verified technical learning programs.
            </p>
            <div className="space-y-2 text-xs text-slate-300 pt-1">
              <div className="flex items-center gap-2">
                <Phone className="size-3.5 text-[#f26522] shrink-0" />
                <a href="tel:+255750227073" className="font-bold hover:text-[#f26522]">
                  +255 750 227 073
                </a>
              </div>
              <div className="flex items-center gap-2">
                <WhatsAppIcon className="size-3.5" />
                <a
                  href="https://wa.me/255750227073?text=Habari%20Altavox%20Engineering"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline font-semibold"
                >
                  WhatsApp: +255 750 227 073
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="size-3.5 text-[#f26522] shrink-0" />
                <a href="mailto:engineering@altavox.space" className="hover:text-white">
                  engineering@altavox.space
                </a>
              </div>
              <div className="flex items-start gap-2 text-slate-400 text-[11px] pt-1">
                <MapPin className="size-3 text-[#f26522] shrink-0 mt-0.5" />
                <span>Nduruma Road, Unguuni, Arusha, TZ</span>
              </div>
            </div>
          </div>

          {/* Col 2: The Seven Systems - Left on Mobile */}
          <div className="col-span-1">
            <h4 className="font-bold uppercase tracking-wider text-amber-400 text-[11px] sm:text-xs flex items-center gap-1 border-b border-white/10 pb-1.5 mb-2">
              <span className="font-serif">♑</span>
              Seven Systems
            </h4>
            <ul className="space-y-1.5 text-[11px] sm:text-xs">
              <li>
                <Link href="/codex" className="text-slate-300 hover:text-amber-400 transition flex items-center justify-between">
                  <span className="truncate">Codex Knowledge</span>
                  <ArrowUpRight className="size-2.5 text-slate-500 shrink-0" />
                </Link>
              </li>
              <li>
                <Link href="/enigma" className="text-slate-300 hover:text-amber-400 transition flex items-center justify-between">
                  <span className="truncate">Enigma Diagnostic</span>
                  <ArrowUpRight className="size-2.5 text-slate-500 shrink-0" />
                </Link>
              </li>
              <li>
                <Link href="/research-lab" className="text-slate-300 hover:text-amber-400 transition flex items-center justify-between">
                  <span className="truncate">Research Lab & RFCs</span>
                  <ArrowUpRight className="size-2.5 text-slate-500 shrink-0" />
                </Link>
              </li>
              <li>
                <Link href="/archive" className="text-slate-300 hover:text-amber-400 transition flex items-center justify-between">
                  <span className="truncate">Digital Archive</span>
                  <ArrowUpRight className="size-2.5 text-slate-500 shrink-0" />
                </Link>
              </li>
              <li>
                <Link href="/atlas" className="text-slate-300 hover:text-amber-400 transition flex items-center justify-between">
                  <span className="truncate">Atlas System Map</span>
                  <ArrowUpRight className="size-2.5 text-slate-500 shrink-0" />
                </Link>
              </li>
              <li>
                <Link href="/security-challenge" className="text-slate-300 hover:text-amber-400 transition flex items-center justify-between">
                  <span className="truncate">Security Challenge</span>
                  <ArrowUpRight className="size-2.5 text-slate-500 shrink-0" />
                </Link>
              </li>
              <li>
                <Link href="/origin" className="text-amber-400 font-semibold hover:underline flex items-center justify-between">
                  <span className="truncate">Altavox Origin</span>
                  <ArrowUpRight className="size-2.5 text-amber-500 shrink-0" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Ecosystem - Right on Mobile */}
          <div className="col-span-1">
            <h4 className="font-bold uppercase tracking-wider text-white text-[11px] sm:text-xs border-b border-white/10 pb-1.5 mb-2">
              Ecosystem
            </h4>
            <ul className="space-y-1.5 text-[11px] sm:text-xs">
              <li>
                <Link href="/os" className="text-amber-400 font-bold hover:underline flex items-center justify-between">
                  <span className="truncate">OS 3.0 Enterprise</span>
                  <ArrowUpRight className="size-2.5 text-amber-500 shrink-0" />
                </Link>
              </li>
              <li>
                <Link href="/cloud" className="text-sky-400 font-semibold hover:underline flex items-center justify-between">
                  <span className="truncate">Cloud Edge</span>
                  <ArrowUpRight className="size-2.5 text-slate-500 shrink-0" />
                </Link>
              </li>
              <li>
                <Link href="/ai" className="text-purple-400 font-semibold hover:underline flex items-center justify-between">
                  <span className="truncate">AI Intelligence</span>
                  <ArrowUpRight className="size-2.5 text-slate-500 shrink-0" />
                </Link>
              </li>
              <li>
                <Link href="/developers" className="text-emerald-400 font-semibold hover:underline flex items-center justify-between">
                  <span className="truncate">Developers & APIs</span>
                  <ArrowUpRight className="size-2.5 text-slate-500 shrink-0" />
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="text-[#f26522] font-semibold hover:underline block truncate">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/portal" className="text-slate-300 hover:text-white transition block truncate">
                  Client Portal
                </Link>
              </li>
              <li>
                <Link href="/wifi" className="text-slate-300 hover:text-white transition block truncate">
                  Altavox WiFi
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Engineering Services - Left on Mobile Row 2 */}
          <div className="col-span-1">
            <h4 className="font-bold uppercase tracking-wider text-white text-[11px] sm:text-xs border-b border-white/10 pb-1.5 mb-2">
              Services
            </h4>
            <ul className="space-y-1.5 text-[11px] sm:text-xs">
              <li>
                <Link href="/services#custom-software-development" className="hover:text-[#f26522] transition block truncate">
                  Custom Software
                </Link>
              </li>
              <li>
                <Link href="/services#enterprise-web-applications" className="hover:text-[#f26522] transition block truncate">
                  Enterprise Web
                </Link>
              </li>
              <li>
                <Link href="/services#mobile-application-development" className="hover:text-[#f26522] transition block truncate">
                  Mobile Apps
                </Link>
              </li>
              <li>
                <Link href="/services#saas-product-development" className="hover:text-[#f26522] transition block truncate">
                  SaaS Platforms
                </Link>
              </li>
              <li>
                <Link href="/services#isp-network-management" className="hover:text-[#f26522] transition block truncate">
                  ISP Systems
                </Link>
              </li>
              <li>
                <Link href="/services#cloud-infrastructure" className="hover:text-[#f26522] transition block truncate">
                  Cloud DevOps
                </Link>
              </li>
              <li>
                <Link href="/business" className="hover:text-[#f26522] transition font-bold text-orange-300 block truncate">
                  Enterprise SLAs
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Academy & Governance - Right on Mobile Row 2 */}
          <div className="col-span-1">
            <h4 className="font-bold uppercase tracking-wider text-white text-[11px] sm:text-xs border-b border-white/10 pb-1.5 mb-2">
              Academy & Trust
            </h4>
            <ul className="space-y-1.5 text-[11px] sm:text-xs">
              <li>
                <Link href="/academy" className="text-orange-400 font-bold hover:underline block truncate">
                  Academy (20 Tracks) →
                </Link>
              </li>
              <li>
                <Link href="/academy/dashboard" className="text-slate-300 hover:text-[#f26522] transition block truncate">
                  Learning Portal
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[#f26522] transition block truncate">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/trust" className="text-teal-300 font-medium hover:underline block truncate">
                  Trust & Governance
                </Link>
              </li>
              <li>
                <Link href="/status" className="text-emerald-300 font-medium hover:underline flex items-center gap-1 truncate">
                  <span className="size-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                  <span className="truncate">System Status</span>
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#f26522] transition block truncate">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#f26522] transition block truncate">
                  Terms & SLAs
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Strip - Compact */}
        <div className="pt-4 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-slate-400 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Altavox Tech. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Link href="/privacy" className="hover:text-slate-200 transition">Privacy</Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-slate-200 transition">Terms</Link>
            <span>·</span>
            <Link href="/refund" className="hover:text-slate-200 transition">Refunds</Link>
            <span>·</span>
            <Link href="/admin" className="hover:text-slate-200 transition font-mono">Admin</Link>
            <span>·</span>
            <Link href="/contact" className="hover:text-slate-200 transition">Desk</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
