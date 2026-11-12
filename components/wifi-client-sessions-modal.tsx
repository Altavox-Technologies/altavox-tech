'use client'

import React, { useState } from 'react'
import {
  Smartphone,
  Laptop,
  Wifi,
  Trash2,
  Shield,
  Sliders,
  Search,
  CheckCircle2,
  Clock,
  ArrowDown,
  ArrowUp,
  Signal,
  X,
  AlertTriangle,
  Send
} from 'lucide-react'

export interface ClientSession {
  id: string
  mac: string
  ip: string
  device: string
  voucherOrPhone: string
  loginTime: string
  uptime: string
  rxBytes: string // download
  txBytes: string // upload
  signalDbm: number
  isBypassed?: boolean
  isThrottled?: boolean
}

interface WifiClientSessionsModalProps {
  routerName: string
  routerIp: string
  isOpen: boolean
  onClose: () => void
}

const INITIAL_CLIENTS: ClientSession[] = [
  {
    id: 'c-1',
    mac: 'DC:A6:32:89:11:0B',
    ip: '10.5.50.14',
    device: 'Apple iPhone 15 Pro (iOS 17.5)',
    voucherOrPhone: 'ALTA-8492-9102',
    loginTime: '17:15',
    uptime: '1h 12m',
    rxBytes: '1.42 GB',
    txBytes: '280 MB',
    signalDbm: -56
  },
  {
    id: 'c-2',
    mac: '48:2C:6A:99:32:41',
    ip: '10.5.50.22',
    device: 'Samsung Galaxy S24 Ultra',
    voucherOrPhone: '0754 *** 819 (M-Pesa)',
    loginTime: '16:40',
    uptime: '1h 47m',
    rxBytes: '2.85 GB',
    txBytes: '610 MB',
    signalDbm: -62
  },
  {
    id: 'c-3',
    mac: 'B0:72:BF:E4:29:90',
    ip: '10.5.50.31',
    device: 'Apple MacBook Pro M2 (macOS)',
    voucherOrPhone: 'ALTA-3310-8841',
    loginTime: '15:20',
    uptime: '3h 07m',
    rxBytes: '4.91 GB',
    txBytes: '1.18 GB',
    signalDbm: -51
  },
  {
    id: 'c-4',
    mac: '74:04:F1:C8:55:12',
    ip: '10.5.50.45',
    device: 'Tecno Spark 10 Pro',
    voucherOrPhone: '0713 *** 902 (Tigo Pesa)',
    loginTime: '17:50',
    uptime: '37m',
    rxBytes: '480 MB',
    txBytes: '95 MB',
    signalDbm: -68
  },
  {
    id: 'c-5',
    mac: '3C:06:30:1F:AA:88',
    ip: '10.5.50.60',
    device: 'HP Pavilion 15 Notebook',
    voucherOrPhone: 'ALTA-1109-7723',
    loginTime: '17:02',
    uptime: '1h 25m',
    rxBytes: '1.12 GB',
    txBytes: '210 MB',
    signalDbm: -72
  },
  {
    id: 'c-6',
    mac: 'A4:C3:F0:88:99:11',
    ip: '10.5.50.78',
    device: 'Xiaomi Redmi Note 13',
    voucherOrPhone: '0787 *** 210 (Airtel)',
    loginTime: '18:10',
    uptime: '17m',
    rxBytes: '215 MB',
    txBytes: '42 MB',
    signalDbm: -59
  }
]

export function WifiClientSessionsModal({
  routerName,
  routerIp,
  isOpen,
  onClose
}: WifiClientSessionsModalProps) {
  const [clients, setClients] = useState<ClientSession[]>(INITIAL_CLIENTS)
  const [search, setSearch] = useState('')
  const [alertMessage, setAlertMessage] = useState<string | null>(null)

  if (!isOpen) return null

  const handleKick = (mac: string, devName: string) => {
    if (confirm(`Remove sample session for ${devName} (${mac}) from this local demo? No device will be disconnected.`)) {
      setClients((prev) => prev.filter((c) => c.mac !== mac))
      setAlertMessage(`Demo only: ${mac} imeondolewa kwenye orodha ya hapa; hakuna disconnect iliyotumwa kwa router.`)
      setTimeout(() => setAlertMessage(null), 3500)
    }
  }

  const handleToggleBypass = (mac: string) => {
    setClients((prev) =>
      prev.map((c) => (c.mac === mac ? { ...c, isBypassed: !c.isBypassed } : c))
    )
    const target = clients.find((c) => c.mac === mac)
    setAlertMessage(
      target?.isBypassed
        ? `Demo only: bypass marker removed for ${mac}.`
        : `Demo only: bypass ya mfano imewashwa kwa ${mac}; hakuna rule iliyotumwa.`
    )
    setTimeout(() => setAlertMessage(null), 3500)
  }

  const handleToggleThrottle = (mac: string) => {
    setClients((prev) =>
      prev.map((c) => (c.mac === mac ? { ...c, isThrottled: !c.isThrottled } : c))
    )
    const target = clients.find((c) => c.mac === mac)
    setAlertMessage(
      target?.isThrottled
        ? `Demo only: throttle marker removed for ${mac}.`
        : `Demo only: alama ya throttle imebadilika kwa ${mac}; hakuna router setting iliyobadilishwa.`
    )
    setTimeout(() => setAlertMessage(null), 3500)
  }

  const filtered = clients.filter(
    (c) =>
      c.device.toLowerCase().includes(search.toLowerCase()) ||
      c.mac.toLowerCase().includes(search.toLowerCase()) ||
      c.ip.includes(search) ||
      c.voucherOrPhone.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-5 backdrop-blur-xs">
      <div className="w-full max-w-4xl rounded-3xl bg-[#051c33] border border-white/20 p-5 sm:p-7 text-white shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl bg-[#f26522] text-white shadow-lg shadow-orange-500/20">
              <Wifi className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white">
                  Sample client sessions
                </h3>
                <span className="font-mono text-[10px] bg-amber-500/15 text-amber-200 border border-amber-500/30 px-2 py-0.5 rounded font-bold">
                  {clients.length} sample records
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 font-mono">
                Demo data · no RADIUS connection · sample router: {routerName} ({routerIp})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg bg-white/10 p-2 text-slate-300 hover:bg-white/20 transition cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        <p role="status" className="mt-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-[11px] leading-relaxed text-amber-100">These are sample client records. Search and controls are local UI demonstrations; no client data is fetched and no router or RADIUS command is sent.</p>

        {/* Quick Notification Toast */}
        {alertMessage && (
          <div className="mt-3 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="size-4 shrink-0" />
            <span>{alertMessage}</span>
          </div>
        )}

        {/* Search Bar & Summary */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="size-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tafuta kwa MAC, Simu au Kifaa..."
              className="w-full bg-[#041221] border border-white/15 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#f26522]"
            />
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-slate-400 self-end sm:self-auto">
            <span>Pakiti In: <strong className="text-white">10.8 GB</strong></span>
            <span>Pakiti Out: <strong className="text-emerald-400">2.4 GB</strong></span>
          </div>
        </div>

        {/* Sessions Table */}
        <div className="mt-4 flex-1 overflow-y-auto border border-white/10 rounded-2xl bg-[#041221] scrollbar-thin scrollbar-thumb-white/15">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-white/5 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 border-b border-white/10">
                <th className="py-3 px-4">Kifaa & Hostname</th>
                <th className="py-3 px-4">Anwani za MAC & IP</th>
                <th className="py-3 px-4">Vocha / Malipo</th>
                <th className="py-3 px-4">Muda Hewani</th>
                <th className="py-3 px-4">Data (Down / Up)</th>
                <th className="py-3 px-4">Mawimbi (RSSI)</th>
                <th className="py-3 px-6 text-right">Vitendo vya Haraka</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-white/5 transition">
                  <td className="py-3 px-4 font-sans">
                    <div className="font-bold text-white text-xs flex items-center gap-1.5">
                      {c.device.includes('Apple') ? (
                        <Smartphone className="size-3.5 text-cyan-400" />
                      ) : c.device.includes('MacBook') || c.device.includes('HP') ? (
                        <Laptop className="size-3.5 text-orange-400" />
                      ) : (
                        <Smartphone className="size-3.5 text-emerald-400" />
                      )}
                      <span>{c.device}</span>
                    </div>
                    {c.isBypassed && (
                      <span className="inline-block mt-0.5 text-[9px] bg-purple-500/20 text-purple-300 border border-purple-500/30 px-1.5 py-0.2 rounded font-bold">
                        VIP BYPASS
                      </span>
                    )}
                    {c.isThrottled && (
                      <span className="inline-block mt-0.5 ml-1 text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.2 rounded font-bold">
                        THROTTLED (1 Mbps)
                      </span>
                    )}
                  </td>

                  <td className="py-3 px-4">
                    <div className="font-bold text-orange-300 text-[11px]">{c.mac}</div>
                    <div className="text-[10px] text-slate-400">{c.ip}</div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="font-bold text-white text-[11px]">{c.voucherOrPhone}</div>
                    <div className="text-[10px] text-slate-400">Ingia saa {c.loginTime}</div>
                  </td>

                  <td className="py-3 px-4 text-slate-300 font-bold">
                    {c.uptime}
                  </td>

                  <td className="py-3 px-4 text-[11px]">
                    <div className="flex items-center gap-1 text-emerald-400 font-bold">
                      <ArrowDown className="size-3" />
                      <span>{c.rxBytes}</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-400">
                      <ArrowUp className="size-3" />
                      <span>{c.txBytes}</span>
                    </div>
                  </td>

                  <td className="py-3 px-4 font-bold text-slate-300">
                    <span className={c.signalDbm > -65 ? 'text-emerald-400' : 'text-amber-400'}>
                      {c.signalDbm} dBm
                    </span>
                  </td>

                  <td className="py-3 px-6 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* Throttle toggle */}
                      <button
                        onClick={() => handleToggleThrottle(c.mac)}
                        title={c.isThrottled ? 'Remove sample throttle marker' : 'Toggle sample throttle marker'}
                        className={`p-1.5 rounded-lg border transition cursor-pointer ${
                          c.isThrottled
                            ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                            : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <Sliders className="size-3.5" />
                      </button>

                      {/* Bypass toggle */}
                      <button
                        onClick={() => handleToggleBypass(c.mac)}
                        title={c.isBypassed ? 'Remove sample bypass marker' : 'Toggle sample bypass marker'}
                        className={`p-1.5 rounded-lg border transition cursor-pointer ${
                          c.isBypassed
                            ? 'bg-purple-500/20 border-purple-500/40 text-purple-300'
                            : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <Shield className="size-3.5" />
                      </button>

                      {/* Kick disconnect button */}
                      <button
                        onClick={() => handleKick(c.mac, c.device)}
                        title="Remove sample row only; no router action"
                        className="p-1.5 rounded-lg bg-rose-500/20 border border-rose-500/30 text-rose-300 hover:bg-rose-500/30 transition cursor-pointer"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>Demo controls only · no RADIUS CoA or disconnect command is sent</span>
          <button
            onClick={onClose}
            className="rounded-xl border border-white/20 bg-white/10 px-5 py-2 text-xs font-bold text-white hover:bg-white/20 transition cursor-pointer"
          >
            Funga
          </button>
        </div>

      </div>
    </div>
  )
}
