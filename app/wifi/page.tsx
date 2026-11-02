'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/head'
import NextLink from 'next/link'
import Image from 'next/image'
import {
  Wifi,
  WifiOff,
  Router,
  Ticket,
  DollarSign,
  TrendingUp,
  Users,
  Smartphone,
  Server,
  Plus,
  Copy,
  Check,
  Download,
  Printer,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  ExternalLink,
  Shield,
  Zap,
  RefreshCw,
  QrCode,
  Settings,
  Sliders,
  ChevronRight,
  Send,
  Eye,
  Lock,
  Radio,
  FileText
} from 'lucide-react'
import { AltavoxHeader } from '@/components/altavox-header'
import { AltavoxFooter } from '@/components/altavox-footer'

// Interfaces
interface WifiPackage {
  id: string
  name: string
  durationHours: number
  priceTzs: number
  downloadSpeedMbps: number
  uploadSpeedMbps: number
  deviceLimit: number
  description: string
  isPopular?: boolean
}

interface HotspotRouter {
  id: string
  name: string
  location: string
  model: string
  ip: string
  status: 'online' | 'offline'
  activeUsers: number
  totalRevenueToday: number
  cpuUsage: number
  uptime: string
}

interface Voucher {
  code: string
  packageId: string
  packageName: string
  priceTzs: number
  durationHours: number
  status: 'unused' | 'active' | 'expired'
  createdAt: string
  usedByMac?: string
  expiresAt?: string
}

interface PaymentTransaction {
  id: string
  receiptNumber: string
  customerPhone: string
  method: 'M-PESA' | 'TIGO PESA' | 'AIRTEL MONEY' | 'HALOPESA' | 'CASH VOUCHER'
  amountTzs: number
  packageName: string
  routerName: string
  timestamp: string
  status: 'COMPLETED' | 'PENDING' | 'FAILED'
}

const INITIAL_PACKAGES: WifiPackage[] = [
  {
    id: 'pkg-1hr',
    name: 'Dakika 60 (Saa 1)',
    durationHours: 1,
    priceTzs: 500,
    downloadSpeedMbps: 5,
    uploadSpeedMbps: 2,
    deviceLimit: 1,
    description: 'Inafaa kwa kuangalia video fupi, WhatsApp na kuperuzi mitandao.'
  },
  {
    id: 'pkg-3hr',
    name: 'Masaa 3 Kasi Zaidi',
    durationHours: 3,
    priceTzs: 1000,
    downloadSpeedMbps: 8,
    uploadSpeedMbps: 4,
    deviceLimit: 1,
    description: 'Bando maarufu zaidi kwa wanafunzi na watumiaji wa mikahawa.',
    isPopular: true
  },
  {
    id: 'pkg-24hr',
    name: 'Siku 1 Nzima (24 Hrs)',
    durationHours: 24,
    priceTzs: 2000,
    downloadSpeedMbps: 10,
    uploadSpeedMbps: 5,
    deviceLimit: 2,
    description: 'Intaneti ya kutwa nzima bila kikomo cha MB, vifaa hadi viwili.',
    isPopular: true
  },
  {
    id: 'pkg-7days',
    name: 'Wiki 1 (Siku 7)',
    durationHours: 168,
    priceTzs: 10000,
    downloadSpeedMbps: 15,
    uploadSpeedMbps: 8,
    deviceLimit: 2,
    description: 'Inafaa kwa wanaokaa hosteli au wafanyabiashara madukani.'
  },
  {
    id: 'pkg-30days',
    name: 'Mwezi 1 (Siku 30 Unlimited)',
    durationHours: 720,
    priceTzs: 35000,
    downloadSpeedMbps: 20,
    uploadSpeedMbps: 10,
    deviceLimit: 3,
    description: 'Kasi ya juu ya kudumu, inafaa ofisi ndogo au matumizi ya nyumbani.'
  }
]

const INITIAL_ROUTERS: HotspotRouter[] = [
  {
    id: 'rtr-1',
    name: 'MikroTik CCR2004 — Kariakoo Mall Hub',
    location: 'Kariakoo Commercial Complex, Dar es Salaam',
    model: 'MikroTik CCR2004-1G-12S+2XS',
    ip: '197.243.12.82',
    status: 'online',
    activeUsers: 142,
    totalRevenueToday: 384500,
    cpuUsage: 18,
    uptime: '48 days, 14 hours'
  },
  {
    id: 'rtr-2',
    name: 'MikroTik hEX — Sinza Hostel & Café',
    location: 'Sinza Kwaremi, Dar es Salaam',
    model: 'MikroTik RB750Gr3',
    ip: '197.243.14.105',
    status: 'online',
    activeUsers: 38,
    totalRevenueToday: 112000,
    cpuUsage: 24,
    uptime: '19 days, 06 hours'
  },
  {
    id: 'rtr-3',
    name: 'UniFi U6 Enterprise — Mlimani Campus Point',
    location: 'Mlimani City Area, Dar es Salaam',
    model: 'UniFi Cloud Gateway Ultra',
    ip: '197.243.15.201',
    status: 'online',
    activeUsers: 64,
    totalRevenueToday: 198000,
    cpuUsage: 12,
    uptime: '31 days, 22 hours'
  }
]

const INITIAL_TRANSACTIONS: PaymentTransaction[] = [
  {
    id: 'tx-101',
    receiptNumber: 'MP-89472619',
    customerPhone: '0754 *** 819',
    method: 'M-PESA',
    amountTzs: 2000,
    packageName: 'Siku 1 Nzima (24 Hrs)',
    routerName: 'MikroTik CCR2004 — Kariakoo Mall Hub',
    timestamp: '2026-11-02 17:14:22',
    status: 'COMPLETED'
  },
  {
    id: 'tx-102',
    receiptNumber: 'TP-44918230',
    customerPhone: '0713 *** 204',
    method: 'TIGO PESA',
    amountTzs: 1000,
    packageName: 'Masaa 3 Kasi Zaidi',
    routerName: 'MikroTik hEX — Sinza Hostel & Café',
    timestamp: '2026-11-02 17:11:05',
    status: 'COMPLETED'
  },
  {
    id: 'tx-103',
    receiptNumber: 'AM-90182411',
    customerPhone: '0789 *** 661',
    method: 'AIRTEL MONEY',
    amountTzs: 500,
    packageName: 'Dakika 60 (Saa 1)',
    routerName: 'UniFi U6 Enterprise — Mlimani Campus Point',
    timestamp: '2026-11-02 17:08:44',
    status: 'COMPLETED'
  },
  {
    id: 'tx-104',
    receiptNumber: 'VCH-782194',
    customerPhone: 'Cash Voucher Sold',
    method: 'CASH VOUCHER',
    amountTzs: 2000,
    packageName: 'Siku 1 Nzima (24 Hrs)',
    routerName: 'MikroTik CCR2004 — Kariakoo Mall Hub',
    timestamp: '2026-11-02 17:01:10',
    status: 'COMPLETED'
  },
  {
    id: 'tx-105',
    receiptNumber: 'HP-18928394',
    customerPhone: '0621 *** 945',
    method: 'HALOPESA',
    amountTzs: 10000,
    packageName: 'Wiki 1 (Siku 7)',
    routerName: 'MikroTik hEX — Sinza Hostel & Café',
    timestamp: '2026-11-02 16:48:30',
    status: 'COMPLETED'
  }
]

export default function AltavoxWifiApp() {
  const [activeTab, setActiveTab] = useState<'overview' | 'routers' | 'packages' | 'vouchers' | 'transactions' | 'portal-demo' | 'settings'>('overview')
  
  // Data states
  const [packages, setPackages] = useState<WifiPackage[]>(INITIAL_PACKAGES)
  const [routers, setRouters] = useState<HotspotRouter[]>(INITIAL_ROUTERS)
  const [transactions, setTransactions] = useState<PaymentTransaction[]>(INITIAL_TRANSACTIONS)
  const [vouchers, setVouchers] = useState<Voucher[]>([
    { code: 'ALTA-8492-9102', packageId: 'pkg-24hr', packageName: 'Siku 1 Nzima (24 Hrs)', priceTzs: 2000, durationHours: 24, status: 'unused', createdAt: '2026-11-02 14:00' },
    { code: 'ALTA-3310-8841', packageId: 'pkg-24hr', packageName: 'Siku 1 Nzima (24 Hrs)', priceTzs: 2000, durationHours: 24, status: 'active', createdAt: '2026-11-02 15:30', usedByMac: '4C:EB:D6:33:11:09', expiresAt: '2026-11-03 15:30' },
    { code: 'ALTA-1109-7723', packageId: 'pkg-3hr', packageName: 'Masaa 3 Kasi Zaidi', priceTzs: 1000, durationHours: 3, status: 'unused', createdAt: '2026-11-02 14:00' },
    { code: 'ALTA-9984-2120', packageId: 'pkg-1hr', packageName: 'Dakika 60 (Saa 1)', priceTzs: 500, durationHours: 1, status: 'expired', createdAt: '2026-11-02 10:00' }
  ])

  // Router Modal / Quick Script generator
  const [selectedRouterForScript, setSelectedRouterForScript] = useState<HotspotRouter | null>(INITIAL_ROUTERS[0])
  const [scriptModalOpen, setScriptModalOpen] = useState(false)
  const [copiedScript, setCopiedScript] = useState(false)

  // Voucher Generator Form State
  const [voucherQty, setVoucherQty] = useState(10)
  const [voucherSelectedPkg, setVoucherSelectedPkg] = useState('pkg-24hr')
  const [voucherPrefix, setVoucherPrefix] = useState('ALTA')
  const [printModalOpen, setPrintModalOpen] = useState(false)

  // Captive Portal Simulation State
  const [portalSelectedPkg, setPortalSelectedPkg] = useState<string>('pkg-24hr')
  const [portalPaymentMethod, setPortalPaymentMethod] = useState<'mpesa' | 'tigo' | 'airtel' | 'halopesa' | 'voucher'>('mpesa')
  const [portalPhone, setPortalPhone] = useState('0754 123 456')
  const [portalVoucherInput, setPortalVoucherInput] = useState('')
  const [portalSimState, setPortalSimState] = useState<'idle' | 'prompting' | 'authenticated'>('idle')
  const [portalMessage, setPortalMessage] = useState('')

  // Settings State (Direct Mobile Money Setup)
  const [mpesaTill, setMpesaTill] = useState('5849201')
  const [tigoTill, setTigoTill] = useState('8841920')
  const [airtelPaybill, setAirtelPaybill] = useState('150820')
  const [businessName, setBusinessName] = useState('Altavox WiFi Networks TZ')

  // Financial Summary
  const totalRevenueToday = useMemo(() => {
    return transactions.reduce((acc, curr) => acc + curr.amountTzs, 0)
  }, [transactions])

  const totalActiveUsers = useMemo(() => {
    return routers.reduce((acc, curr) => acc + curr.activeUsers, 0)
  }, [routers])

  // Generate Voucher Function
  const handleGenerateVouchers = () => {
    const pkg = packages.find((p) => p.id === voucherSelectedPkg) || packages[0]
    const newVouchers: Voucher[] = []

    for (let i = 0; i < voucherQty; i++) {
      const rand1 = Math.floor(1000 + Math.random() * 9000)
      const rand2 = Math.floor(1000 + Math.random() * 9000)
      const code = `${voucherPrefix.toUpperCase()}-${rand1}-${rand2}`
      newVouchers.push({
        code,
        packageId: pkg.id,
        packageName: pkg.name,
        priceTzs: pkg.priceTzs,
        durationHours: pkg.durationHours,
        status: 'unused',
        createdAt: new Date().toISOString().substring(0, 16).replace('T', ' ')
      })
    }

    setVouchers((prev) => [...newVouchers, ...prev])
    alert(`Imefanikiwa! Vocha ${voucherQty} za ${pkg.name} zimezalishwa tayari.`)
  }

  // Handle Captive Portal Payment Simulation
  const handleSimulatePortalPayment = (e: React.FormEvent) => {
    e.preventDefault()
    setPortalSimState('prompting')

    if (portalPaymentMethod === 'voucher') {
      const found = vouchers.find((v) => v.code.trim().toUpperCase() === portalVoucherInput.trim().toUpperCase())
      setTimeout(() => {
        if (found && found.status === 'unused') {
          found.status = 'active'
          found.usedByMac = 'D8:9C:E4:91:AA:02'
          found.expiresAt = 'Kesho saa kama hii'
          setPortalSimState('authenticated')
          setPortalMessage(`Vocha Imekubaliwa! Umepata intaneti ya ${found.packageName}. Furahia kasi ya Altavox WiFi!`)
        } else if (found && found.status !== 'unused') {
          setPortalSimState('idle')
          alert(`Vocha hii tayari imeshatumika au muda wake umeisha. Jaribu vocha nyingine.`)
        } else {
          setPortalSimState('idle')
          alert(`Nambari ya vocha si sahihi. Mfano wa vocha: ${vouchers[0]?.code || 'ALTA-8492-9102'}`)
        }
      }, 1000)
      return
    }

    // Mobile Money Simulation
    const selectedPkgObj = packages.find((p) => p.id === portalSelectedPkg) || packages[0]
    setTimeout(() => {
      // Create new transaction in ledger
      const newTx: PaymentTransaction = {
        id: `tx-${Date.now().toString().slice(-4)}`,
        receiptNumber: `MP-${Math.floor(10000000 + Math.random() * 90000000)}`,
        customerPhone: portalPhone,
        method: portalPaymentMethod.toUpperCase() as any,
        amountTzs: selectedPkgObj.priceTzs,
        packageName: selectedPkgObj.name,
        routerName: routers[0].name,
        timestamp: new Date().toISOString().substring(0, 19).replace('T', ' '),
        status: 'COMPLETED'
      }

      setTransactions((prev) => [newTx, ...prev])
      setPortalSimState('authenticated')
      setPortalMessage(`Malipo ya TZS ${selectedPkgObj.priceTzs.toLocaleString()} yamepokelewa kikamilifu kupitia ${portalPaymentMethod.toUpperCase()}! Umeunganishwa kwenye intaneti kwa muda wa ${selectedPkgObj.durationHours} masaa.`)
    }, 2200)
  }

  // MikroTik Setup Script
  const mikrotikIntegrationScript = useMemo(() => {
    if (!selectedRouterForScript) return ''
    return `# ==============================================================================
# ALTAVOX WIFI — AUTOMATED MIKROTIK HOTSPOT CLOUD CONNECTOR SCRIPT
# Router: ${selectedRouterForScript.name} (IP: ${selectedRouterForScript.ip})
# Generated for: ${businessName}
# Direct Payment Settlement: M-Pesa Till ${mpesaTill} | Tigo Pesa ${tigoTill}
# ==============================================================================

/system identity set name="Altavox-WiFi-${selectedRouterForScript.id}"

# 1. SETUP CLOUD WALLED GARDEN (ALLOWS PAYMENTS BEFORE USER AUTHENTICATION)
/ip hotspot walled-garden ip
add action=accept dst-host="*.upesilipa.com" comment="Altavox WiFi API"
add action=accept dst-host="*.altavox.space" comment="Altavox Cloud Core"
add action=accept dst-host="*.vodacom.co.tz" comment="M-Pesa IPN Gateway"
add action=accept dst-host="*.tigo.co.tz" comment="Tigo Pesa Gateway"
add action=accept dst-host="*.airtel.co.tz" comment="Airtel Money"
add action=accept dst-host="*.halotel.co.tz" comment="HaloPesa Gateway"

# 2. CONFIGURE RADIUS CLIENT & AUTOMATED SESSION ACCOUNTING
/radius
add address=197.243.12.82 secret="AltavoxSecretKey2026" service=hotspot authentication-port=1812 accounting-port=1813 timeout=3000ms comment="Altavox Cloud AAA"
/ip hotspot profile
set [ find default=yes ] use-radius=yes radius-accounting=yes radius-interim-update=5m

# 3. SET CAPTIVE PORTAL REDIRECT URL
/ip hotspot profile
set [ find default=yes ] login-by=http-chap,mac-cookie mac-cookie-timeout=7d html-directory=hotspot

# 4. FAST QUEUE SYNC LISTENER
/ip service set api-ssl port=8729 disabled=no comment="Altavox Real-Time Sync"

/log info message="✓ Altavox WiFi Hotspot Cloud Connector Successfully Initialized!"`
  }, [selectedRouterForScript, businessName, mpesaTill, tigoTill])

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900 selection:bg-[#f26522] selection:text-white">
      {/* Universal Altavox Header */}
      <AltavoxHeader />

      {/* Altavox WiFi Top Bar (App.upesilipa.com style) */}
      <div className="bg-[#051c33] border-b border-white/10 text-white sticky top-[76px] z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-3">
            {/* Brand Logo & Operator Tag */}
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-[#f26522] text-white shadow-md">
                <Wifi className="size-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-black tracking-tight text-white">
                    ALTAVOX <span className="text-[#f26522]">WIFI</span>
                  </h1>
                  <span className="font-mono text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded">
                    Cloud Hotspot v3.2
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">
                  UpesiLipa-Class Automated MikroTik Hotspot & Mobile Money Platform
                </p>
              </div>
            </div>

            {/* Quick Live Stats & Direct Money Indicator */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs font-mono">
              <div className="flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-3 py-1.5">
                <span className="size-2 rounded-full bg-emerald-400" />
                <span className="text-slate-300">Mauzo Leo:</span>
                <span className="font-bold text-emerald-400">TZS {totalRevenueToday.toLocaleString()}</span>
              </div>

              <div className="flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-3 py-1.5">
                <Users className="size-3.5 text-orange-400" />
                <span className="text-slate-300">Waliounganishwa:</span>
                <span className="font-bold text-white">{totalActiveUsers} Watumiaji</span>
              </div>

              <button
                onClick={() => setActiveTab('portal-demo')}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#f26522] px-3.5 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-[#e05312] transition cursor-pointer"
              >
                <Smartphone className="size-3.5" />
                <span>Splash Page Demo</span>
              </button>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pt-1 pb-2 border-t border-white/10 text-xs font-bold text-slate-300 scrollbar-none">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-2 rounded-lg transition whitespace-nowrap cursor-pointer ${
                activeTab === 'overview' ? 'bg-[#f26522] text-white' : 'hover:bg-white/10 hover:text-white'
              }`}
            >
              Dashboard (Muhtasari)
            </button>

            <button
              onClick={() => setActiveTab('routers')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition whitespace-nowrap cursor-pointer ${
                activeTab === 'routers' ? 'bg-[#f26522] text-white' : 'hover:bg-white/10 hover:text-white'
              }`}
            >
              <Router className="size-3.5" />
              <span>Vipanga Njia (Routers) ({routers.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('packages')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition whitespace-nowrap cursor-pointer ${
                activeTab === 'packages' ? 'bg-[#f26522] text-white' : 'hover:bg-white/10 hover:text-white'
              }`}
            >
              <Zap className="size-3.5" />
              <span>Vifurushi vya WiFi ({packages.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('vouchers')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition whitespace-nowrap cursor-pointer ${
                activeTab === 'vouchers' ? 'bg-[#f26522] text-white' : 'hover:bg-white/10 hover:text-white'
              }`}
            >
              <Ticket className="size-3.5" />
              <span>Vocha za Karatasi (Vouchers)</span>
            </button>

            <button
              onClick={() => setActiveTab('transactions')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition whitespace-nowrap cursor-pointer ${
                activeTab === 'transactions' ? 'bg-[#f26522] text-white' : 'hover:bg-white/10 hover:text-white'
              }`}
            >
              <DollarSign className="size-3.5" />
              <span>Miamala ya Simu (Transactions)</span>
            </button>

            <button
              onClick={() => setActiveTab('portal-demo')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition whitespace-nowrap cursor-pointer ${
                activeTab === 'portal-demo' ? 'bg-[#f26522] text-white' : 'hover:bg-white/10 hover:text-white'
              }`}
            >
              <Smartphone className="size-3.5" />
              <span>Captive Portal (Simu ya Mteja)</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition whitespace-nowrap cursor-pointer ${
                activeTab === 'settings' ? 'bg-[#f26522] text-white' : 'hover:bg-white/10 hover:text-white'
              }`}
            >
              <Settings className="size-3.5" />
              <span>Mipangilio ya Malipo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* ======================================================== */}
          {/* TAB 1: OVERVIEW DASHBOARD */}
          {/* ======================================================== */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Top Highlight Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Revenue Card */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider">Mapato ya Leo</span>
                    <span className="flex size-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                      <DollarSign className="size-4" />
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-[#07294d]">
                    TZS {totalRevenueToday.toLocaleString()}
                  </div>
                  <div className="mt-2 text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <TrendingUp className="size-3" />
                    <span>100% Pesa Inaingia Moja kwa Moja kwenye Till yako</span>
                  </div>
                </div>

                {/* Active Users */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider">Waliounganishwa Mtandaoni</span>
                    <span className="flex size-8 items-center justify-center rounded-lg bg-orange-50 text-[#f26522]">
                      <Users className="size-4" />
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-[#07294d]">
                    {totalActiveUsers} Vifaa
                  </div>
                  <div className="mt-2 text-[11px] text-slate-500">
                    Kwenye router {routers.length} zinazofanya kazi
                  </div>
                </div>

                {/* Active Routers */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider">Hali ya Router (MikroTik)</span>
                    <span className="flex size-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <Router className="size-4" />
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-[#07294d]">
                    {routers.filter((r) => r.status === 'online').length} / {routers.length} Online
                  </div>
                  <div className="mt-2 text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-emerald-500" />
                    <span>MikroTik RouterOS API Imeunganishwa</span>
                  </div>
                </div>

                {/* Unused Vouchers */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                  <div className="flex items-center justify-between text-slate-500 mb-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider">Vocha Tayari Kuuzwa</span>
                    <span className="flex size-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                      <Ticket className="size-4" />
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-[#07294d]">
                    {vouchers.filter((v) => v.status === 'unused').length} Vocha
                  </div>
                  <div className="mt-2 text-[11px] text-slate-500">
                    Tayari kuchapishwa au kuuzwa kwa pesa taslimu
                  </div>
                </div>
              </div>

              {/* Main Grid: Routers List + Recent Transactions */}
              <div className="grid lg:grid-cols-12 gap-8">
                {/* Left: Router Health */}
                <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                  <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="text-base font-extrabold text-[#07294d]">
                        Vipanga Njia Zako (Connected MikroTik & UniFi)
                      </h3>
                      <p className="text-xs text-slate-500">
                        Zinadhibitiwa na Altavox WiFi kupitia Cloud RADIUS na REST API
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('routers')}
                      className="text-xs font-bold text-[#f26522] hover:underline"
                    >
                      Dhibiti Zote →
                    </button>
                  </div>

                  <div className="space-y-3">
                    {routers.map((router) => (
                      <div
                        key={router.id}
                        className="rounded-xl border border-slate-100 bg-slate-50 p-4 hover:border-slate-300 transition"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <span className="size-2 rounded-full bg-emerald-500" />
                            <div>
                              <h4 className="text-xs font-extrabold text-[#07294d]">{router.name}</h4>
                              <p className="text-[11px] text-slate-500">{router.location}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 text-xs font-mono">
                            <div>
                              <span className="text-slate-400 text-[10px] block">Wateja</span>
                              <span className="font-bold text-slate-800">{router.activeUsers}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 text-[10px] block">Mauzo Leo</span>
                              <span className="font-bold text-emerald-600">TZS {router.totalRevenueToday.toLocaleString()}</span>
                            </div>
                            <button
                              onClick={() => {
                                setSelectedRouterForScript(router)
                                setScriptModalOpen(true)
                              }}
                              className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                            >
                              Setup Script
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: Live Payment Feed */}
                <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                  <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="text-base font-extrabold text-[#07294d]">
                        Miamala ya Hivi Karibuni
                      </h3>
                      <p className="text-xs text-slate-500">
                        Malipo yaliyothibitishwa na M-Pesa & Tigo Pesa
                      </p>
                    </div>
                    <span className="flex size-2 rounded-full bg-emerald-500" />
                  </div>

                  <div className="divide-y divide-slate-100">
                    {transactions.slice(0, 5).map((tx) => (
                      <div key={tx.id} className="py-3 flex items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-[#07294d]">{tx.customerPhone}</span>
                            <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                              tx.method === 'M-PESA' ? 'bg-red-50 text-red-600 border border-red-200' :
                              tx.method === 'TIGO PESA' ? 'bg-blue-50 text-blue-600 border border-blue-200' :
                              tx.method === 'AIRTEL MONEY' ? 'bg-red-50 text-red-700 border border-red-200' :
                              'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            }`}>
                              {tx.method}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            {tx.packageName} · {tx.timestamp.substring(11)}
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="font-mono font-black text-xs text-emerald-600 block">
                            +TZS {tx.amountTzs.toLocaleString()}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {tx.receiptNumber}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveTab('transactions')}
                    className="mt-4 w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-center text-xs font-bold text-[#07294d] hover:bg-slate-100 transition"
                  >
                    Tazama Miamala Yote ({transactions.length})
                  </button>
                </div>
              </div>

              {/* Direct Money Notice Banner */}
              <div className="rounded-2xl bg-gradient-to-r from-[#07294d] to-[#041a33] text-white p-6 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-orange-400">
                    <Shield className="size-4" />
                    <span>0% Transaction Deduction — Pesa Yako 100% Ni Yako</span>
                  </div>
                  <h4 className="text-lg font-black text-white">
                    Tofauti ya Altavox WiFi na Mfumo Mwingine
                  </h4>
                  <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                    Altavox WiFi haishiki fedha za wateja wako. Pesa zote za M-Pesa na Tigo Pesa zinaingia moja kwa moja kwenye namba yako ya Lipa Namba au Till yako bila kukatwa asilimia yoyote na mfumo wetu.
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('settings')}
                  className="rounded-xl bg-[#f26522] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#e05312] transition shrink-0 cursor-pointer"
                >
                  Weka Lipa Namba Yako
                </button>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: ROUTERS MANAGEMENT */}
          {/* ======================================================== */}
          {activeTab === 'routers' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                <div>
                  <h3 className="text-xl font-black text-[#07294d]">
                    Vipanga Njia (Hotspot Routers)
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Unganisha router yoyote ya MikroTik, Ubiquiti UniFi, TP-Link Omada, au pfSense kwa dakika 2 tu.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const name = prompt('Weka jina la router mpya (Mfano: MikroTik hEX — Mbezi Beach)')
                      if (name) {
                        const newRtr: HotspotRouter = {
                          id: `rtr-${Date.now().toString().slice(-3)}`,
                          name,
                          location: 'Tanzania Hub',
                          model: 'MikroTik RouterOS v7',
                          ip: '197.243.16.' + Math.floor(10 + Math.random() * 200),
                          status: 'online',
                          activeUsers: 0,
                          totalRevenueToday: 0,
                          cpuUsage: 10,
                          uptime: 'Just Connected'
                        }
                        setRouters([...routers, newRtr])
                        setSelectedRouterForScript(newRtr)
                        setScriptModalOpen(true)
                      }
                    }}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#f26522] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#e05312] transition shadow-sm cursor-pointer"
                  >
                    <Plus className="size-4" />
                    <span>Ongeza Router Mpya</span>
                  </button>
                </div>
              </div>

              {/* Routers Grid */}
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {routers.map((router) => (
                  <div
                    key={router.id}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                          <span className="size-1.5 rounded-full bg-emerald-500" />
                          <span>Connected</span>
                        </span>
                        <span className="font-mono text-xs text-slate-400">{router.ip}</span>
                      </div>

                      <h4 className="text-base font-extrabold text-[#07294d]">{router.name}</h4>
                      <p className="text-xs text-slate-500 mt-1">{router.location}</p>
                      <p className="text-[11px] font-mono text-slate-400 mt-0.5">{router.model}</p>

                      <div className="mt-6 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 text-xs">
                        <div className="bg-slate-50 p-2.5 rounded-xl">
                          <span className="text-slate-400 text-[10px] block">Waliounganishwa</span>
                          <span className="text-sm font-bold text-slate-800">{router.activeUsers} Vifaa</span>
                        </div>
                        <div className="bg-slate-50 p-2.5 rounded-xl">
                          <span className="text-slate-400 text-[10px] block">Mapato ya Leo</span>
                          <span className="text-sm font-bold text-emerald-600">TZS {router.totalRevenueToday.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="mt-3 text-[11px] text-slate-500 flex items-center justify-between">
                        <span>CPU: {router.cpuUsage}%</span>
                        <span>Uptime: {router.uptime}</span>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedRouterForScript(router)
                          setScriptModalOpen(true)
                        }}
                        className="flex-1 rounded-xl bg-[#07294d] py-2.5 text-center text-xs font-bold text-white hover:bg-[#051c36] transition cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <FileText className="size-3.5" />
                        <span>Pata Script ya MikroTik</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: PACKAGES MANAGEMENT */}
          {/* ======================================================== */}
          {activeTab === 'packages' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                <div>
                  <h3 className="text-xl font-black text-[#07294d]">
                    Vifurushi vya WiFi & Bei (Packages)
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Vifurushi vinavyoonekana kwenye simu ya mteja (Splash Page) akijiunga na mtandao wako.
                  </p>
                </div>

                <button
                  onClick={() => {
                    const name = prompt('Jina la Kifurushi (Mfano: Masaa 12 Usiku):')
                    const price = prompt('Bei kwa Shilingi (Mfano: 1500):')
                    if (name && price) {
                      const newPkg: WifiPackage = {
                        id: `pkg-${Date.now().toString().slice(-4)}`,
                        name,
                        durationHours: 12,
                        priceTzs: Number(price),
                        downloadSpeedMbps: 8,
                        uploadSpeedMbps: 4,
                        deviceLimit: 1,
                        description: 'Kifurushi kipya kilichosanidiwa na msimamizi.'
                      }
                      setPackages([...packages, newPkg])
                    }
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#f26522] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#e05312] transition shadow-sm cursor-pointer"
                >
                  <Plus className="size-4" />
                  <span>Ongeza Kifurushi Kipya</span>
                </button>
              </div>

              {/* Packages Cards */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`rounded-2xl border p-6 bg-white shadow-xs flex flex-col justify-between relative ${
                      pkg.isPopular ? 'border-[#f26522] ring-1 ring-[#f26522]/20' : 'border-slate-200'
                    }`}
                  >
                    {pkg.isPopular && (
                      <span className="absolute -top-3 right-6 rounded-full bg-[#f26522] px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                        Maarufu Zaidi
                      </span>
                    )}

                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs text-slate-400 font-bold">
                          {pkg.durationHours >= 24 ? `${pkg.durationHours / 24} Siku` : `${pkg.durationHours} Masaa`}
                        </span>
                        <span className="font-mono text-xl font-black text-[#07294d]">
                          TZS {pkg.priceTzs.toLocaleString()}
                        </span>
                      </div>

                      <h4 className="text-lg font-black text-[#07294d] mt-2">{pkg.name}</h4>
                      <p className="text-xs text-slate-600 mt-1">{pkg.description}</p>

                      <div className="mt-6 space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-700">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Kasi ya Kushusha (Download):</span>
                          <span className="font-mono font-bold text-[#f26522]">{pkg.downloadSpeedMbps} Mbps</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Kasi ya Kupakia (Upload):</span>
                          <span className="font-mono font-bold text-slate-800">{pkg.uploadSpeedMbps} Mbps</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-500">Kikomo cha Vifaa:</span>
                          <span className="font-mono font-bold text-slate-800">{pkg.deviceLimit} Kifaa</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="size-3" />
                        <span>Inatumika Kwenye Captive Portal</span>
                      </span>
                      <button
                        onClick={() => {
                          setPortalSelectedPkg(pkg.id)
                          setActiveTab('portal-demo')
                        }}
                        className="text-xs font-bold text-[#f26522] hover:underline cursor-pointer"
                      >
                        Jaribu Kwenye Simu →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 4: VOUCHER GENERATOR & PRINT */}
          {/* ======================================================== */}
          {activeTab === 'vouchers' && (
            <div className="space-y-8">
              {/* Generator Configuration Panel */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-xl font-black text-[#07294d]">
                      Zalisha Vocha za Karatasi (Cash Vouchers)
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">
                      Kwa wateja wanaolipa pesa taslimu madukani au mikahawani. Chapisha na uuze mara moja.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPrintModalOpen(true)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-[#07294d] hover:bg-slate-100 transition cursor-pointer"
                    >
                      <Printer className="size-4" />
                      <span>Muonekano wa Kuchapisha</span>
                    </button>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Chagua Kifurushi cha Vocha
                    </label>
                    <select
                      value={voucherSelectedPkg}
                      onChange={(e) => setVoucherSelectedPkg(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-800 focus:border-[#f26522] focus:outline-none"
                    >
                      {packages.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} — TZS {p.priceTzs.toLocaleString()}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Idadi ya Vocha
                    </label>
                    <select
                      value={voucherQty}
                      onChange={(e) => setVoucherQty(Number(e.target.value))}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-800 focus:border-[#f26522] focus:outline-none"
                    >
                      <option value={10}>Vocha 10</option>
                      <option value={20}>Vocha 20</option>
                      <option value={50}>Vocha 50</option>
                      <option value={100}>Vocha 100</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Prefix ya Nambari
                    </label>
                    <input
                      type="text"
                      value={voucherPrefix}
                      onChange={(e) => setVoucherPrefix(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-800 focus:border-[#f26522] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={handleGenerateVouchers}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#f26522] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#e05312] transition shadow-md cursor-pointer"
                  >
                    <Ticket className="size-4" />
                    <span>Zalisha Vocha {voucherQty} Sasa</span>
                  </button>
                </div>
              </div>

              {/* Vouchers Table */}
              <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                  <h4 className="text-base font-extrabold text-[#07294d]">
                    Orodha ya Vocha Zilizopo ({vouchers.length})
                  </h4>
                  <span className="text-xs text-slate-500">
                    Bofya nambari ya vocha kuinakili (copy) na kuitumia
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                        <th className="py-3 px-6">Nambari ya Vocha (Code)</th>
                        <th className="py-3 px-4">Kifurushi</th>
                        <th className="py-3 px-4">Bei</th>
                        <th className="py-3 px-4">Hali</th>
                        <th className="py-3 px-4">Tarehe</th>
                        <th className="py-3 px-6 text-right">Kitendo</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {vouchers.map((v, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition">
                          <td className="py-3.5 px-6 font-mono font-black text-[#07294d] text-sm">
                            {v.code}
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-slate-800">
                            {v.packageName}
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold text-emerald-600">
                            TZS {v.priceTzs.toLocaleString()}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                              v.status === 'unused' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                              v.status === 'active' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                              'bg-slate-100 text-slate-500 border border-slate-200'
                            }`}>
                              {v.status === 'unused' ? 'HAIJATUMIKA' : v.status === 'active' ? 'INATUMIKA' : 'IMEISHA'}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                            {v.createdAt}
                          </td>
                          <td className="py-3.5 px-6 text-right">
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(v.code)
                                setPortalVoucherInput(v.code)
                                setActiveTab('portal-demo')
                                setPortalPaymentMethod('voucher')
                              }}
                              className="inline-flex items-center gap-1 rounded-lg bg-orange-50 px-2.5 py-1 text-[11px] font-bold text-[#f26522] hover:bg-orange-100 transition cursor-pointer"
                            >
                              <span>Jaribu Kwenye Portal</span>
                              <ArrowRight className="size-3" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 5: TRANSACTIONS & MOBILE MONEY BILLING */}
          {/* ======================================================== */}
          {activeTab === 'transactions' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                <div>
                  <h3 className="text-xl font-black text-[#07294d]">
                    Kumbukumbu ya Miamala (Payment Ledger)
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Malipo yote yaliyolipwa na wateja kupitia M-Pesa, Tigo Pesa, Airtel Money na HaloPesa.
                  </p>
                </div>

                <div className="font-mono text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-xl">
                  Jumla: TZS {totalRevenueToday.toLocaleString()}
                </div>
              </div>

              {/* Transactions Table */}
              <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                        <th className="py-3.5 px-6">Risiti / Kumbukumbu</th>
                        <th className="py-3.5 px-4">Simu ya Mteja</th>
                        <th className="py-3.5 px-4">Mtandao wa Malipo</th>
                        <th className="py-3.5 px-4">Kifurushi</th>
                        <th className="py-3.5 px-4">Kiasi (TZS)</th>
                        <th className="py-3.5 px-4">Router / Sehemu</th>
                        <th className="py-3.5 px-6 text-right">Muda</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {transactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-slate-50 transition">
                          <td className="py-3.5 px-6 font-mono font-bold text-[#07294d]">
                            {tx.receiptNumber}
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-slate-800">
                            {tx.customerPhone}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                              tx.method === 'M-PESA' ? 'bg-red-50 text-red-600 border border-red-200' :
                              tx.method === 'TIGO PESA' ? 'bg-blue-50 text-blue-600 border border-blue-200' :
                              tx.method === 'AIRTEL MONEY' ? 'bg-red-50 text-red-700 border border-red-200' :
                              'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            }`}>
                              {tx.method}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-700 font-semibold">
                            {tx.packageName}
                          </td>
                          <td className="py-3.5 px-4 font-mono font-black text-emerald-600 text-sm">
                            TZS {tx.amountTzs.toLocaleString()}
                          </td>
                          <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                            {tx.routerName.split('—')[1] || tx.routerName}
                          </td>
                          <td className="py-3.5 px-6 text-right text-slate-400 font-mono text-[11px]">
                            {tx.timestamp}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 6: CAPTIVE PORTAL SIMULATOR (WHAT CLIENT SEES ON PHONE) */}
          {/* ======================================================== */}
          {activeTab === 'portal-demo' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#f26522] font-bold">
                    <Smartphone className="size-4" />
                    <span>Live Captive Portal Simulator (Splash Page)</span>
                  </div>
                  <h3 className="text-xl font-black text-[#07294d] mt-1">
                    Hiki Ndicho Mteja Anachokiona Kwenye Simu Yake
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Mteja akijiunga na WiFi ya &quot;ALTAVOX-WIFI-FREE&quot;, ukurasa huu unafunguka mara moja kumruhusu alipie kwa M-Pesa au kuingiza vocha.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setPortalSimState('idle')
                      setPortalMessage('')
                    }}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                  >
                    <RefreshCw className="size-3.5" />
                    <span>Reset Splash Page</span>
                  </button>
                </div>
              </div>

              {/* Phone Mockup Container */}
              <div className="flex justify-center py-4">
                <div className="w-full max-w-sm rounded-[40px] border-8 border-slate-800 bg-[#07294d] shadow-2xl p-4 text-white overflow-hidden relative">
                  {/* Phone Speaker Notch */}
                  <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <div className="size-1.5 bg-slate-600 rounded-full" />
                  </div>

                  {/* Splash Page Content */}
                  <div className="bg-white text-slate-900 rounded-3xl p-5 shadow-inner">
                    {/* Brand Header */}
                    <div className="text-center pb-4 border-b border-slate-100">
                      <div className="flex size-12 mx-auto items-center justify-center rounded-2xl bg-[#f26522] text-white shadow-md mb-2">
                        <Wifi className="size-6" />
                      </div>
                      <h4 className="text-base font-black text-[#07294d] tracking-tight">
                        {businessName}
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Unganishwa na intaneti ya kasi ya juu sasa hivi
                      </p>
                    </div>

                    {/* Authenticated State */}
                    {portalSimState === 'authenticated' ? (
                      <div className="py-8 text-center space-y-4">
                        <div className="flex size-14 mx-auto items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                          <CheckCircle2 className="size-8" />
                        </div>
                        <h5 className="text-lg font-black text-[#07294d]">
                          Umeunganishwa Mtandaoni!
                        </h5>
                        <p className="text-xs text-slate-600 leading-relaxed px-2">
                          {portalMessage}
                        </p>
                        <div className="rounded-xl bg-slate-50 p-3 text-xs font-mono text-slate-600 border border-slate-200">
                          IP: 10.10.4.18 · MAC: D8:9C:E4:91:AA:02
                        </div>
                        <button
                          onClick={() => setPortalSimState('idle')}
                          className="w-full rounded-xl bg-[#07294d] py-3 text-xs font-bold text-white hover:bg-[#051c36] transition cursor-pointer"
                        >
                          Anza Kuperuzi (Browse Web)
                        </button>
                      </div>
                    ) : (
                      /* Purchase Form */
                      <form onSubmit={handleSimulatePortalPayment} className="py-4 space-y-4">
                        {/* Step 1: Select Package */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-2">
                            1. Chagua Kifurushi chako:
                          </label>
                          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                            {packages.map((pkg) => (
                              <label
                                key={pkg.id}
                                className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition text-xs ${
                                  portalSelectedPkg === pkg.id
                                    ? 'border-[#f26522] bg-orange-50/70 font-bold text-[#07294d]'
                                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <input
                                    type="radio"
                                    name="portalPackage"
                                    checked={portalSelectedPkg === pkg.id}
                                    onChange={() => setPortalSelectedPkg(pkg.id)}
                                    className="accent-[#f26522]"
                                  />
                                  <span>{pkg.name}</span>
                                </div>
                                <span className="font-mono font-black text-[#f26522]">
                                  {pkg.priceTzs} TZS
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Step 2: Payment Method */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-2">
                            2. Njia ya Kulipa:
                          </label>
                          <div className="grid grid-cols-2 gap-1.5 text-xs">
                            <button
                              type="button"
                              onClick={() => setPortalPaymentMethod('mpesa')}
                              className={`p-2 rounded-xl border text-center font-bold transition cursor-pointer ${
                                portalPaymentMethod === 'mpesa'
                                  ? 'border-red-500 bg-red-50 text-red-600'
                                  : 'border-slate-200 bg-white text-slate-600'
                              }`}
                            >
                              Vodacom M-Pesa
                            </button>

                            <button
                              type="button"
                              onClick={() => setPortalPaymentMethod('tigo')}
                              className={`p-2 rounded-xl border text-center font-bold transition cursor-pointer ${
                                portalPaymentMethod === 'tigo'
                                  ? 'border-blue-500 bg-blue-50 text-blue-600'
                                  : 'border-slate-200 bg-white text-slate-600'
                              }`}
                            >
                              Tigo Pesa
                            </button>

                            <button
                              type="button"
                              onClick={() => setPortalPaymentMethod('airtel')}
                              className={`p-2 rounded-xl border text-center font-bold transition cursor-pointer ${
                                portalPaymentMethod === 'airtel'
                                  ? 'border-red-600 bg-red-50 text-red-700'
                                  : 'border-slate-200 bg-white text-slate-600'
                              }`}
                            >
                              Airtel Money
                            </button>

                            <button
                              type="button"
                              onClick={() => setPortalPaymentMethod('voucher')}
                              className={`p-2 rounded-xl border text-center font-bold transition cursor-pointer ${
                                portalPaymentMethod === 'voucher'
                                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                  : 'border-slate-200 bg-white text-slate-600'
                              }`}
                            >
                              Vocha ya Karatasi
                            </button>
                          </div>
                        </div>

                        {/* Step 3: Input phone or voucher */}
                        {portalPaymentMethod === 'voucher' ? (
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Weka Nambari ya Vocha (Mfano: {vouchers[0]?.code})
                            </label>
                            <input
                              type="text"
                              value={portalVoucherInput}
                              onChange={(e) => setPortalVoucherInput(e.target.value)}
                              placeholder="ALTA-XXXX-XXXX"
                              required
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-mono font-bold text-slate-800 uppercase focus:border-[#f26522] focus:outline-none"
                            />
                          </div>
                        ) : (
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Namba yako ya Simu ya {portalPaymentMethod.toUpperCase()}:
                            </label>
                            <input
                              type="text"
                              value={portalPhone}
                              onChange={(e) => setPortalPhone(e.target.value)}
                              required
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-mono font-bold text-slate-800 focus:border-[#f26522] focus:outline-none"
                            />
                            <p className="text-[10px] text-slate-400 mt-1">
                              Utapokea ujumbe kwenye simu wa kuweka PIN kukamilisha malipo.
                            </p>
                          </div>
                        )}

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={portalSimState === 'prompting'}
                          className={`w-full rounded-xl bg-[#f26522] py-3 text-xs font-bold text-white shadow-md hover:bg-[#e05312] transition cursor-pointer flex items-center justify-center gap-2 ${
                            portalSimState === 'prompting' ? 'opacity-80' : ''
                          }`}
                        >
                          {portalSimState === 'prompting' ? (
                            <>
                              <RefreshCw className="size-3.5 animate-spin" />
                              <span>Inatuma USSD Push kwenye Simu...</span>
                            </>
                          ) : portalPaymentMethod === 'voucher' ? (
                            <span>Unganisha kwa Vocha</span>
                          ) : (
                            <span>Lipa & Unganishwa Mara Moja</span>
                          )}
                        </button>
                      </form>
                    )}

                    <div className="pt-3 border-t border-slate-100 text-center text-[10px] text-slate-400">
                      Powered by Altavox WiFi Engine · Salama 100%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 7: SETTINGS & DIRECT MOBILE MONEY SETUP */}
          {/* ======================================================== */}
          {activeTab === 'settings' && (
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
                <div>
                  <h3 className="text-xl font-black text-[#07294d]">
                    Mipangilio ya Lipa Namba & Till Yako
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Weka taarifa za akaunti yako ya biashara. Fedha zote zinazokusanywa na wateja wako zitaingia hapa moja kwa moja bila kupitia mtu wa kati.
                  </p>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Jina la Mtandao wako wa WiFi (Business Brand Name)
                    </label>
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-800 focus:border-[#f26522] focus:outline-none"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Vodacom M-Pesa Till / Merchant Number
                      </label>
                      <input
                        type="text"
                        value={mpesaTill}
                        onChange={(e) => setMpesaTill(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-mono font-bold text-slate-800 focus:border-[#f26522] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Tigo Pesa / Mixx Till Number
                      </label>
                      <input
                        type="text"
                        value={tigoTill}
                        onChange={(e) => setTigoTill(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-mono font-bold text-slate-800 focus:border-[#f26522] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Airtel Money Paybill / Till Number
                    </label>
                    <input
                      type="text"
                      value={airtelPaybill}
                      onChange={(e) => setAirtelPaybill(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-mono font-bold text-slate-800 focus:border-[#f26522] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="size-4" />
                    <span>Mipangilio Imehifadhiwa</span>
                  </span>
                  <button
                    onClick={() => alert('Mipangilio ya Lipa Namba imesasishwa kikamilifu!')}
                    className="rounded-xl bg-[#f26522] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#e05312] transition shadow-md cursor-pointer"
                  >
                    Hifadhi Mipangilio
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Script Integration Modal for MikroTik */}
      {scriptModalOpen && selectedRouterForScript && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-2xl rounded-3xl bg-[#051c33] border border-white/20 p-6 sm:p-8 text-white shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-orange-400">
                  MikroTik Automated Setup Script
                </span>
                <h3 className="text-lg font-black text-white mt-0.5">
                  {selectedRouterForScript.name}
                </h3>
              </div>
              <button
                onClick={() => setScriptModalOpen(false)}
                className="rounded-lg bg-white/10 p-2 text-slate-300 hover:bg-white/20 transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300 mt-3 leading-relaxed">
              Fungua Winbox kwenye kompyuta yako, nenda kwenye <strong>Terminal</strong>, kisha bandika (paste) maandishi haya yote hapa chini. Router yako itaunganishwa papo hapo na Altavox WiFi!
            </p>

            <div className="mt-4 flex-1 bg-black/50 border border-white/10 rounded-2xl p-4 font-mono text-xs overflow-y-auto max-h-80 scrollbar-thin scrollbar-thumb-white/20">
              <pre className="text-emerald-300 whitespace-pre">
                {mikrotikIntegrationScript}
              </pre>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(mikrotikIntegrationScript)
                  setCopiedScript(true)
                  setTimeout(() => setCopiedScript(false), 2000)
                }}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#f26522] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#e05312] transition shadow-md cursor-pointer"
              >
                {copiedScript ? (
                  <>
                    <Check className="size-4" />
                    <span>Imenakiliwa (Copied!)</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-4" />
                    <span>Nakili Script Yote (Copy)</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setScriptModalOpen(false)}
                className="rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-bold text-white hover:bg-white/20 transition cursor-pointer"
              >
                Funga
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Printable Vouchers Modal */}
      {printModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-4xl rounded-3xl bg-white border border-slate-300 p-6 sm:p-8 text-slate-900 shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-xl font-black text-[#07294d]">
                  Kadi za Vocha Tayari Kuchapishwa (Print Sheet)
                </h3>
                <p className="text-xs text-slate-500">
                  Kata vocha hizi na uzigawie wateja wanaolipa pesa taslimu.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#f26522] px-4 py-2 text-xs font-bold text-white hover:bg-[#e05312] transition shadow-md cursor-pointer"
                >
                  <Printer className="size-3.5" />
                  <span>Print Sasa</span>
                </button>
                <button
                  onClick={() => setPrintModalOpen(false)}
                  className="rounded-lg bg-slate-100 p-2 text-slate-700 hover:bg-slate-200 transition cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="mt-6 flex-1 overflow-y-auto grid sm:grid-cols-2 md:grid-cols-3 gap-4 p-2">
              {vouchers.slice(0, 9).map((v, i) => (
                <div
                  key={i}
                  className="rounded-2xl border-2 border-dashed border-slate-300 p-4 bg-slate-50 relative flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-2">
                    <span className="font-black text-xs text-[#07294d] flex items-center gap-1">
                      <Wifi className="size-3.5 text-[#f26522]" />
                      <span>{businessName}</span>
                    </span>
                    <span className="font-mono text-xs font-bold text-emerald-600">
                      TZS {v.priceTzs.toLocaleString()}
                    </span>
                  </div>

                  <div className="py-2 text-center">
                    <span className="text-[10px] text-slate-500 uppercase font-mono block">Nambari ya Vocha</span>
                    <span className="font-mono text-base font-black tracking-wider text-[#f26522] block my-1">
                      {v.code}
                    </span>
                    <span className="text-xs font-bold text-slate-700 block">
                      {v.packageName}
                    </span>
                  </div>

                  <div className="border-t border-slate-200 pt-2 text-[10px] text-slate-500 text-center">
                    Unganisha WiFi: <strong>ALTAVOX-WIFI</strong> kisha weka nambari hii.
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setPrintModalOpen(false)}
                className="rounded-xl bg-slate-100 px-5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200 transition"
              >
                Funga
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Universal Altavox Footer */}
      <AltavoxFooter />
    </div>
  )
}
