import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, ShieldCheck, Terminal, Network, Server, Layers, Wifi, ArrowUpRight } from 'lucide-react'

export function AltavoxFooter() {
  return (
    <footer className="bg-[#051c36] text-slate-300 pt-16 pb-12 border-t-4 border-[#f26522]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top Trust Strip */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 pb-12 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-xl bg-white/5 text-[#f26522] border border-white/10">
              <Network className="size-6" />
            </span>
            <div>
              <p className="text-sm font-bold text-white">Carrier ISP Automation</p>
              <p className="text-xs text-slate-400">MikroTik RouterOS & M-Pesa billing</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-xl bg-white/5 text-[#f26522] border border-white/10">
              <Layers className="size-6" />
            </span>
            <div>
              <p className="text-sm font-bold text-white">Unified School SIMS</p>
              <p className="text-xs text-slate-400">Student registry & academic records</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-xl bg-white/5 text-[#f26522] border border-white/10">
              <Server className="size-6 text-emerald-400" />
            </span>
            <div>
              <p className="text-sm font-bold text-white">Reliable Infrastructure</p>
              <p className="text-xs text-slate-400">Observable codebases & automated backups</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-xl bg-white/5 text-[#f26522] border border-white/10">
              <ShieldCheck className="size-6 text-cyan-300" />
            </span>
            <div>
              <p className="text-sm font-bold text-white">System Governance</p>
              <p className="text-xs text-slate-400">Strict database constraints & RBAC security</p>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4 border-b border-white/10 text-xs">
          
          {/* Col 1: Brand & Contacts */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3 group" aria-label="Altavox Tech Home">
              <Image
                src="/capricorn_emblem_clean_black.svg"
                alt="Altavox Tech Capricorn emblem"
                width={52}
                height={60}
                className="h-12 w-11 object-contain brightness-0 invert transition group-hover:opacity-90"
                referrerPolicy="no-referrer"
              />
              <span className="text-base sm:text-lg font-extrabold tracking-[0.12em] text-white whitespace-nowrap">
                ALTAVOX <span className="text-[#f26522]">TECH</span>
              </span>
            </Link>
            <p className="mt-3 text-slate-400 leading-relaxed text-xs">
              Altavox Tech builds production software platforms, ISP billing systems, cloud infrastructure, and technical learning programs for organizations that demand reliability.
            </p>

            <div className="mt-5 space-y-2.5 text-slate-300">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Phone className="size-3.5 text-[#f26522]" />
                  <a href="tel:+255750227073" className="font-bold hover:text-[#f26522] transition">
                    Direct Desk 1: +255 750 227 073
                  </a>
                </div>
                <div className="flex items-center gap-2 pl-5.5 text-slate-400">
                  <span>Desk 2:</span>
                  <a href="tel:+255708227073" className="hover:text-white transition">
                    +255 708 227 073
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex size-3.5 items-center justify-center rounded-full bg-emerald-500 text-white text-[9px] font-bold">W</span>
                <a
                  href="https://wa.me/255750227073?text=Habari%20Altavox%20Engineering%2C%20nahitaji%20maelezo%20kuhusu%20mifumo%20yenu."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline font-semibold"
                >
                  WhatsApp: +255 750 227 073
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="size-3.5 text-[#f26522]" />
                <a href="mailto:engineering@altavox.space" className="hover:text-[#f26522] transition">
                  engineering@altavox.space
                </a>
              </div>
              <div className="flex items-start gap-2 pt-1 text-slate-400">
                <MapPin className="size-3.5 text-[#f26522] shrink-0 mt-0.5" />
                <span>
                  <span className="block text-slate-300">Dar es Salaam & Arusha Operations</span>
                  <span className="block">Nduruma Road, Unguuni, Tanzania</span>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Nduruma+Road%2C+Unguuni%2C+Nduruma%2C+Arusha%2C+Tanzania"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-[#f26522] hover:underline"
                  >
                    View on Google Maps
                  </a>
                </span>
              </div>
            </div>
          </div>

          {/* Col 2: Featured Platforms */}
          <div>
            <h4 className="font-bold uppercase tracking-wider text-white text-xs">Featured Platforms</h4>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/projects/jaslyn-net" className="hover:text-[#f26522] transition flex items-center justify-between">
                  <span>Jaslyn Net — ISP Operations</span>
                  <ArrowUpRight className="size-3 text-slate-500" />
                </Link>
              </li>
              <li>
                <Link href="/projects/sammena" className="hover:text-[#f26522] transition flex items-center justify-between">
                  <span>Sammena School — Educational SIMS</span>
                  <ArrowUpRight className="size-3 text-slate-500" />
                </Link>
              </li>
              <li>
                <Link href="/wifi" className="text-emerald-400 font-bold hover:underline flex items-center gap-1.5">
                  <Wifi className="size-3" />
                  <span>Altavox WiFi — Cloud Hotspot Platform</span>
                </Link>
              </li>
              <li>
                <Link href="/store" className="text-[#f26522] font-semibold hover:underline">
                  Altavox Bookstore — Digital & Print
                </Link>
              </li>
              <li>
                <Link href="/computer" className="text-[#f26522] font-semibold hover:underline flex items-center gap-1">
                  <Terminal className="size-3" />
                  <span>Computer Service Console</span>
                </Link>
              </li>
              <li>
                <Link href="/launchpad" className="hover:text-[#f26522] transition">
                  Engineering Tools & Launchpad
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Professional Services */}
          <div>
            <h4 className="font-bold uppercase tracking-wider text-white text-xs">Engineering Services</h4>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/services#custom-software-development" className="hover:text-[#f26522] transition">
                  Custom Software Development
                </Link>
              </li>
              <li>
                <Link href="/services#enterprise-web-applications" className="hover:text-[#f26522] transition">
                  Enterprise Web Applications
                </Link>
              </li>
              <li>
                <Link href="/services#mobile-application-development" className="hover:text-[#f26522] transition">
                  Mobile Application Development
                </Link>
              </li>
              <li>
                <Link href="/services#saas-product-development" className="hover:text-[#f26522] transition">
                  SaaS Product Development
                </Link>
              </li>
              <li>
                <Link href="/services#isp-network-management" className="hover:text-[#f26522] transition">
                  ISP & Network Management Systems
                </Link>
              </li>
              <li>
                <Link href="/services#cloud-infrastructure" className="hover:text-[#f26522] transition">
                  Cloud Infrastructure & DevOps
                </Link>
              </li>
              <li>
                <Link href="/services#database-architecture" className="hover:text-[#f26522] transition">
                  Database Architecture & APIs
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Altavox Academy & Governance */}
          <div>
            <h4 className="font-bold uppercase tracking-wider text-white text-xs">Academy & Company</h4>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link href="/courses" className="text-orange-400 font-semibold hover:underline">
                  Altavox Academy (10 Tracks) →
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#f26522] transition">
                  About Altavox & Principles
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[#f26522] transition">
                  Projects & Systems Architecture
                </Link>
              </li>
              <li>
                <Link href="/deployments" className="hover:text-[#f26522] transition">
                  Deployments & Operations
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#f26522] transition">
                  Privacy Policy & Data Security
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#f26522] transition">
                  Terms of Service & SLAs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#f26522] transition">
                  Contact & Inquiries
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} Altavox Tech. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-slate-200 transition">Privacy</Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-slate-200 transition">Terms of Service</Link>
            <span>·</span>
            <Link href="/contact" className="hover:text-slate-200 transition">Engineering Desk</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
