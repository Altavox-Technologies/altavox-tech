'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
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
  FileText,
  Activity,
  ArrowLeft,
  LayoutDashboard,
  Layers,
  ChevronDown,
  Menu,
  Terminal,
  X,
  CreditCard,
  UserCheck,
  Cpu,
  BarChart3,
  MessageSquare,
  MessageCircle,
  Briefcase,
  Share2,
  Bell,
  FileSpreadsheet,
  List,
  Grid,
  Scissors,
  CheckSquare,
  Square,
} from 'lucide-react'
import { WifiD3Analytics } from '@/components/wifi-d3-analytics'
import { WifiMeshTopology } from '@/components/wifi-mesh-topology'
import { WifiClientSessionsModal } from '@/components/wifi-client-sessions-modal'
import { WifiAiNetworkAdvisor } from '@/components/wifi-ai-network-advisor'

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
  brand: 'MikroTik' | 'TP-Link Omada' | 'Ubiquiti UniFi' | 'Ruijie Reyee' | 'pfSense'
  ip: string
  status: 'online' | 'offline'
  activeUsers: number
  totalRevenueToday: number
  cpuUsage: number
  uptime: string
  interface: string
}

interface Voucher {
  code: string
  packageId: string
  packageName: string
  priceTzs: number
  durationHours: number
  status: 'unused' | 'active' | 'expired'
  createdAt: string
  agentName?: string
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
  status: 'DEMO' | 'PENDING' | 'FAILED'
}

interface Agent {
  id: string
  name: string
  location: string
  phone: string
  commissionRate: number // e.g. 10%
  vouchersSold: number
  totalEarnedTzs: number
  balanceTzs: number
  status: 'active' | 'suspended'
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
    description: 'Bando maarufu zaidi kwa wanafunzi, mikahawa na vituo vya mabasi.',
    isPopular: true
  },
  {
    id: 'pkg-24hr',
    name: 'Siku 1 Nzima (24 Hrs)',
    durationHours: 24,
    priceTzs: 2000,
    downloadSpeedMbps: 12,
    uploadSpeedMbps: 6,
    deviceLimit: 2,
    description: 'Intaneti ya kutwa nzima bila kikomo cha MB, vifaa hadi viwili.',
    isPopular: true
  },
  {
    id: 'pkg-7days',
    name: 'Wiki 1 (Siku 7)',
    durationHours: 168,
    priceTzs: 10000,
    downloadSpeedMbps: 16,
    uploadSpeedMbps: 8,
    deviceLimit: 2,
    description: 'Inafaa kwa wanaokaa hosteli, ofisi ndogo au wafanyabiashara madukani.'
  },
  {
    id: 'pkg-30days',
    name: 'Mwezi 1 (Siku 30 Unlimited)',
    durationHours: 720,
    priceTzs: 35000,
    downloadSpeedMbps: 25,
    uploadSpeedMbps: 12,
    deviceLimit: 3,
    description: 'Kasi ya juu ya kudumu, inafaa ofisi binafsi au matumizi ya nyumbani.'
  }
]

const INITIAL_ROUTERS: HotspotRouter[] = [
  {
    id: 'rtr-1',
    name: 'MikroTik CCR2004 — Kariakoo Commercial Mall',
    location: 'Kariakoo, Dar es Salaam',
    model: 'MikroTik CCR2004-1G-12S+2XS (RouterOS v7.14)',
    brand: 'MikroTik',
    ip: '192.0.2.10',
    status: 'online',
    activeUsers: 142,
    totalRevenueToday: 384500,
    cpuUsage: 16,
    uptime: '48 days, 14 hrs',
    interface: 'sfp-plus1'
  },
  {
    id: 'rtr-2',
    name: 'MikroTik hEX — Sinza Hostel & Executive Lounge',
    location: 'Sinza Kwaremi, Dar es Salaam',
    model: 'MikroTik RB750Gr3 (RouterOS v7.14)',
    brand: 'MikroTik',
    ip: '192.0.2.11',
    status: 'online',
    activeUsers: 38,
    totalRevenueToday: 112000,
    cpuUsage: 22,
    uptime: '19 days, 06 hrs',
    interface: 'ether1-WAN'
  },
  {
    id: 'rtr-3',
    name: 'UniFi U6 Enterprise — Mlimani Campus Hub',
    location: 'Mlimani City Area, Dar es Salaam',
    model: 'UniFi Cloud Gateway Ultra + U6 AP',
    brand: 'Ubiquiti UniFi',
    ip: '192.0.2.12',
    status: 'online',
    activeUsers: 64,
    totalRevenueToday: 198000,
    cpuUsage: 11,
    uptime: '31 days, 22 hrs',
    interface: 'eth0'
  },
  {
    id: 'rtr-4',
    name: 'TP-Link Omada ER605 — Arusha Safari Lounge',
    location: 'Clock Tower, Arusha',
    model: 'TP-Link Omada ER605 Gigabit Router',
    brand: 'TP-Link Omada',
    ip: '192.0.2.13',
    status: 'online',
    activeUsers: 29,
    totalRevenueToday: 87000,
    cpuUsage: 14,
    uptime: '12 days, 04 hrs',
    interface: 'WAN1'
  }
]

const INITIAL_TRANSACTIONS: PaymentTransaction[] = [
  {
    id: 'tx-101',
    receiptNumber: 'ALTA-MP-89472619',
    customerPhone: '0754 *** 819',
    method: 'M-PESA',
    amountTzs: 2000,
    packageName: 'Siku 1 Nzima (24 Hrs)',
    routerName: 'MikroTik CCR2004 — Kariakoo Mall',
    timestamp: '2026-11-02 17:14:22',
    status: 'DEMO'
  },
  {
    id: 'tx-102',
    receiptNumber: 'ALTA-TP-44918230',
    customerPhone: '0713 *** 204',
    method: 'TIGO PESA',
    amountTzs: 1000,
    packageName: 'Masaa 3 Kasi Zaidi',
    routerName: 'MikroTik hEX — Sinza Hostel',
    timestamp: '2026-11-02 17:11:05',
    status: 'DEMO'
  },
  {
    id: 'tx-103',
    receiptNumber: 'ALTA-AM-90182411',
    customerPhone: '0789 *** 661',
    method: 'AIRTEL MONEY',
    amountTzs: 500,
    packageName: 'Dakika 60 (Saa 1)',
    routerName: 'UniFi U6 — Mlimani Campus Hub',
    timestamp: '2026-11-02 17:08:44',
    status: 'DEMO'
  },
  {
    id: 'tx-104',
    receiptNumber: 'ALTA-VCH-782194',
    customerPhone: 'Cash Voucher Sold',
    method: 'CASH VOUCHER',
    amountTzs: 2000,
    packageName: 'Siku 1 Nzima (24 Hrs)',
    routerName: 'MikroTik CCR2004 — Kariakoo Mall',
    timestamp: '2026-11-02 17:01:10',
    status: 'DEMO'
  },
  {
    id: 'tx-105',
    receiptNumber: 'ALTA-HP-18928394',
    customerPhone: '0621 *** 945',
    method: 'HALOPESA',
    amountTzs: 10000,
    packageName: 'Wiki 1 (Siku 7)',
    routerName: 'MikroTik hEX — Sinza Hostel',
    timestamp: '2026-11-02 16:48:30',
    status: 'DEMO'
  }
]

const INITIAL_AGENTS: Agent[] = [
  {
    id: 'ag-1',
    name: 'Kariakoo Stationery & Cyber Shop',
    location: 'Kariakoo Msimbazi, Dar es Salaam',
    phone: 'DEMO-AGENT-001',
    commissionRate: 10,
    vouchersSold: 284,
    totalEarnedTzs: 56800,
    balanceTzs: 14200,
    status: 'active'
  },
  {
    id: 'ag-2',
    name: 'Sinza Hostel Reception Desk',
    location: 'Sinza Kwaremi, Dar es Salaam',
    phone: 'DEMO-AGENT-002',
    commissionRate: 12,
    vouchersSold: 140,
    totalEarnedTzs: 28000,
    balanceTzs: 8400,
    status: 'active'
  },
  {
    id: 'ag-3',
    name: 'Mlimani Student Canteen Cashier',
    location: 'Mlimani Campus Gate, Dar es Salaam',
    phone: 'DEMO-AGENT-003',
    commissionRate: 10,
    vouchersSold: 98,
    totalEarnedTzs: 19600,
    balanceTzs: 19600,
    status: 'active'
  }
]

export default function AltavoxWifiStandalonePortal() {
  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'routers'
    | 'topology'
    | 'packages'
    | 'vouchers'
    | 'print-station'
    | 'transactions'
    | 'agents'
    | 'sms-whatsapp'
    | 'reports'
    | 'portal-demo'
    | 'settings'
  >('overview')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  // Live Client Sessions Inspector State
  const [clientSessionsModalOpen, setClientSessionsModalOpen] = useState(false)
  const [selectedRouterForClients, setSelectedRouterForClients] = useState<HotspotRouter | null>(null)

  // Data states
  const [packages, setPackages] = useState<WifiPackage[]>(INITIAL_PACKAGES)
  const [routers, setRouters] = useState<HotspotRouter[]>(INITIAL_ROUTERS)
  const [transactions, setTransactions] = useState<PaymentTransaction[]>(INITIAL_TRANSACTIONS)
  const [agents, setAgents] = useState<Agent[]>(INITIAL_AGENTS)
  const [vouchers, setVouchers] = useState<Voucher[]>([
    { code: 'ALTA-8492-9102', packageId: 'pkg-24hr', packageName: 'Siku 1 Nzima (24 Hrs)', priceTzs: 2000, durationHours: 24, status: 'unused', createdAt: '2026-11-02 14:00', agentName: 'Kariakoo Stationery & Cyber Shop' },
    { code: 'ALTA-3310-8841', packageId: 'pkg-24hr', packageName: 'Siku 1 Nzima (24 Hrs)', priceTzs: 2000, durationHours: 24, status: 'active', createdAt: '2026-11-02 15:30', usedByMac: '4C:EB:D6:33:11:09', expiresAt: '2026-11-03 15:30' },
    { code: 'ALTA-1109-7723', packageId: 'pkg-3hr', packageName: 'Masaa 3 Kasi Zaidi', priceTzs: 1000, durationHours: 3, status: 'unused', createdAt: '2026-11-02 14:00', agentName: 'Sinza Hostel Reception Desk' },
    { code: 'ALTA-9984-2120', packageId: 'pkg-1hr', packageName: 'Dakika 60 (Saa 1)', priceTzs: 500, durationHours: 1, status: 'expired', createdAt: '2026-11-02 10:00' }
  ])

  // Router Modal / Script Generator & Read Diagnostics
  const [selectedRouterForScript, setSelectedRouterForScript] = useState<HotspotRouter | null>(INITIAL_ROUTERS[0])
  const [scriptModalOpen, setScriptModalOpen] = useState(false)
  const [copiedScript, setCopiedScript] = useState(false)
  const [scriptType, setScriptType] = useState<'read-diagnostics' | 'setup' | 'sync-vouchers' | 'rollback'>('read-diagnostics')
  const [routerOsVersion, setRouterOsVersion] = useState<'v7' | 'v6'>('v7')

  // Print Station View & Alignment Verification States
  const [printViewMode, setPrintViewMode] = useState<'layout' | 'list'>('layout')
  const [printPaperFormat, setPrintPaperFormat] = useState<'a4-grid' | 'pos-receipt'>('a4-grid')
  const [printShowCutGuides, setPrintShowCutGuides] = useState(true)
  const [printFilterPackage, setPrintFilterPackage] = useState<string>('all')
  const [selectedVoucherCodesForPrint, setSelectedVoucherCodesForPrint] = useState<string[]>([])

  // Voucher Generator Form State
  const [voucherQty, setVoucherQty] = useState(10)
  const [voucherSelectedPkg, setVoucherSelectedPkg] = useState('pkg-24hr')
  const [voucherPrefix, setVoucherPrefix] = useState('ALTA')
  const [voucherNotice, setVoucherNotice] = useState('')

  // Captive Portal Simulation State
  const [portalSelectedPkg, setPortalSelectedPkg] = useState<string>('pkg-24hr')
  const [portalPaymentMethod, setPortalPaymentMethod] = useState<'mpesa' | 'tigo' | 'airtel' | 'halopesa' | 'voucher'>('mpesa')
  const [portalPhone, setPortalPhone] = useState('')
  const [portalVoucherInput, setPortalVoucherInput] = useState('')
  const [portalSimState, setPortalSimState] = useState<'idle' | 'prompting' | 'demo-completed'>('idle')
  const [portalMessage, setPortalMessage] = useState('')

  // Settings State (Direct Mobile Money Setup)
  const [mpesaTill, setMpesaTill] = useState('')
  const [tigoTill, setTigoTill] = useState('')
  const [airtelPaybill, setAirtelPaybill] = useState('')
  const [businessName, setBusinessName] = useState('Altavox WiFi Networks TZ')
  const [supportPhone, setSupportPhone] = useState('+255 750 227 073')
  const [smsGatewayEnabled, setSmsGatewayEnabled] = useState(false)
  const [smsSenderId, setSmsSenderId] = useState('ALTAVOX')
  const [whatsappAlertsEnabled, setWhatsappAlertsEnabled] = useState(false)
  const [expiryReminderMinutes, setExpiryReminderMinutes] = useState(15)

  // Financial Summary
  const totalRevenueToday = useMemo(() => {
    return transactions.reduce((acc, curr) => acc + curr.amountTzs, 0)
  }, [transactions])

  const totalActiveUsers = useMemo(() => {
    return routers.reduce((acc, curr) => acc + curr.activeUsers, 0)
  }, [routers])

  // Generate collision-checked voucher batches for the current local demo.
  const handleGenerateVouchers = () => {
    const pkg = packages.find((item) => item.id === voucherSelectedPkg)
    const prefix = voucherPrefix.trim().toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8)
    if (!pkg || !prefix) {
      setVoucherNotice('Chagua kifurushi na weka prefix ya herufi/namba kabla ya kuzalisha.')
      return
    }

    try {
      const usedCodes = new Set(vouchers.map((voucher) => voucher.code))
      const newVouchers: Voucher[] = []
      const values = new Uint32Array(1)
      const range = 2 ** 32
      const limit = Math.floor(range / 9000) * 9000
      const randomSegment = () => {
        do {
          window.crypto.getRandomValues(values)
        } while (values[0] >= limit)
        return 1000 + (values[0] % 9000)
      }

      for (let index = 0; index < voucherQty; index++) {
        let code = ''
        let attempts = 0
        do {
          code = `${prefix}-${randomSegment()}-${randomSegment()}`
          attempts += 1
        } while (usedCodes.has(code) && attempts < 20)
        if (usedCodes.has(code)) throw new Error('Could not create a unique voucher code.')
        usedCodes.add(code)
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

      setVouchers((current) => [...newVouchers, ...current])
      setVoucherNotice(`${newVouchers.length} vocha salama zimetengenezwa kwenye demo hii. Pakua CSV kuzihifadhi; data ya ukurasa haisawazishwi kwenye router.`)
    } catch {
      setVoucherNotice('Kizalishaji salama hakipatikani kwenye kivinjari hiki; hakuna vocha iliyozalishwa.')
    }
  }

  const handleExportVouchers = () => {
    const quote = (value: string | number) => `"${String(value).replace(/"/g, '""')}"`
    const rows = [
      ['voucher_code', 'package', 'price_tzs', 'duration_hours', 'status', 'created_at'],
      ...vouchers.map((voucher) => [voucher.code, voucher.packageName, voucher.priceTzs, voucher.durationHours, voucher.status, voucher.createdAt])
    ]
    const csv = [String.fromCharCode(0xfeff), rows.map((row) => row.map(quote).join(',')).join(String.fromCharCode(13, 10))].join('')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `altavox-wifi-vouchers-demo-${new Date().toISOString().slice(0, 10)}.csv`
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
    window.setTimeout(() => URL.revokeObjectURL(url), 0)
    setVoucherNotice('CSV imepakuliwa. Hifadhi faili hii nje ya demo kabla ya kufunga ukurasa.')
  }

  // Handle Captive Portal Payment Simulation
  const handleSimulatePortalPayment = (e: React.FormEvent) => {
    e.preventDefault()
    setPortalSimState('prompting')

    if (portalPaymentMethod === 'voucher') {
      const found = vouchers.find((v) => v.code.trim().toUpperCase() === portalVoucherInput.trim().toUpperCase())
      setTimeout(() => {
        if (found && found.status === 'unused') {
          const expiresAt = new Date(Date.now() + found.durationHours * 60 * 60 * 1000).toLocaleString('sw-TZ')
          setVouchers((current) => current.map((voucher) => voucher.code === found.code
            ? { ...voucher, status: 'active', usedByMac: 'DEMO-CLIENT', expiresAt }
            : voucher))
          setPortalSimState('demo-completed')
          setPortalMessage(`Vocha imekubaliwa kwenye demo pekee (${found.packageName}). Hakuna RADIUS authentication au internet session iliyofunguliwa.`)
        } else if (found && found.status !== 'unused') {
          setPortalSimState('idle')
          alert(`Vocha hii tayari imeshatumika au muda wake umeisha. Jaribu vocha nyingine.`)
        } else {
          setPortalSimState('idle')
          alert(`Nambari ya vocha si sahihi. Mfano wa vocha inayotumika: ${vouchers[0]?.code || 'ALTA-8492-9102'}`)
        }
      }, 1000)
      return
    }

    const selectedPkgObj = packages.find((p) => p.id === portalSelectedPkg) || packages[0]
    const methodLabel: PaymentTransaction['method'] = portalPaymentMethod === 'mpesa'
      ? 'M-PESA'
      : portalPaymentMethod === 'tigo'
        ? 'TIGO PESA'
        : portalPaymentMethod === 'airtel'
          ? 'AIRTEL MONEY'
          : 'HALOPESA'

    setTimeout(() => {
      const newTx: PaymentTransaction = {
        id: `demo-${Date.now().toString(36)}`,
        receiptNumber: `DEMO-${Date.now().toString(36).toUpperCase()}`,
        customerPhone: portalPhone,
        method: methodLabel,
        amountTzs: selectedPkgObj.priceTzs,
        packageName: selectedPkgObj.name,
        routerName: routers[0].name,
        timestamp: new Date().toISOString().substring(0, 19).replace('T', ' '),
        status: 'DEMO'
      }

      setTransactions((prev) => [newTx, ...prev])
      setPortalSimState('demo-completed')
      setPortalMessage(`Simulasi ya ${methodLabel} kwa TZS ${selectedPkgObj.priceTzs.toLocaleString()} limekamilika. Hakuna payment request iliyotumwa, pesa iliyopokelewa au internet session iliyofunguliwa.`)
    }, 500)

  }

  // Pure Altavox Proprietary RouterOS Connector & Read Diagnostics Engine
  const routerSetupScript = useMemo(() => {
    if (!selectedRouterForScript) return ''

    const isMikrotik = selectedRouterForScript.brand === 'MikroTik'

    // 1. READ SCRIPTS (DIAGNOSTICS & STATUS MONITORING)
    if (scriptType === 'read-diagnostics') {
      if (isMikrotik) {
        return `# ==============================================================================
# ALTAVOX WIFI — SCRIPT ZA KUSOMA HALI YA ROUTER (READ & DIAGNOSTIC SCRIPTS)
# Kifaa: ${selectedRouterForScript.name} (IP: ${selectedRouterForScript.ip})
# Aina ya RouterOS: MikroTik ${routerOsVersion.toUpperCase()} | Mahali: ${selectedRouterForScript.location}
# ==============================================================================
# Hizi ni amri halisi za MikroTik RouterOS za KUSOMA (READ) data ya moja kwa moja.
# Unaweza kunakili amri hizi zote au moja moja na kuzibandika kwenye Terminal ya Winbox/SSH.

# ------------------------------------------------------------------------------
# 1. KUSOMA WATUMIAJI WOTE WALIO MTANDAONI SASA HIVI (READ ACTIVE USERS)
# ------------------------------------------------------------------------------
# Inasoma orodha ya kina ya vifaa vyote vilivyounganishwa kwenye Hotspot:
/ip hotspot active print detail

# Inasoma data (Bytes In & Bytes Out) zilizotumiwa na kila mtumiaji:
/ip hotspot active print stats

# Inasoma idadi kamili ya watumiaji pekee:
/ip hotspot active print count-only

# ------------------------------------------------------------------------------
# 2. KUSOMA RASILIMALI ZA MFUMO, MATUMIZI YA CPU NA UPTIME (READ SYSTEM HEALTH)
# ------------------------------------------------------------------------------
# Inasoma matumizi ya CPU, RAM iliyobaki, Uptime, na toleo la RouterOS:
/system resource print

# Inasoma joto (temperature) na voltage ya router (kama inasaidiwa):
/system health print

# Inasoma maelezo ya bodi ya RouterBOARD na namba ya usajili:
/system routerboard print

# ------------------------------------------------------------------------------
# 3. KUSOMA MAWASILIANO NA HALI YA ALTAVOX CLOUD RADIUS (READ RADIUS STATUS)
# ------------------------------------------------------------------------------
# Inasoma hali ya uhai wa server ya RADIUS (192.0.2.10):
/radius monitor numbers=0 once

# Inasoma maelezo kamili ya usanidi wa RADIUS:
/radius print detail

# Inasoma idadi ya maombi yaliyopokelewa na kukubaliwa (RADIUS counters):
/radius print stats

# ------------------------------------------------------------------------------
# 4. KUSOMA LOGI ZA MALIPO, WATEJA WANAOINGIA NA KUTOKA (READ HOTSPOT LOGS)
# ------------------------------------------------------------------------------
# Inasoma kumbukumbu za hivi karibuni za wateja walioingia kwenye Hotspot:
/log print where message~"hotspot" or topics~"hotspot"

# Inasoma matukio yanayohusu Altavox Cloud RADIUS:
/log print where message~"Altavox" or topics~"radius"

# Inasoma maonyo au makosa yaliyotokea hivi karibuni:
/log print where topics~"warning" or topics~"error"

# ------------------------------------------------------------------------------
# 5. KUSOMA KASI NA MATUMIZI YA BENDI KWA KILA MTEJA (READ BANDWIDTH QUEUES)
# ------------------------------------------------------------------------------
# Inasoma orodha ya foleni za bendi (Rate Limits) zilizotengenezwa na mfumo:
/queue simple print stats

# Inasoma foleni za wateja wa hotspot pekee (Dynamic Queues):
/queue simple print where dynamic=yes

# ------------------------------------------------------------------------------
# 6. KUSOMA ORODHA YA WALLED GARDEN (READ WHITELISTED PAYMENT PORTALS)
# ------------------------------------------------------------------------------
# Inasoma orodha ya tovuti za malipo (M-Pesa, Tigo, Airtel) zinazofunguka bure:
/ip hotspot walled-garden ip print
/ip hotspot walled-garden print

# ------------------------------------------------------------------------------
# 7. KUSOMA ANWANI ZA IP NA MAC ZILIZO KWENYE DHCP (READ DHCP CLIENT LEASES)
# ------------------------------------------------------------------------------
# Inasoma anwani za MAC na majina ya simu zilizopewa IP:
/ip dhcp-server lease print where status=bound

# Inasoma vifaa vilivyopewa ruhusa ya kudumu (Bypassed MACs):
/ip hotspot ip-binding print detail

# ------------------------------------------------------------------------------
# 8. KUSOMA VOCHA NA MUDA ULIOBAKI (READ VOUCHERS USAGE)
# ------------------------------------------------------------------------------
# Inasoma vocha zote zilizotumika na muda wao wa hewani:
/ip hotspot user print where uptime > 0s`
      } else {
        return `# ==============================================================================
# ALTAVOX WIFI — ${selectedRouterForScript.brand.toUpperCase()} READ & DIAGNOSTIC COMMANDS
# Router: ${selectedRouterForScript.name} (IP: ${selectedRouterForScript.ip})
# ==============================================================================
# SSH / Controller Diagnostic CLI Commands:

# 1. Read Active Hotspot Client Sessions:
mca-cli-op info
show guests active

# 2. Read RADIUS Authentication Test & Ping:
radtest altavox_test REPLACE_WITH_UNIQUE_RADIUS_SECRET 192.0.2.10:1812 0 REPLACE_WITH_UNIQUE_RADIUS_SECRET

# 3. Read System Load & Memory:
uptime
cat /proc/meminfo
top -b -n 1 | head -n 20

# 4. Read DHCP Leases & Connected MAC Addresses:
cat /config/dhcpd.leases
arp -a`
      }
    }

    // 2. VOUCHER LOCAL SYNC SCRIPT
    if (scriptType === 'sync-vouchers') {
      if (isMikrotik) {
        return `# ==============================================================================
# ALTAVOX WIFI — LOCAL VOUCHER SYNC SCRIPT (RouterOS ${routerOsVersion.toUpperCase()})
# Router: ${selectedRouterForScript.name}
# Inapakia vocha za ndani ili zifanye kazi hata mtandao wa nje ukikatika
# ==============================================================================

/ip hotspot user
${vouchers
  .slice(0, 20)
  .map(
    (v) =>
      `add name="${v.code}" password="${v.code}" profile="default" limit-uptime=${v.durationHours}h comment="Altavox Voucher: ${v.packageName} - TZS ${v.priceTzs}"`
  )
  .join('\n')}

/log info message="Altavox WiFi demo voucher template executed; verify router records manually."`
      } else {
        return `# Vocha zinasawazishwa kwa njia ya Cloud RADIUS moja kwa moja kwenye ${selectedRouterForScript.brand}.`
      }
    }

    // Broad rollback scripts are withheld because the demo cannot verify a router's existing configuration.
    if (scriptType === 'rollback') {
      return `# ROLLBACK NOT GENERATED IN DEMO MODE
# Take a verified backup, identify only the exact objects created for this deployment,
# and have the network owner review a recovery plan during an approved maintenance window.
# This preview has no device connection and will not modify a router.`
    }

    // 4. DEFAULT: FULL READY DEPLOYMENT SCRIPT (SETUP)
    if (isMikrotik) {
      return `# ==============================================================================
# ALTAVOX WIFI — STANDALONE CLOUD HOTSPOT CONNECTOR ENGINE (RouterOS ${routerOsVersion.toUpperCase()})
# Router: ${selectedRouterForScript.name} (IP: ${selectedRouterForScript.ip})
# Operator: ${businessName}
# Direct Money Settlement: M-Pesa Till ${mpesaTill} | Tigo Pesa ${tigoTill} | Airtel ${airtelPaybill}
# ==============================================================================

# 1. SYSTEM IDENTITY & CLOUD DNS RESOLVER
/system identity set name="Altavox-WiFi-${selectedRouterForScript.id}"
/ip dns set allow-remote-requests=yes servers=8.8.8.8,1.1.1.1

# 2. CLOUD WALLED GARDEN (MOBILE MONEY IPN & REDIRECTION)
# Inaruhusu wateja kulipia kabla ya kuunganishwa mtandaoni
/ip hotspot walled-garden ip
add action=accept dst-host="*.altavox.space" comment="Altavox WiFi Cloud Core Portal"
add action=accept dst-host="*.altavoxwifi.com" comment="Altavox Portal API Services"
add action=accept dst-host="*.vodacom.co.tz" comment="Vodacom M-Pesa Push Gateway"
add action=accept dst-host="*.tigo.co.tz" comment="Tigo Pesa Mixx Gateway"
add action=accept dst-host="*.airtel.co.tz" comment="Airtel Money Tanzania"
add action=accept dst-host="*.halotel.co.tz" comment="HaloPesa Gateway"
add action=accept dst-address=192.0.2.10 comment="Altavox Dedicated RADIUS IP"

# 3. ALTAVOX CLOUD RADIUS AAA (AUTHENTICATION & ACCOUNTING)
/radius
add address=192.0.2.10 secret="REPLACE_WITH_UNIQUE_RADIUS_SECRET" service=hotspot \\
    authentication-port=1812 accounting-port=1813 timeout=3000ms \\
    comment="Altavox Cloud RADIUS AAA"

# 4. HOTSPOT SERVER & USER PROFILE INTEGRATION
/ip hotspot profile
set [ find default=yes ] use-radius=yes radius-accounting=yes \\
    radius-interim-update=2m radius-location-name="Altavox-${selectedRouterForScript.id}" \\
    login-by=http-chap,mac-cookie mac-cookie-timeout=7d \\
    html-directory=hotspot

/ip hotspot user profile
set [ find default=yes ] keepalive-timeout=2m shared-users=1 \\
    status-autorefresh=1m transparent-proxy=no

# 5. AUTOMATIC TELEMETRY WATCHDOG & HEARTBEAT SCRIPT
/system script
add dont-require-permissions=no name="Altavox-Cloud-Heartbeat" owner=admin policy=\\
    ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon source=\\
    ":local uptime [/system resource get uptime];\\r\\
    \\n:local cpu [/system resource get cpu-load];\\r\\
    \\n:log info (\\"[Altavox WiFi] Telemetry Heartbeat OK - CPU: \\" . \\$cpu . \\"% Uptime: \\" . \\$uptime);"

/system scheduler
add interval=2m name="Altavox-Heartbeat-Schedule" on-event="Altavox-Cloud-Heartbeat" \\
    policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon start-time=startup

# 6. HARDENED REAL-TIME QUEUE SYNC API LISTENER (PORT 8729 SSL)
/ip service set api-ssl port=8729 disabled=no comment="Altavox Real-Time Sync"

/log info message="✓ Altavox WiFi Standalone Hotspot Cloud Connector Successfully Initialized!"`
    } else {
      return `# ==============================================================================
# ALTAVOX WIFI — ${selectedRouterForScript.brand.toUpperCase()} CLOUD RADIUS INTEGRATION
# Router: ${selectedRouterForScript.name}
# ==============================================================================
RADIUS Authentication Server IP: 192.0.2.10
Port: 1812
RADIUS Accounting Server IP: 192.0.2.10
Port: 1813
Shared Secret: REPLACE_WITH_UNIQUE_RADIUS_SECRET
Captive Portal Redirection URL: https://wifi.altavox.space/guest/s/portal/
Walled Garden Whitelist: *.altavox.space, *.vodacom.co.tz, *.tigo.co.tz, *.airtel.co.tz`
    }
  }, [selectedRouterForScript, businessName, mpesaTill, tigoTill, airtelPaybill, scriptType, routerOsVersion, vouchers])

  // Download .rsc script file directly
  const handleDownloadRscFile = () => {
    const blob = new Blob([routerSetupScript], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    const safeName = (selectedRouterForScript?.name || 'router').toLowerCase().replace(/[^a-z0-9]/g, '_')
    link.download = `altavox_${safeName}_${scriptType}.rsc`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  // Export only the local illustrative records with explicit demo provenance.
  const exportFinancialReport = () => {
    const rows: Array<Array<string | number>> = [
      ['Report mode', 'DEMO SAMPLE · NOT VERIFIED SALES'],
      ['Receipt', 'CustomerPhone', 'Method', 'Amount_TZS', 'Package', 'Router', 'Timestamp', 'Status'],
      ...transactions.map((tx) => [tx.receiptNumber, tx.customerPhone, tx.method, tx.amountTzs, tx.packageName, tx.routerName, tx.timestamp, tx.status])
    ]
    const csv = [String.fromCharCode(0xfeff), rows.map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(',')).join(String.fromCharCode(13, 10))].join('')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `altavox_wifi_demo_report_${new Date().toISOString().slice(0, 10)}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.setTimeout(() => URL.revokeObjectURL(url), 0)
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-[#f26522] selection:text-white">
      
      {/* ================================================================== */}
      {/* STANDALONE DEDICATED TOP APP BAR (INDEPENDENT FROM MAIN SITE) */}
      {/* ================================================================== */}
      <header className="bg-[#041221] border-b border-white/10 px-4 sm:px-6 py-3 shrink-0 sticky top-0 z-40 backdrop-blur-md">
        <div className="flex items-center justify-between gap-4">
          
          {/* Left: Brand & Mobile Menu */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label={mobileSidebarOpen ? 'Close WiFi navigation' : 'Open WiFi navigation'}
              aria-expanded={mobileSidebarOpen}
              aria-controls="wifi-mobile-navigation"
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white cursor-pointer"
            >
              <Menu className="size-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-[#f26522] text-white shadow-lg shadow-orange-500/20">
                <Wifi className="size-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-lg font-black tracking-tight text-white whitespace-nowrap">
                    ALTAVOX <span className="text-[#f26522]">WIFI</span>
                  </span>
                    <span className="hidden sm:inline-flex text-[10px] font-mono bg-amber-500/15 text-amber-200 border border-amber-500/30 px-2 py-0.5 rounded font-bold">
                      DEMO · SAMPLE DATA
                    </span>
                </div>
                <div className="text-[11px] text-slate-400 font-medium truncate max-w-[180px] sm:max-w-xs">
                  {businessName}
                </div>
              </div>
            </div>
          </div>

          {/* Center: Sample Financials & Fleet Ticker */}
          <div className="hidden xl:flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3.5 py-1.5">
              <span className="size-2 rounded-full bg-emerald-400" />
              <span className="text-slate-400">Mapato ya Leo:</span>
              <span className="font-bold text-emerald-400">TZS {totalRevenueToday.toLocaleString()}</span>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3.5 py-1.5">
              <Users className="size-3.5 text-orange-400" />
              <span className="text-slate-400">Waliounganishwa:</span>
              <span className="font-bold text-white">{totalActiveUsers} Vifaa</span>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3.5 py-1.5">
              <Router className="size-3.5 text-blue-400" />
              <span className="text-slate-400">Router Fleet:</span>
              <span className="font-bold text-emerald-400">{routers.length} Online</span>
            </div>
          </div>

          {/* Right: Mode Switcher & Exit Link */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setActiveTab(activeTab === 'portal-demo' ? 'overview' : 'portal-demo')}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3 sm:px-4 py-2 text-xs font-bold transition shadow-sm cursor-pointer ${
                activeTab === 'portal-demo'
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-[#f26522] text-white hover:bg-[#e05312]'
              }`}
            >
              <Smartphone className="size-3.5" />
              <span className="hidden sm:inline">
                {activeTab === 'portal-demo' ? 'Rudi Kwenye Dashibodi' : 'Fungua Splash Page Demo'}
              </span>
              <span className="sm:hidden">Splash Demo</span>
            </button>

            {/* Link back to Main Altavox Tech corporate site */}
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
              title="Rudi kwenye tovuti kuu ya Altavox Tech"
            >
              <ArrowLeft className="size-3.5 text-[#f26522]" />
              <span className="hidden md:inline">Tovuti Kuu</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ================================================================== */}
      {/* STANDALONE PORTAL BODY (SIDEBAR + WORKSPACE) */}
      {/* ================================================================== */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Desktop Left Sidebar */}
        <aside
          className={`hidden lg:flex flex-col bg-[#05162a] border-r border-white/10 transition-all duration-200 shrink-0 ${
            sidebarCollapsed ? 'w-20' : 'w-64'
          }`}
        >
          {/* Operator Profile Widget */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-xl bg-[#07294d] border border-white/10 flex items-center justify-center text-[#f26522] font-black text-sm shrink-0">
                AV
              </div>
              {!sidebarCollapsed && (
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white truncate">Altavox WiFi NOC</div>
                  <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-emerald-400" />
                    <span>Msimamizi wa Mtandao</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Complete Navigation Items matching full Hotspot SaaS suite */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
            {[
              { id: 'overview', label: 'Dashboard (Muhtasari)', icon: LayoutDashboard },
              { id: 'routers', label: 'Vipanga Njia (Routers)', icon: Router, count: routers.length },
              { id: 'topology', label: 'Ramani ya Mtandao (NOC)', icon: Radio },
              { id: 'packages', label: 'Vifurushi vya WiFi', icon: Zap, count: packages.length },
              { id: 'vouchers', label: 'Vocha za Karatasi', icon: Ticket },
              { id: 'print-station', label: 'Kituo cha Kuchapisha', icon: Printer },
              { id: 'transactions', label: 'Miamala ya Malipo', icon: DollarSign, count: transactions.length },
              { id: 'agents', label: 'Mawakala & Resellers', icon: Briefcase, count: agents.length },
              { id: 'sms-whatsapp', label: 'SMS & WhatsApp Alerts', icon: MessageSquare },
              { id: 'reports', label: 'Ripoti & Uhasibu', icon: BarChart3 },
              { id: 'portal-demo', label: 'Captive Portal (Simu)', icon: Smartphone },
              { id: 'settings', label: 'Mipangilio ya Lipa Namba', icon: Settings }
            ].map((item) => {
              const Icon = item.icon
              const isSelected = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    isSelected
                      ? 'bg-[#f26522] text-white shadow-md shadow-orange-500/20'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <Icon className="size-4 shrink-0" />
                  {!sidebarCollapsed && (
                    <div className="flex-1 flex items-center justify-between text-left">
                      <span>{item.label}</span>
                      {item.count !== undefined && (
                        <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-white/10 text-slate-400'
                        }`}>
                          {item.count}
                        </span>
                      )}
                    </div>
                  )}
                </button>
              )
            })}
          </nav>

          {/* Direct Settlement Guarantee Notice */}
          {!sidebarCollapsed && (
            <div className="p-4 m-3 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-2">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <Shield className="size-3.5" />
                <span>Demo mode · malipo hayajaunganishwa</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Sandbox hii haiunganishi malipo. Settlement ya moja kwa moja itahitaji gateway halisi iliyosanidiwa na kuthibitishwa.
              </p>
            </div>
          )}

          {/* Bottom Sidebar Collapse Toggle */}
          <div className="p-3 border-t border-white/10">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-xs font-mono flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <span>{sidebarCollapsed ? '→' : '← Punguza Menyu'}</span>
            </button>
          </div>
        </aside>

        {/* Mobile Flyout Drawer */}
        {mobileSidebarOpen && (
          <div id="wifi-mobile-navigation" className="lg:hidden fixed inset-0 z-50 flex">
            <div
              className="fixed inset-0 bg-black/70 backdrop-blur-xs"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative w-72 bg-[#05162a] border-r border-white/10 p-5 flex flex-col z-10 text-white">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-[#f26522] text-white">
                    <Wifi className="size-4" />
                  </div>
                  <span className="font-black text-sm">ALTAVOX WIFI</span>
                </div>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1.5 rounded-lg bg-white/10 text-slate-300 cursor-pointer"
                >
                  <X className="size-4" />
                </button>
              </div>

              <nav className="flex-1 space-y-1 overflow-y-auto">
                {[
                  { id: 'overview', label: 'Dashboard (Muhtasari)', icon: LayoutDashboard },
                  { id: 'routers', label: 'Vipanga Njia (Routers)', icon: Router },
                  { id: 'topology', label: 'Ramani ya Mtandao (NOC)', icon: Radio },
                  { id: 'packages', label: 'Vifurushi vya WiFi', icon: Zap },
                  { id: 'vouchers', label: 'Vocha za Karatasi', icon: Ticket },
                  { id: 'print-station', label: 'Kituo cha Kuchapisha', icon: Printer },
                  { id: 'transactions', label: 'Miamala ya Malipo', icon: DollarSign },
                  { id: 'agents', label: 'Mawakala & Resellers', icon: Briefcase },
                  { id: 'sms-whatsapp', label: 'SMS & WhatsApp Alerts', icon: MessageSquare },
                  { id: 'reports', label: 'Ripoti & Uhasibu', icon: BarChart3 },
                  { id: 'portal-demo', label: 'Captive Portal (Simu)', icon: Smartphone },
                  { id: 'settings', label: 'Mipangilio ya Lipa Namba', icon: Settings }
                ].map((item) => {
                  const Icon = item.icon
                  const isSelected = activeTab === item.id
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id as any)
                        setMobileSidebarOpen(false)
                      }}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                        isSelected
                          ? 'bg-[#f26522] text-white'
                          : 'text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      <Icon className="size-4" />
                      <span>{item.label}</span>
                    </button>
                  )
                })}
              </nav>

              <div className="pt-4 border-t border-white/10">
                <Link
                  href="/"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/10 text-xs font-bold text-white hover:bg-white/20 transition"
                >
                  <ArrowLeft className="size-3.5 text-[#f26522]" />
                  <span>Rudi Kwenye Tovuti Kuu</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Central Workspace Canvas */}
        <main className="flex-1 overflow-y-auto bg-slate-900 p-4 sm:p-6 lg:p-8">
            <div className="max-w-6xl mx-auto space-y-6">
              <div role="status" className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs leading-relaxed text-amber-100">
                <strong className="font-bold">DEMO SANDBOX:</strong> Router, session, payment, revenue and telemetry figures are illustrative sample data. Controls update this browser preview only; no router, RADIUS, payment, SMS or WhatsApp service is connected.
              </div>

            {/* ============================================================ */}
            {/* WORKSPACE VIEW 1: DASHBOARD OVERVIEW */}
            {/* ============================================================ */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Metric Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Revenue Card */}
                  <div className="rounded-2xl border border-white/10 bg-[#072444] p-5 shadow-lg">
                    <div className="flex items-center justify-between text-slate-400 mb-2">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider">Mapato ya Demo (sample)</span>
                      <span className="flex size-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        <DollarSign className="size-4" />
                      </span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-white">
                      TZS {totalRevenueToday.toLocaleString()}
                    </div>
                    <div className="mt-2 text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                      <TrendingUp className="size-3" />
                      <span>Demo values · no payment received</span>
                    </div>
                  </div>

                  {/* Connected Devices */}
                  <div className="rounded-2xl border border-white/10 bg-[#072444] p-5 shadow-lg">
                    <div className="flex items-center justify-between text-slate-400 mb-2">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider">Sample connected devices</span>
                      <span className="flex size-8 items-center justify-center rounded-lg bg-orange-500/20 text-[#f26522] border border-orange-500/30">
                        <Users className="size-4" />
                      </span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-white">
                      {totalActiveUsers} Vifaa
                    </div>
                    <div className="mt-2 text-[11px] text-slate-400">
                      Kwenye router {routers.length} zinazofanya kazi
                    </div>
                  </div>

                  {/* Routers Status */}
                  <div className="rounded-2xl border border-white/10 bg-[#072444] p-5 shadow-lg">
                    <div className="flex items-center justify-between text-slate-400 mb-2">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider">Router Fleet</span>
                      <span className="flex size-8 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
                        <Router className="size-4" />
                      </span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-white">
                      {routers.filter((r) => r.status === 'online').length} / {routers.length} sample online
                    </div>
                    <div className="mt-2 text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="size-1.5 rounded-full bg-emerald-400" />
                      <span>Sample fleet · RADIUS not connected</span>
                    </div>
                  </div>

                  {/* Available Vouchers */}
                  <div className="rounded-2xl border border-white/10 bg-[#072444] p-5 shadow-lg">
                    <div className="flex items-center justify-between text-slate-400 mb-2">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider">Vocha Zilizopo</span>
                      <span className="flex size-8 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
                        <Ticket className="size-4" />
                      </span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-white">
                      {vouchers.filter((v) => v.status === 'unused').length} Vocha
                    </div>
                    <div className="mt-2 text-[11px] text-slate-400">
                      Tayari kuchapishwa au kuuzwa na mawakala
                    </div>
                  </div>
                </div>

                {/* D3.js sample analytics suite (synthetic preview data) */}
                <WifiD3Analytics />

                {/* Altavox AI Telemetry & Revenue Intelligence Advisor */}
                <WifiAiNetworkAdvisor />

                {/* Middle Grid: Routers Fleet + Recent Transactions */}
                <div className="grid lg:grid-cols-12 gap-6">
                  {/* Left: Router Health Fleet */}
                  <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#072444] p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                      <div>
                        <h3 className="text-base font-extrabold text-white">
                          Vipanga Njia vya Hotspot (MikroTik, UniFi, Omada)
                        </h3>
                        <p className="text-xs text-slate-400">
                          Router samples only; live Cloud RADIUS and REST API are not connected in this sandbox.
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveTab('routers')}
                        className="text-xs font-bold text-[#f26522] hover:underline cursor-pointer"
                      >
                        Dhibiti Zote →
                      </button>
                    </div>

                    <div className="space-y-3">
                      {routers.map((router) => (
                        <div
                          key={router.id}
                          className="rounded-xl border border-white/5 bg-white/5 p-4 hover:border-white/20 transition"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <span className="size-2 rounded-full bg-emerald-400 shrink-0" />
                              <div>
                                <h4 className="text-xs font-extrabold text-white">{router.name}</h4>
                                <p className="text-[11px] text-slate-400">{router.location}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 sm:gap-3 text-xs font-mono flex-wrap">
                              <div>
                                <span className="text-slate-500 text-[10px] block">Mauzo Leo</span>
                                <span className="font-bold text-emerald-400">TZS {router.totalRevenueToday.toLocaleString()}</span>
                              </div>
                              <button
                                onClick={() => {
                                  setSelectedRouterForClients(router)
                                  setClientSessionsModalOpen(true)
                                }}
                                className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 px-2 py-1 text-[11px] font-bold text-cyan-300 transition cursor-pointer flex items-center gap-1"
                                title="Chunguza wateja waliopo mtandaoni sasa"
                              >
                                <Users className="size-3 text-cyan-400" />
                                <span>{router.activeUsers} Wateja</span>
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedRouterForScript(router)
                                  setScriptType('read-diagnostics')
                                  setScriptModalOpen(true)
                                }}
                                className="rounded-lg border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-bold text-white hover:bg-white/20 transition cursor-pointer flex items-center gap-1"
                              >
                                <Terminal className="size-3 text-[#f26522]" />
                                <span>Script</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Sample Transaction Feed */}
                  <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#072444] p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                      <div>
                        <h3 className="text-base font-extrabold text-white">
                          Miamala ya Mfano (Demo)
                        </h3>
                        <p className="text-xs text-slate-400">
                          Sample transaction feed · no provider verification
                        </p>
                      </div>
                      <span className="flex size-2 rounded-full bg-emerald-400" />
                    </div>

                    <div className="divide-y divide-white/10">
                      {transactions.slice(0, 5).map((tx) => (
                        <div key={tx.id} className="py-3 flex items-center justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-xs text-white">{tx.customerPhone}</span>
                              <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                                tx.method === 'M-PESA' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                                tx.method === 'TIGO PESA' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                                tx.method === 'AIRTEL MONEY' ? 'bg-red-600/20 text-red-300 border border-red-600/30' :
                                'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              }`}>
                                {tx.method}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              {tx.packageName} · {tx.timestamp.substring(11)}
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="font-mono font-black text-xs text-emerald-400 block">
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
                      className="mt-4 w-full rounded-xl border border-white/10 bg-white/5 py-2.5 text-center text-xs font-bold text-white hover:bg-white/10 transition cursor-pointer"
                    >
                      Tazama Miamala Yote ({transactions.length})
                    </button>
                  </div>
                </div>

                {/* Standalone Guarantee Banner */}
                <div className="rounded-2xl bg-gradient-to-r from-[#07294d] via-[#09396b] to-[#051c36] text-white p-6 sm:p-8 shadow-xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 rounded-full bg-[#f26522]/20 border border-[#f26522]/40 px-3 py-1 text-xs font-mono text-orange-300">
                      <Shield className="size-3.5 text-[#f26522]" />
                      <span>Altavox Standalone Cloud Hotspot Engine</span>
                    </div>
                    <h4 className="text-xl font-black text-white">
                      Mfumo Unaomilikiwa na Wewe 100%
                    </h4>
                    <p className="text-xs text-slate-200 max-w-2xl leading-relaxed">
                      Altavox WiFi inafanya kazi kama mfumo unaojitegemea kikamilifu. Fedha zote za wateja zinaingia moja kwa moja kwenye namba yako ya Lipa Namba au Till bila makato yoyote kutoka kwetu.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                    <button
                      onClick={() => setActiveTab('settings')}
                      className="rounded-xl bg-[#f26522] px-5 py-3 text-xs font-bold text-white shadow-lg hover:bg-[#e05312] transition cursor-pointer"
                    >
                      Weka Namba za Malipo
                    </button>
                    <button
                      onClick={() => setActiveTab('portal-demo')}
                      className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-xs font-semibold text-white hover:bg-white/20 transition cursor-pointer"
                    >
                      Jaribu Splash Page
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* WORKSPACE VIEW 2: ROUTERS MANAGEMENT */}
            {/* ============================================================ */}
            {activeTab === 'routers' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#072444] p-6 rounded-2xl border border-white/10 shadow-lg">
                  <div>
                    <h3 className="text-xl font-black text-white">
                      Vipanga Njia vya Hotspot (Routers Fleet)
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">
                      Ongeza sample router card kwa mafunzo. Live connection inahitaji controller integration ambayo haijaunganishwa kwenye sandbox hii.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      const name = prompt('Weka jina la router mpya (Mfano: MikroTik hEX — Mbezi Beach Hub)')
                      if (name) {
                        const newRtr: HotspotRouter = {
                          id: `rtr-${Date.now().toString().slice(-3)}`,
                          name,
                          location: 'Tanzania Hotspot Node',
                          model: 'Sample MikroTik RouterOS v7.14',
                          brand: 'MikroTik',
                          ip: `192.0.2.${Math.min(200 + routers.length, 250)}`,
                          status: 'offline',
                          activeUsers: 0,
                          totalRevenueToday: 0,
                          cpuUsage: 8,
                          uptime: 'Not connected · demo',
                          interface: 'ether1'
                        }
                        setRouters([...routers, newRtr])
                        setSelectedRouterForScript(newRtr)
                        setScriptModalOpen(true)
                      }
                    }}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#f26522] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#e05312] transition shadow-md cursor-pointer"
                  >
                    <Plus className="size-4" />
                    <span>Ongeza Demo Router</span>
                  </button>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {routers.map((router) => (
                    <div
                      key={router.id}
                      className="rounded-2xl border border-white/10 bg-[#072444] p-6 shadow-lg flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-500/20 px-2.5 py-0.5 rounded border border-emerald-500/30 font-bold">
                            <span className="size-1.5 rounded-full bg-emerald-400" />
                            <span>Online</span>
                          </span>
                          <span className="font-mono text-xs text-slate-400">{router.ip}</span>
                        </div>

                        <h4 className="text-base font-extrabold text-white">{router.name}</h4>
                        <p className="text-xs text-slate-300 mt-1">{router.location}</p>
                        <p className="text-[11px] font-mono text-slate-400 mt-0.5">{router.model} · Brand: <strong className="text-orange-300">{router.brand}</strong></p>

                        <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/10 pt-4 text-xs">
                          <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                            <span className="text-slate-400 text-[10px] block">Wateja</span>
                            <span className="text-sm font-bold text-white">{router.activeUsers} Vifaa</span>
                          </div>
                          <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                            <span className="text-slate-400 text-[10px] block">Mauzo Leo</span>
                            <span className="text-sm font-bold text-emerald-400">TZS {router.totalRevenueToday.toLocaleString()}</span>
                          </div>
                        </div>

                        <div className="mt-3 text-[11px] text-slate-400 flex items-center justify-between">
                          <span>CPU: {router.cpuUsage}%</span>
                          <span>Sample uptime: {router.uptime}</span>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() => {
                            setSelectedRouterForClients(router)
                            setClientSessionsModalOpen(true)
                          }}
                          className="flex-1 rounded-xl bg-cyan-600/20 border border-cyan-500/30 py-2.5 text-center text-xs font-bold text-cyan-300 hover:bg-cyan-600/30 transition cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                        >
                          <Users className="size-3.5 text-cyan-400" />
                          <span>Chunguza Wateja ({router.activeUsers})</span>
                        </button>

                        <button
                          onClick={() => {
                            setSelectedRouterForScript(router)
                            setScriptType('read-diagnostics')
                            setScriptModalOpen(true)
                          }}
                          className="flex-1 rounded-xl bg-[#f26522] py-2.5 text-center text-xs font-bold text-white hover:bg-[#e05312] transition cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/20"
                        >
                          <Terminal className="size-3.5" />
                          <span>Setup & Read Scripts</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* WORKSPACE VIEW: LIVE NETWORK MESH TOPOLOGY & NOC */}
            {/* ============================================================ */}
            {activeTab === 'topology' && (
              <WifiMeshTopology />
            )}

            {/* ============================================================ */}
            {/* WORKSPACE VIEW 3: PACKAGES MANAGEMENT */}
            {/* ============================================================ */}
            {activeTab === 'packages' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#072444] p-6 rounded-2xl border border-white/10 shadow-lg">
                  <div>
                    <h3 className="text-xl font-black text-white">
                      Vifurushi vya WiFi & Bei (Packages)
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">
                      Vifurushi hivi vinaonekana moja kwa moja kwenye simu ya mteja (Splash Page) akijiunga na mtandao wako.
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
                          downloadSpeedMbps: 10,
                          uploadSpeedMbps: 5,
                          deviceLimit: 1,
                          description: 'Kifurushi kipya cha mtandao kilichosanidiwa na msimamizi.'
                        }
                        setPackages([...packages, newPkg])
                      }
                    }}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#f26522] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#e05312] transition shadow-md cursor-pointer"
                  >
                    <Plus className="size-4" />
                    <span>Ongeza Kifurushi Kipya</span>
                  </button>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className={`rounded-2xl border p-6 bg-[#072444] shadow-lg flex flex-col justify-between relative ${
                        pkg.isPopular ? 'border-[#f26522] ring-1 ring-[#f26522]/30' : 'border-white/10'
                      }`}
                    >
                      {pkg.isPopular && (
                        <span className="absolute -top-3 right-6 rounded-full bg-[#f26522] px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
                          Maarufu Zaidi
                        </span>
                      )}

                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-xs text-slate-400 font-bold">
                            {pkg.durationHours >= 24 ? `${pkg.durationHours / 24} Siku` : `${pkg.durationHours} Masaa`}
                          </span>
                          <span className="font-mono text-xl font-black text-emerald-400">
                            TZS {pkg.priceTzs.toLocaleString()}
                          </span>
                        </div>

                        <h4 className="text-lg font-black text-white mt-2">{pkg.name}</h4>
                        <p className="text-xs text-slate-300 mt-1">{pkg.description}</p>

                        <div className="mt-6 space-y-2 border-t border-white/10 pt-4 text-xs text-slate-300">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">Kasi ya Kushusha (Download):</span>
                            <span className="font-mono font-bold text-[#f26522]">{pkg.downloadSpeedMbps} Mbps</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">Kasi ya Kupakia (Upload):</span>
                            <span className="font-mono font-bold text-white">{pkg.uploadSpeedMbps} Mbps</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">Kikomo cha Vifaa:</span>
                            <span className="font-mono font-bold text-white">{pkg.deviceLimit} Kifaa</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                        <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="size-3" />
                          <span>Demo package · not deployed</span>
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

            {/* ============================================================ */}
            {/* WORKSPACE VIEW 4: VOUCHERS MANAGEMENT */}
            {/* ============================================================ */}
            {activeTab === 'vouchers' && (
              <div className="space-y-6">
                <div className="rounded-2xl border border-white/10 bg-[#072444] p-6 shadow-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
                    <div>
                      <h3 className="text-xl font-black text-white">
                        Zalisha Vocha za Demo (Cash Voucher Preview)
                      </h3>
                      <p className="text-xs text-slate-300 mt-1">
                        Kwa wateja wanaolipa pesa taslimu madukani au mikahawani. Chapisha na uuze mara moja.
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveTab('print-station')}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 border border-white/20 px-4 py-2 text-xs font-bold text-white hover:bg-white/20 transition cursor-pointer"
                    >
                      <Printer className="size-4 text-[#f26522]" />
                      <span>Fungua Kituo cha Kuchapisha</span>
                    </button>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Chagua Kifurushi cha Vocha
                      </label>
                      <select
                        value={voucherSelectedPkg}
                        onChange={(e) => setVoucherSelectedPkg(e.target.value)}
                        className="w-full rounded-xl border border-white/20 bg-slate-800 px-3 py-2 text-xs font-bold text-white focus:border-[#f26522] focus:outline-none"
                      >
                        {packages.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name} — TZS {p.priceTzs.toLocaleString()}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Idadi ya Vocha
                      </label>
                      <select
                        value={voucherQty}
                        onChange={(e) => setVoucherQty(Number(e.target.value))}
                        className="w-full rounded-xl border border-white/20 bg-slate-800 px-3 py-2 text-xs font-bold text-white focus:border-[#f26522] focus:outline-none"
                      >
                        <option value={10}>Vocha 10</option>
                        <option value={20}>Vocha 20</option>
                        <option value={50}>Vocha 50</option>
                        <option value={100}>Vocha 100</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Prefix ya Nambari
                      </label>
                      <input
                        type="text"
                        value={voucherPrefix}
                        onChange={(e) => setVoucherPrefix(e.target.value)}
                        className="w-full rounded-xl border border-white/20 bg-slate-800 px-3 py-2 text-xs font-bold text-white focus:border-[#f26522] focus:outline-none"
                      />
                    </div>
                  </div>

                  {voucherNotice && <p role="status" aria-live="polite" className="mt-4 rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-3 text-xs text-cyan-100">{voucherNotice}</p>}
                  <p className="mt-3 text-[11px] text-amber-200">Demo-only batch: codes are generated in memory, not synced to a router, and disappear when this page is refreshed. Export the CSV to keep a copy.</p>
                  <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
                    <button
                      onClick={handleGenerateVouchers}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#f26522] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#e05312] transition shadow-md cursor-pointer"
                    >
                      <Ticket className="size-4" />
                      <span>Zalisha Vocha za Demo {voucherQty}</span>
                    </button>
                  </div>
                </div>

                {/* Vouchers Table */}
                <div className="rounded-2xl border border-white/10 bg-[#072444] shadow-lg overflow-hidden">
                  <div className="p-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <h4 className="text-base font-extrabold text-white">Orodha ya Vocha za Demo ({vouchers.length})</h4>
                      <span className="text-xs text-slate-400">Bofya code kuinakili; export CSV kabla ya kufunga preview.</span>
                    </div>
                    <button type="button" onClick={handleExportVouchers} disabled={vouchers.length === 0} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 text-xs font-bold text-white hover:bg-white/15 disabled:opacity-50">
                      <FileSpreadsheet className="size-4 text-cyan-300" /> Export CSV
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-white/5 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 border-b border-white/10">
                          <th className="py-3 px-6">Nambari ya Vocha (Code)</th>
                          <th className="py-3 px-4">Kifurushi</th>
                          <th className="py-3 px-4">Bei</th>
                          <th className="py-3 px-4">Wakala (Agent)</th>
                          <th className="py-3 px-4">Hali</th>
                          <th className="py-3 px-4">Tarehe</th>
                          <th className="py-3 px-6 text-right">Kitendo</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {vouchers.map((v, i) => (
                          <tr key={i} className="hover:bg-white/5 transition">
                            <td className="py-3.5 px-6 font-mono font-black text-orange-400 text-sm">
                              {v.code}
                            </td>
                            <td className="py-3.5 px-4 font-semibold text-white">
                              {v.packageName}
                            </td>
                            <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">
                              TZS {v.priceTzs.toLocaleString()}
                            </td>
                            <td className="py-3.5 px-4 text-slate-300">
                              {v.agentName || 'Ofisi Kuu'}
                            </td>
                            <td className="py-3.5 px-4">
                              <span className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                                v.status === 'unused' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                                v.status === 'active' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                                'bg-slate-700 text-slate-400 border border-slate-600'
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
                                className="inline-flex items-center gap-1 rounded-lg bg-orange-500/20 px-2.5 py-1 text-[11px] font-bold text-orange-300 border border-orange-500/30 hover:bg-orange-500/30 transition cursor-pointer"
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

            {/* ============================================================ */}
            {/* WORKSPACE VIEW 5: PRINT STATION */}
            {/* ============================================================ */}
            {/* ============================================================ */}
            {/* WORKSPACE VIEW 5: PRINT STATION WITH LIST & PRINT-LAYOUT TOGGLE */}
            {/* ============================================================ */}
            {activeTab === 'print-station' && (() => {
              const filteredVouchers = vouchers.filter((v) => {
                if (printFilterPackage === 'all') return true
                return v.packageId === printFilterPackage
              })

              const displayVouchers = selectedVoucherCodesForPrint.length > 0
                ? filteredVouchers.filter((v) => selectedVoucherCodesForPrint.includes(v.code))
                : filteredVouchers

              const totalPrintValue = displayVouchers.reduce((acc, v) => acc + v.priceTzs, 0)

              const toggleSelectAll = () => {
                if (selectedVoucherCodesForPrint.length === filteredVouchers.length) {
                  setSelectedVoucherCodesForPrint([])
                } else {
                  setSelectedVoucherCodesForPrint(filteredVouchers.map((v) => v.code))
                }
              }

              const toggleSelectVoucher = (code: string) => {
                setSelectedVoucherCodesForPrint((prev) =>
                  prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
                )
              }

              return (
                <div className="space-y-6">
                  {/* Print Style Injections to ensure crisp output on paper */}
                  <style>{`
                    @media print {
                      body * {
                        visibility: hidden !important;
                      }
                      #altavox-printable-sheet, #altavox-printable-sheet * {
                        visibility: visible !important;
                      }
                      #altavox-printable-sheet {
                        position: absolute !important;
                        left: 0 !important;
                        top: 0 !important;
                        width: 100% !important;
                        margin: 0 !important;
                        padding: 10mm !important;
                        background: #ffffff !important;
                        color: #000000 !important;
                        box-shadow: none !important;
                        border: none !important;
                      }
                      .no-print {
                        display: none !important;
                      }
                    }
                  `}</style>

                  {/* Header & Controls Bar */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#072444] p-6 rounded-2xl border border-white/10 shadow-lg no-print">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="flex size-8 items-center justify-center rounded-xl bg-[#f26522] text-white">
                          <Printer className="size-4" />
                        </span>
                        <h3 className="text-xl font-black text-white">
                          Kituo cha Kuchapisha Vocha (Print Station)
                        </h3>
                        <span className="text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">
                          Alignment Verified
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1">
                        Hakiki mpangilio na unyoofu wa kadi kwenye karatasi ya printa kabla ya kutoa kopi.
                      </p>
                    </div>

                    {/* View Mode Toggle: List vs Visual Print Layout */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="flex items-center bg-[#041221] border border-white/15 p-1 rounded-xl">
                        <button
                          onClick={() => setPrintViewMode('layout')}
                          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                            printViewMode === 'layout'
                              ? 'bg-[#f26522] text-white shadow-md shadow-orange-500/20'
                              : 'text-slate-300 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <Grid className="size-3.5" />
                          <span>Visual Layout (Karatasi)</span>
                        </button>

                        <button
                          onClick={() => setPrintViewMode('list')}
                          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                            printViewMode === 'list'
                              ? 'bg-[#f26522] text-white shadow-md shadow-orange-500/20'
                              : 'text-slate-300 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <List className="size-3.5" />
                          <span>Orodha (List View)</span>
                        </button>
                      </div>

                      <button
                        onClick={() => window.print()}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 transition shadow-lg cursor-pointer"
                      >
                        <Printer className="size-4" />
                        <span>Print Vocha Hizi Sasa</span>
                      </button>
                    </div>
                  </div>

                  {/* Secondary Toolbar: Alignment Settings & Filter */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#051c33] border border-white/10 p-3 sm:px-5 rounded-2xl text-xs no-print">
                    <div className="flex items-center gap-3 flex-wrap">
                      {/* Package Filter */}
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <span className="text-[11px] font-mono text-slate-400">Kifurushi:</span>
                        <select
                          value={printFilterPackage}
                          onChange={(e) => setPrintFilterPackage(e.target.value)}
                          className="bg-slate-800 border border-white/15 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-[#f26522]"
                        >
                          <option value="all">Vifurushi Vyote ({vouchers.length})</option>
                          {packages.map((pkg) => (
                            <option key={pkg.id} value={pkg.id}>
                              {pkg.name} — TZS {pkg.priceTzs.toLocaleString()}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Paper format selector */}
                      <div className="flex items-center gap-1 bg-[#041221] border border-white/10 px-2 py-0.5 rounded-lg">
                        <span className="text-[10px] font-mono text-slate-400">Karatasi:</span>
                        <button
                          onClick={() => setPrintPaperFormat('a4-grid')}
                          className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                            printPaperFormat === 'a4-grid' ? 'text-[#f26522]' : 'text-slate-400'
                          }`}
                        >
                          A4 Sheet
                        </button>
                        <span className="text-white/20">|</span>
                        <button
                          onClick={() => setPrintPaperFormat('pos-receipt')}
                          className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                            printPaperFormat === 'pos-receipt' ? 'text-[#f26522]' : 'text-slate-400'
                          }`}
                        >
                          Thermal Roll
                        </button>
                      </div>

                      {/* Cut guides toggle */}
                      <button
                        onClick={() => setPrintShowCutGuides(!printShowCutGuides)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs transition cursor-pointer ${
                          printShowCutGuides
                            ? 'bg-orange-500/20 border-orange-500/40 text-orange-300'
                            : 'bg-white/5 border-white/10 text-slate-400'
                        }`}
                      >
                        <Scissors className="size-3.5" />
                        <span>Mistari ya Kukata (Cut Marks): {printShowCutGuides ? 'Washa' : 'Zima'}</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-slate-300 text-xs font-mono self-end sm:self-auto">
                      <span className="text-emerald-400 font-bold">
                        {displayVouchers.length} Kadi Zilizochaguliwa
                      </span>
                      <span>·</span>
                      <span className="text-white font-black">
                        TZS {totalPrintValue.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* ========================================================= */}
                  {/* MODE 1: VISUAL PRINT-LAYOUT PREVIEW (A4 SHEET SIMULATION) */}
                  {/* ========================================================= */}
                  {printViewMode === 'layout' && (
                    <div className="space-y-4">
                      {/* Alignment Notification Card */}
                      <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-3.5 flex items-center justify-between text-xs text-blue-300 no-print">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                          <span>
                            <strong>Uhakiki wa Mpangilio (Alignment Check):</strong> Kadi zimepangwa kwa mfumo wa <strong>3×4</strong> wenye nafasi (margins) ya <strong>10mm</strong> ili zikikatwa zisiingiliane.
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
                          Kiwango: 100% Scale · DPI 300
                        </span>
                      </div>

                      {/* Simulated Physical Paper Sheet Container */}
                      <div
                        id="altavox-printable-sheet"
                        className="bg-white text-slate-900 rounded-2xl p-6 sm:p-8 shadow-2xl border-4 border-slate-300 max-w-4xl mx-auto relative transition"
                      >
                        {/* Corner Alignment Crosshair Registration Marks (+) */}
                        <div className="absolute top-2 left-2 font-mono text-xs font-black text-slate-400 select-none">
                          +
                        </div>
                        <div className="absolute top-2 right-2 font-mono text-xs font-black text-slate-400 select-none">
                          +
                        </div>
                        <div className="absolute bottom-2 left-2 font-mono text-xs font-black text-slate-400 select-none">
                          +
                        </div>
                        <div className="absolute bottom-2 right-2 font-mono text-xs font-black text-slate-400 select-none">
                          +
                        </div>

                        {/* Sheet Calibration Top Header */}
                        <div className="border-b-2 border-slate-200 pb-3 mb-6 flex items-center justify-between text-slate-500 font-mono text-[10px]">
                          <div className="flex items-center gap-2 font-bold text-slate-700">
                            <span className="size-2 rounded-full bg-[#f26522]" />
                            <span>ALTAVOX WIFI PRINT ENGINE · A4 ALIGNMENT TEMPLATE</span>
                          </div>
                          <div>
                            {businessName} · Vocha {displayVouchers.length} Zilizopangwa
                          </div>
                        </div>

                        {/* Grid of Printable Voucher Cards */}
                        <div
                          className={`grid ${
                            printPaperFormat === 'pos-receipt'
                              ? 'grid-cols-1 max-w-xs mx-auto gap-3'
                              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5'
                          }`}
                        >
                          {displayVouchers.map((v, i) => (
                            <div
                              key={i}
                              className={`bg-white text-slate-900 p-4 rounded-xl flex flex-col justify-between relative transition ${
                                printShowCutGuides
                                  ? 'border-2 border-dashed border-slate-300 hover:border-orange-500'
                                  : 'border border-slate-200 shadow-xs'
                              }`}
                            >
                              {/* Scissor icon at top-right cut boundary */}
                              {printShowCutGuides && (
                                <div className="absolute -top-2.5 right-3 bg-white px-1 text-[10px] text-slate-400 font-mono flex items-center gap-0.5">
                                  <span>✂</span>
                                  <span className="text-[9px]">kata</span>
                                </div>
                              )}

                              {/* Card Header: Brand & Price */}
                              <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-2">
                                <div className="flex items-center gap-1.5">
                                  <div className="size-5 rounded bg-[#f26522] text-white flex items-center justify-center font-black text-[10px]">
                                    W
                                  </div>
                                  <div>
                                    <div className="font-black text-xs tracking-tight text-slate-900 leading-none">
                                      ALTAVOX <span className="text-[#f26522]">WIFI</span>
                                    </div>
                                    <div className="text-[9px] text-slate-500 truncate max-w-[120px]">
                                      {businessName}
                                    </div>
                                  </div>
                                </div>

                                <div className="font-mono text-xs font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                                  TZS {v.priceTzs.toLocaleString()}
                                </div>
                              </div>

                              {/* Card Body: Code Box & Package */}
                              <div className="py-2 text-center my-1">
                                <span className="text-[9px] font-mono uppercase tracking-wider text-slate-500 block">
                                  Nambari ya Vocha (Code)
                                </span>
                                
                                <div className="font-mono text-base font-black tracking-widest text-slate-900 bg-slate-50 border-2 border-dashed border-orange-400 rounded-lg py-1.5 px-2 my-1 shadow-xs">
                                  {v.code}
                                </div>

                                <div className="text-xs font-extrabold text-[#f26522]">
                                  {v.packageName}
                                </div>
                              </div>

                              {/* Card Instructions & QR Auto-Connect */}
                              <div className="border-t border-slate-200 pt-2 mt-1 space-y-2">
                                <div className="flex items-center justify-between gap-2">
                                  <div className="text-[9px] text-slate-600 leading-tight flex-1">
                                    <strong>Jinsi ya Kuingia:</strong><br />
                                    1. Unganisha na <strong>ALTAVOX-WIFI</strong><br />
                                    2. Weka vocha au scan QR kuingia papo hapo
                                  </div>

                                  {/* Dynamic QR Code Simulation for Auto-Login */}
                                  <div className="size-11 bg-white border border-slate-300 p-0.5 rounded shrink-0 flex items-center justify-center shadow-xs" title="Scan kuunganishwa moja kwa moja">
                                    <svg viewBox="0 0 25 25" className="size-full fill-slate-900">
                                      <rect x="0" y="0" width="7" height="7" />
                                      <rect x="1" y="1" width="5" height="5" fill="white" />
                                      <rect x="2" y="2" width="3" height="3" />
                                      <rect x="18" y="0" width="7" height="7" />
                                      <rect x="19" y="1" width="5" height="5" fill="white" />
                                      <rect x="20" y="2" width="3" height="3" />
                                      <rect x="0" y="18" width="7" height="7" />
                                      <rect x="1" y="19" width="5" height="5" fill="white" />
                                      <rect x="2" y="20" width="3" height="3" />
                                      <rect x="9" y="2" width="2" height="4" />
                                      <rect x="13" y="1" width="3" height="2" />
                                      <rect x="10" y="9" width="5" height="5" />
                                      <rect x="18" y="10" width="4" height="2" />
                                      <rect x="9" y="17" width="3" height="5" />
                                      <rect x="15" y="18" width="5" height="2" />
                                      <rect x="21" y="21" width="4" height="4" />
                                    </svg>
                                  </div>
                                </div>

                                {/* Micro Barcode / QR Alignment pattern */}
                                <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[9px] font-mono text-slate-400">
                                  <div className="flex items-center gap-0.5 tracking-tighter">
                                    || | ||| || ||| | || |||
                                  </div>
                                  <div>
                                    SN: 2611-{String(i + 1).padStart(4, '0')}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Sheet Calibration Bottom Footer */}
                        <div className="mt-8 pt-3 border-t-2 border-slate-200 flex items-center justify-between text-slate-400 font-mono text-[9px]">
                          <div>
                            Kata kwenye mistari ya doti (Dotted guidelines) · Tumia mkasi au mashine ya kukatia karatasi.
                          </div>
                          <div>
                            Karatasi ya 1 ya 1 · Printed via Altavox WiFi Portal
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ========================================================= */}
                  {/* MODE 2: COMPACT LIST VIEW WITH SELECTION CHECKBOXES */}
                  {/* ========================================================= */}
                  {printViewMode === 'list' && (
                    <div className="rounded-2xl border border-white/10 bg-[#072444] shadow-lg overflow-hidden">
                      <div className="p-4 sm:p-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={toggleSelectAll}
                            className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 px-3 py-1.5 text-xs font-bold text-white transition cursor-pointer"
                          >
                            {selectedVoucherCodesForPrint.length === filteredVouchers.length && filteredVouchers.length > 0 ? (
                              <>
                                <CheckSquare className="size-4 text-[#f26522]" />
                                <span>Ondoa Uteuzi Wote</span>
                              </>
                            ) : (
                              <>
                                <Square className="size-4 text-slate-400" />
                                <span>Chagua Vocha Zote ({filteredVouchers.length})</span>
                              </>
                            )}
                          </button>

                          <span className="text-xs text-slate-400 font-mono">
                            {selectedVoucherCodesForPrint.length > 0
                              ? `Vocha ${selectedVoucherCodesForPrint.length} zimechaguliwa kuchapishwa`
                              : 'Vocha zote zimechaguliwa kwa default'}
                          </span>
                        </div>

                        <button
                          onClick={() => setPrintViewMode('layout')}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-[#f26522] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#e05312] transition cursor-pointer shadow-md"
                        >
                          <Grid className="size-3.5" />
                          <span>Hakiki kwenye Visual Print Layout →</span>
                        </button>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="bg-white/5 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 border-b border-white/10">
                              <th className="py-3 px-4 w-10">Chagua</th>
                              <th className="py-3 px-4">Nambari ya Vocha (Code)</th>
                              <th className="py-3 px-4">Kifurushi</th>
                              <th className="py-3 px-4">Bei (TZS)</th>
                              <th className="py-3 px-4">Muda (Hours)</th>
                              <th className="py-3 px-4">Hali</th>
                              <th className="py-3 px-4">Wakala / Eneo</th>
                              <th className="py-3 px-6 text-right">Vitendo</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {filteredVouchers.map((v, i) => {
                              const isChecked = selectedVoucherCodesForPrint.includes(v.code)
                              return (
                                <tr
                                  key={i}
                                  className={`hover:bg-white/5 transition ${
                                    isChecked ? 'bg-orange-500/10' : ''
                                  }`}
                                >
                                  <td className="py-3 px-4">
                                    <input
                                      type="checkbox"
                                      checked={isChecked}
                                      onChange={() => toggleSelectVoucher(v.code)}
                                      className="size-4 rounded accent-[#f26522] cursor-pointer"
                                    />
                                  </td>
                                  <td className="py-3 px-4 font-mono font-black text-orange-400 text-sm">
                                    {v.code}
                                  </td>
                                  <td className="py-3 px-4 font-semibold text-white">
                                    {v.packageName}
                                  </td>
                                  <td className="py-3 px-4 font-mono font-bold text-emerald-400">
                                    TZS {v.priceTzs.toLocaleString()}
                                  </td>
                                  <td className="py-3 px-4 font-mono text-slate-300">
                                    {v.durationHours} hrs
                                  </td>
                                  <td className="py-3 px-4">
                                    <span
                                      className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                                        v.status === 'unused'
                                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                          : v.status === 'active'
                                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                          : 'bg-slate-700 text-slate-400 border border-slate-600'
                                      }`}
                                    >
                                      {v.status === 'unused' ? 'TAYARI KUCHAPISHWA' : v.status === 'active' ? 'INATUMIKA' : 'IMEISHA'}
                                    </span>
                                  </td>
                                  <td className="py-3 px-4 text-slate-300">
                                    {v.agentName || 'Ofisi Kuu'}
                                  </td>
                                  <td className="py-3 px-6 text-right">
                                    <button
                                      onClick={() => {
                                        setSelectedVoucherCodesForPrint([v.code])
                                        setPrintViewMode('layout')
                                      }}
                                      className="inline-flex items-center gap-1 rounded-lg bg-white/10 hover:bg-white/20 px-2.5 py-1 text-[11px] font-bold text-white transition cursor-pointer"
                                    >
                                      <Eye className="size-3 text-[#f26522]" />
                                      <span>Hakiki Kadi Hii</span>
                                    </button>
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                </div>
              )
            })()}

            {/* ============================================================ */}
            {/* WORKSPACE VIEW 6: TRANSACTIONS & PAYMENT LEDGER */}
            {/* ============================================================ */}
            {activeTab === 'transactions' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#072444] p-6 rounded-2xl border border-white/10 shadow-lg">
                  <div>
                    <h3 className="text-xl font-black text-white">
                      Kumbukumbu ya Miamala ya Malipo
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">
                      Malipo yote yaliyolipwa na wateja kupitia Vodacom M-Pesa, Tigo Pesa, Airtel Money na HaloPesa.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={exportFinancialReport}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition shadow-md cursor-pointer"
                    >
                      <Download className="size-3.5" />
                      <span>Pakua CSV Report</span>
                    </button>
                    <div className="font-mono text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3.5 py-1.5 rounded-xl">
                      Mauzo: TZS {totalRevenueToday.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#072444] shadow-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-white/5 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 border-b border-white/10">
                          <th className="py-3.5 px-6">Risiti / Kumbukumbu</th>
                          <th className="py-3.5 px-4">Simu ya Mteja</th>
                          <th className="py-3.5 px-4">Mtandao</th>
                          <th className="py-3.5 px-4">Kifurushi</th>
                          <th className="py-3.5 px-4">Kiasi (TZS)</th>
                          <th className="py-3.5 px-4">Router / Eneo</th>
                          <th className="py-3.5 px-6 text-right">Muda</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {transactions.map((tx) => (
                          <tr key={tx.id} className="hover:bg-white/5 transition">
                            <td className="py-3.5 px-6 font-mono font-bold text-white">
                              {tx.receiptNumber}
                            </td>
                            <td className="py-3.5 px-4 font-semibold text-slate-200">
                              {tx.customerPhone}
                            </td>
                            <td className="py-3.5 px-4">
                              <span className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                                tx.method === 'M-PESA' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                                tx.method === 'TIGO PESA' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                                tx.method === 'AIRTEL MONEY' ? 'bg-red-600/20 text-red-300 border border-red-600/30' :
                                'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              }`}>
                                {tx.method}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-slate-200 font-semibold">
                              {tx.packageName}
                            </td>
                            <td className="py-3.5 px-4 font-mono font-black text-emerald-400 text-sm">
                              TZS {tx.amountTzs.toLocaleString()}
                            </td>
                            <td className="py-3.5 px-4 text-slate-400 text-[11px]">
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

            {/* ============================================================ */}
            {/* WORKSPACE VIEW 7: AGENTS & RESELLERS NETWORK */}
            {/* ============================================================ */}
            {activeTab === 'agents' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#072444] p-6 rounded-2xl border border-white/10 shadow-lg">
                  <div>
                    <h3 className="text-xl font-black text-white">
                      Mtandao wa Mawakala & Resellers (Agents)
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">
                      Wape wauzaji madukani au mikahawani uwezo wa kuuza vocha zako na kupata kamisheni ya asilimia kiotomatiki.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      const name = prompt('Jina la Wakala / Duka (Mfano: Mwenge Cyber Café):')
                      const phone = prompt('Nambari ya Simu ya Wakala:')
                      if (name && phone) {
                        const newAgent: Agent = {
                          id: `ag-${Date.now().toString().slice(-3)}`,
                          name,
                          location: 'Dar es Salaam',
                          phone,
                          commissionRate: 10,
                          vouchersSold: 0,
                          totalEarnedTzs: 0,
                          balanceTzs: 0,
                          status: 'active'
                        }
                        setAgents([...agents, newAgent])
                      }
                    }}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#f26522] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#e05312] transition shadow-md cursor-pointer"
                  >
                    <Plus className="size-4" />
                    <span>Sajili Wakala Mpya</span>
                  </button>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  {agents.map((agent) => (
                    <div
                      key={agent.id}
                      className="rounded-2xl border border-white/10 bg-[#072444] p-6 shadow-lg flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            Active Agent
                          </span>
                          <span className="font-mono text-xs text-orange-300 font-bold">
                            Kamisheni {agent.commissionRate}%
                          </span>
                        </div>

                        <h4 className="text-base font-extrabold text-white">{agent.name}</h4>
                        <p className="text-xs text-slate-300 mt-1">{agent.location}</p>
                        <p className="text-[11px] font-mono text-slate-400 mt-1">Simu: {agent.phone}</p>

                        <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/10 pt-4 text-xs">
                          <div className="bg-white/5 p-2.5 rounded-xl">
                            <span className="text-slate-400 text-[10px] block">Vocha Alizouza</span>
                            <span className="text-sm font-bold text-white">{agent.vouchersSold}</span>
                          </div>
                          <div className="bg-white/5 p-2.5 rounded-xl">
                            <span className="text-slate-400 text-[10px] block">Kamisheni Yake</span>
                            <span className="text-sm font-bold text-emerald-400">TZS {agent.totalEarnedTzs.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-white/10 flex gap-2">
                        <button
                          onClick={() => {
                            setVoucherSelectedPkg('pkg-24hr')
                            setActiveTab('vouchers')
                          }}
                          className="w-full rounded-xl bg-white/10 py-2.5 text-center text-xs font-bold text-white hover:bg-white/20 transition cursor-pointer"
                        >
                          Mpe Vocha za Kuuza
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* WORKSPACE VIEW 8: SMS & WHATSAPP NOTIFICATIONS */}
            {/* ============================================================ */}
            {activeTab === 'sms-whatsapp' && (
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="rounded-2xl border border-white/10 bg-[#072444] p-6 sm:p-8 shadow-lg space-y-6">
                  <div>
                    <h3 className="text-xl font-black text-white">
                      SMS & WhatsApp · Demo Settings
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">
                      Mawazo ya SMS/WhatsApp kwa demo tu. Hakuna gateway iliyounganishwa na hakuna ujumbe utakaotumwa.
                    </p>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                      <div>
                        <div className="text-xs font-bold text-white">SMS Gateway (Beem Africa / NextSMS)</div>
                        <div className="text-[11px] text-slate-400">Demo option only · no SMS sender connected</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={smsGatewayEnabled}
                        onChange={(e) => setSmsGatewayEnabled(e.target.checked)}
                        className="size-5 accent-[#f26522] cursor-pointer"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
                      <div>
                        <div className="text-xs font-bold text-white">WhatsApp Bot Dispatch</div>
                        <div className="text-[11px] text-slate-400">Demo option only · no WhatsApp sender connected</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={whatsappAlertsEnabled}
                        onChange={(e) => setWhatsappAlertsEnabled(e.target.checked)}
                        className="size-5 accent-[#f26522] cursor-pointer"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        SMS Sender ID
                      </label>
                      <input
                        type="text"
                        value={smsSenderId}
                        onChange={(e) => setSmsSenderId(e.target.value)}
                        className="w-full rounded-xl border border-white/20 bg-slate-800 px-3 py-2 text-xs font-mono font-bold text-white focus:border-[#f26522] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Ukumbusho wa Bando Kuisha (Dakika kabla ya muda kwisha)
                      </label>
                      <input
                        type="number"
                        value={expiryReminderMinutes}
                        onChange={(e) => setExpiryReminderMinutes(Number(e.target.value))}
                        className="w-full rounded-xl border border-white/20 bg-slate-800 px-3 py-2 text-xs font-mono font-bold text-white focus:border-[#f26522] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex justify-end">
                    <button
                      onClick={() => alert('Mabadiliko yako ni ya demo tu; hakuna SMS au WhatsApp iliyotumwa wala kuhifadhiwa.')}
                      className="rounded-xl bg-[#f26522] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#e05312] transition shadow-md cursor-pointer"
                    >
                      Hifadhi Mipangilio ya Ujumbe
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* WORKSPACE VIEW 9: REPORTS & FINANCIAL AUDIT */}
            {/* ============================================================ */}
            {activeTab === 'reports' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#072444] p-6 rounded-2xl border border-white/10 shadow-lg">
                  <div>
                    <h3 className="text-xl font-black text-white">
                      Ripoti za Mfano · Demo Only
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">
                      Uchambuzi wa kina wa mauzo ya kila mtandao (M-Pesa vs Tigo Pesa vs Airtel vs Cash).
                    </p>
                  </div>

                  <button
                    onClick={exportFinancialReport}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 transition shadow-md cursor-pointer"
                  >
                    <Download className="size-4" />
                    <span>Export Financial Audit Report</span>
                  </button>
                </div>

                {/* Breakdown by Provider */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="rounded-2xl border border-white/10 bg-[#072444] p-5 shadow-lg">
                    <span className="text-xs text-slate-400 font-mono">Vodacom M-Pesa</span>
                    <div className="text-xl font-black text-white mt-1">TZS 384,500</div>
                    <span className="text-[11px] text-emerald-400 font-semibold">54% ya Mauzo Yote</span>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-[#072444] p-5 shadow-lg">
                    <span className="text-xs text-slate-400 font-mono">Tigo Pesa / Mixx</span>
                    <div className="text-xl font-black text-white mt-1">TZS 182,000</div>
                    <span className="text-[11px] text-blue-400 font-semibold">26% ya Mauzo Yote</span>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-[#072444] p-5 shadow-lg">
                    <span className="text-xs text-slate-400 font-mono">Airtel Money & HaloPesa</span>
                    <div className="text-xl font-black text-white mt-1">TZS 78,000</div>
                    <span className="text-[11px] text-red-400 font-semibold">11% ya Mauzo Yote</span>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-[#072444] p-5 shadow-lg">
                    <span className="text-xs text-slate-400 font-mono">Vocha za Karatasi (Cash)</span>
                    <div className="text-xl font-black text-white mt-1">TZS 64,000</div>
                    <span className="text-[11px] text-purple-400 font-semibold">9% ya Mauzo Yote</span>
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* WORKSPACE VIEW 10: CAPTIVE PORTAL SIMULATOR */}
            {/* ============================================================ */}
            {activeTab === 'portal-demo' && (
              <div className="space-y-6">
                <div className="bg-[#072444] p-6 rounded-2xl border border-white/10 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-orange-400 font-bold">
                      <Smartphone className="size-4" />
                      <span>Captive Portal DEMO · local only</span>
                    </div>
                    <h3 className="text-xl font-black text-white mt-1">
                      Jaribu Kile Mteja Anachokiona Kwenye Simu Yake
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">
                      Preview ya splash page pekee. Hakuna M-Pesa/Tigo/Airtel request, RADIUS authentication au internet session inayotumwa kutoka sandbox hii.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setPortalSimState('idle')
                      setPortalMessage('')
                    }}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold text-white hover:bg-white/20 transition cursor-pointer"
                  >
                    <RefreshCw className="size-3.5" />
                    <span>Reset Splash Page</span>
                  </button>
                </div>

                {/* Mobile Viewport Simulation */}
                <div className="flex justify-center py-2">
                  <div className="w-full max-w-sm rounded-[42px] border-8 border-slate-950 bg-[#030e1a] shadow-2xl p-4 text-white overflow-hidden relative">
                    {/* Notch */}
                    <div className="w-24 h-4 bg-slate-950 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <div className="size-1.5 bg-slate-700 rounded-full" />
                    </div>

                    {/* Phone Inner Display */}
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
                          Internet access preview · actual access needs a verified network
                        </p>
                      </div>

                      {/* Authenticated State */}
                      {portalSimState === 'demo-completed' ? (
                        <div className="py-8 text-center space-y-4">
                          <div className="flex size-14 mx-auto items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                            <CheckCircle2 className="size-8" />
                          </div>
                          <h5 className="text-lg font-black text-[#07294d]">
                            Jaribio la Demo Limekamilika
                          </h5>
                          <p className="text-xs text-slate-600 leading-relaxed px-2">
                            {portalMessage}
                          </p>
                          <div className="rounded-xl bg-slate-50 p-3 text-xs font-mono text-slate-600 border border-slate-200">
                            DEMO SESSION · hakuna IP/MAC halisi iliyotolewa
                          </div>
                          <button
                            onClick={() => setPortalSimState('idle')}
                            className="w-full rounded-xl bg-[#07294d] py-3 text-xs font-bold text-white hover:bg-[#051c36] transition cursor-pointer"
                          >
                            Anza Demo Nyingine
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
                                      ? 'border-[#f26522] bg-orange-50 font-bold text-[#07294d]'
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
                              2. Chagua njia ya malipo ya kuonyesha kwenye demo:
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
                                Demo input only · hakuna USSD/SMS request inayotumwa.
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
                                <span>Inaendesha simulizi la malipo (demo)...</span>
                              </>
                            ) : portalPaymentMethod === 'voucher' ? (
                              <span>Unganisha kwa Vocha</span>
                            ) : (
                              <span>Run local payment simulation</span>
                            )}
                          </button>
                        </form>
                      )}

                      <div className="pt-3 border-t border-slate-100 text-center text-[10px] text-slate-400">
                        Demo UI tu · payment na router integrations hazijaunganishwa
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================ */}
            {/* WORKSPACE VIEW 11: SETTINGS & DIRECT MONEY CONFIGURATION */}
            {/* ============================================================ */}
            {activeTab === 'settings' && (
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="rounded-2xl border border-white/10 bg-[#072444] p-6 sm:p-8 shadow-lg space-y-6">
                  <div>
                    <h3 className="text-xl font-black text-white">
                      Mipangilio ya Lipa Namba & Till · Demo Preview
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">
                      Demo fields pekee. Till numbers hizi hazisawazishwi, hazihifadhiwi kwenye router, na hazimaanishi payment gateway imeunganishwa.
                    </p>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Jina la Mtandao wako wa WiFi (Business Brand Name)
                      </label>
                      <input
                        type="text"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="w-full rounded-xl border border-white/20 bg-slate-800 px-3 py-2 text-xs font-bold text-white focus:border-[#f26522] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Namba ya Huduma kwa Wateja (Support Phone)
                      </label>
                      <input
                        type="text"
                        value={supportPhone}
                        onChange={(e) => setSupportPhone(e.target.value)}
                        className="w-full rounded-xl border border-white/20 bg-slate-800 px-3 py-2 text-xs font-bold text-white focus:border-[#f26522] focus:outline-none"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">
                          Vodacom M-Pesa Till / Merchant Number
                        </label>
                        <input
                          type="text"
                          value={mpesaTill}
                          placeholder="Not configured"
                          onChange={(e) => setMpesaTill(e.target.value)}
                          className="w-full rounded-xl border border-white/20 bg-slate-800 px-3 py-2 text-xs font-mono font-bold text-white focus:border-[#f26522] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">
                          Tigo Pesa / Mixx Till Number
                        </label>
                        <input
                          type="text"
                          value={tigoTill}
                          placeholder="Not configured"
                          onChange={(e) => setTigoTill(e.target.value)}
                          className="w-full rounded-xl border border-white/20 bg-slate-800 px-3 py-2 text-xs font-mono font-bold text-white focus:border-[#f26522] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Airtel Money Paybill / Till Number
                      </label>
                      <input
                        type="text"
                        value={airtelPaybill}
                        placeholder="Not configured"
                        onChange={(e) => setAirtelPaybill(e.target.value)}
                        className="w-full rounded-xl border border-white/20 bg-slate-800 px-3 py-2 text-xs font-mono font-bold text-white focus:border-[#f26522] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                    <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="size-4" />
                      <span>Demo settings · hazijasawazishwa</span>
                    </span>
                    <button
                      onClick={() => alert('Mabadiliko haya yamehifadhiwa kwenye preview pekee; hayajatumwa kwa router au huduma ya malipo.')}
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
      </div>

      {/* Script Integration & Read Diagnostics Modal for Hardware */}
      {scriptModalOpen && selectedRouterForScript && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-3 sm:p-4 backdrop-blur-xs">
          <div className="w-full max-w-3xl rounded-3xl bg-[#051c33] border border-white/20 p-5 sm:p-7 text-white shadow-2xl flex flex-col max-h-[92vh]">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-[#f26522] text-white shadow-lg shadow-orange-500/20">
                  <Terminal className="size-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-black text-white">
                      {selectedRouterForScript.name}
                    </h3>
                    <span className="font-mono text-[10px] bg-orange-500/20 text-[#f26522] border border-orange-500/30 px-2 py-0.5 rounded font-bold">
                      {selectedRouterForScript.brand}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5 font-mono">
                    IP: {selectedRouterForScript.ip} · {selectedRouterForScript.location}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setScriptModalOpen(false)}
                className="rounded-lg bg-white/10 p-2 text-slate-300 hover:bg-white/20 transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div role="note" className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-[11px] leading-relaxed text-amber-100">
              Demo templates only: no script is executed here. Router IPs use documentation-only addresses and RADIUS secrets are placeholders; review, replace, back up, and test in a lab before any production use.
            </div>

            {/* Script Category Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
              <button
                onClick={() => setScriptType('read-diagnostics')}
                className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  scriptType === 'read-diagnostics'
                    ? 'bg-[#f26522] text-white shadow-md shadow-orange-500/20'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Search className="size-3.5" />
                <span>Read Scripts (Ukaguzi)</span>
              </button>

              <button
                onClick={() => setScriptType('setup')}
                className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  scriptType === 'setup'
                    ? 'bg-[#f26522] text-white shadow-md shadow-orange-500/20'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Zap className="size-3.5" />
                <span>Setup Script (Kusanidi)</span>
              </button>

              <button
                onClick={() => setScriptType('sync-vouchers')}
                className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  scriptType === 'sync-vouchers'
                    ? 'bg-[#f26522] text-white shadow-md shadow-orange-500/20'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Ticket className="size-3.5" />
                <span>Sync Vocha (Hifadhi Ndani)</span>
              </button>

              <button
                onClick={() => setScriptType('rollback')}
                className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  scriptType === 'rollback'
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-500/20'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <RefreshCw className="size-3.5" />
                <span>Rollback (disabled in demo)</span>
              </button>
            </div>

            {/* Version & Description Bar */}
            <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#041221] border border-white/10 p-2.5 rounded-xl text-xs">
              <div className="text-slate-300 flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-400 shrink-0" />
                <span>
                  {scriptType === 'read-diagnostics' && 'Amri halisi za KUSOMA watumiaji, rasilimali za CPU, RADIUS, logi na queues.'}
                  {scriptType === 'setup' && 'Sample template only; use the documented placeholders and review every setting before applying to a lab router.'}
                  {scriptType === 'sync-vouchers' && 'Preview template for up to 20 sample vouchers; copying does not sync them to a device.'}
                  {scriptType === 'rollback' && 'Rollback commands are withheld in demo mode; use a verified backup and reviewed object list.'}
                </span>
              </div>

              {selectedRouterForScript.brand === 'MikroTik' && (
                <div className="flex items-center gap-1 shrink-0 self-end sm:self-auto">
                  <span className="text-[11px] font-mono text-slate-400 mr-1">Toleo:</span>
                  <button
                    onClick={() => setRouterOsVersion('v7')}
                    className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-bold cursor-pointer ${
                      routerOsVersion === 'v7'
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    RouterOS v7
                  </button>
                  <button
                    onClick={() => setRouterOsVersion('v6')}
                    className={`px-2.5 py-0.5 rounded text-[11px] font-mono font-bold cursor-pointer ${
                      routerOsVersion === 'v6'
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    RouterOS v6
                  </button>
                </div>
              )}
            </div>

            {/* Terminal Code Display */}
            <div className="mt-3 flex-1 bg-[#020b14] border border-white/15 rounded-2xl p-4 font-mono text-xs overflow-y-auto max-h-80 sm:max-h-96 scrollbar-thin scrollbar-thumb-white/20 relative group">
              <div className="flex items-center justify-between text-[11px] text-slate-500 border-b border-white/10 pb-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="size-2.5 rounded-full bg-rose-500/80" />
                    <span className="size-2.5 rounded-full bg-amber-500/80" />
                    <span className="size-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-slate-400">Terminal Output · {selectedRouterForScript.name}</span>
                </div>
                <span className="text-emerald-400 font-bold">{scriptType.toUpperCase()}</span>
              </div>
              <pre className="text-emerald-300 whitespace-pre leading-relaxed font-mono">
                {routerSetupScript}
              </pre>
            </div>

            {/* Instruction Footer & Action Buttons */}
            <div className="mt-4 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-[11px] text-slate-400 flex items-center gap-1.5 self-start sm:self-auto">
                <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0" />
                <span>
                  Reference template only: review placeholders, back up the device, and validate in a lab before applying any <strong>.rsc</strong> file.
                </span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleDownloadRscFile}
                  title="Pakua faili ya .rsc ili kui-import moja kwa moja kwenye Winbox"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 px-4 py-2.5 text-xs font-bold text-white transition cursor-pointer"
                >
                  <Download className="size-3.5 text-cyan-400" />
                  <span>Pakua (.rsc)</span>
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(routerSetupScript)
                    setCopiedScript(true)
                    setTimeout(() => setCopiedScript(false), 2000)
                  }}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#f26522] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#e05312] transition shadow-md cursor-pointer"
                >
                  {copiedScript ? (
                    <>
                      <Check className="size-4" />
                      <span>Imenakiliwa!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="size-4" />
                      <span>Nakili Script (Copy)</span>
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
        </div>
      )}

      {/* Live Client Sessions Manager Modal */}
      {clientSessionsModalOpen && selectedRouterForClients && (
        <WifiClientSessionsModal
          routerName={selectedRouterForClients.name}
          routerIp={selectedRouterForClients.ip}
          isOpen={clientSessionsModalOpen}
          onClose={() => setClientSessionsModalOpen(false)}
        />
      )}

    </div>
  )
}
