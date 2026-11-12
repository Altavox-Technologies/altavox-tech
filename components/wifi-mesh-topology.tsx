'use client'

import React, { useState } from 'react'
import {
  Server,
  Router,
  Wifi,
  Activity,
  ShieldCheck,
  Zap,
  Globe,
  Radio,
  RefreshCw,
  Cpu,
  Layers,
  ArrowUpRight
} from 'lucide-react'

export interface NetworkNode {
  id: string
  name: string
  location: string
  ip: string
  type: 'core' | 'gateway' | 'ap' | 'client-cluster'
  brand: string
  status: 'online' | 'warning' | 'offline'
  activeClients: number
  throughputMbps: number
  latencyMs: number
  packetLoss: number
  cpu: number
  x: number // percent on canvas
  y: number // percent on canvas
  tunnelType: 'WireGuard' | 'RADIUS AAA' | 'Direct Ethernet' | 'L2TP/IPsec'
}

const INITIAL_NODES: NetworkNode[] = [
  {
    id: 'node-cloud',
    name: 'Altavox Cloud RADIUS Core',
    location: 'Dar es Salaam Data Center Tier III',
    ip: '192.0.2.10',
    type: 'core',
    brand: 'Altavox Cloud Core',
    status: 'online',
    activeClients: 273,
    throughputMbps: 395,
    latencyMs: 4,
    packetLoss: 0.0,
    cpu: 18,
    x: 50,
    y: 22,
    tunnelType: 'Direct Ethernet'
  },
  {
    id: 'node-rtr1',
    name: 'MikroTik CCR2004 Core Mall',
    location: 'Kariakoo Commercial Hub, DSM',
    ip: '192.0.2.10',
    type: 'gateway',
    brand: 'MikroTik CCR2004',
    status: 'online',
    activeClients: 142,
    throughputMbps: 185,
    latencyMs: 6,
    packetLoss: 0.0,
    cpu: 24,
    x: 20,
    y: 65,
    tunnelType: 'WireGuard'
  },
  {
    id: 'node-rtr2',
    name: 'MikroTik hEX S Hostel',
    location: 'Sinza Kwaremi Campus, DSM',
    ip: '192.0.2.11',
    type: 'gateway',
    brand: 'MikroTik RB750Gr3',
    status: 'online',
    activeClients: 38,
    throughputMbps: 48,
    latencyMs: 9,
    packetLoss: 0.1,
    cpu: 32,
    x: 42,
    y: 75,
    tunnelType: 'RADIUS AAA'
  },
  {
    id: 'node-rtr3',
    name: 'UniFi U6 Enterprise Hub',
    location: 'Mlimani City Student Plaza, DSM',
    ip: '192.0.2.12',
    type: 'ap',
    brand: 'Ubiquiti UniFi U6',
    status: 'online',
    activeClients: 64,
    throughputMbps: 98,
    latencyMs: 7,
    packetLoss: 0.0,
    cpu: 21,
    x: 68,
    y: 72,
    tunnelType: 'RADIUS AAA'
  },
  {
    id: 'node-rtr4',
    name: 'TP-Link Omada ER605 Node',
    location: 'Clock Tower Safari Lounge, Arusha',
    ip: '192.0.2.13',
    type: 'gateway',
    brand: 'TP-Link Omada',
    status: 'online',
    activeClients: 29,
    throughputMbps: 34,
    latencyMs: 18,
    packetLoss: 0.2,
    cpu: 16,
    x: 85,
    y: 60,
    tunnelType: 'L2TP/IPsec'
  }
]

export function WifiMeshTopology() {
  const [nodes, setNodes] = useState<NetworkNode[]>(INITIAL_NODES)
  const [selectedNodeId, setSelectedNodeId] = useState(INITIAL_NODES[0].id)
  const selectedNode = nodes.find((node) => node.id === selectedNodeId) ?? nodes[0]
  const [pingRunning, setPingRunning] = useState(false)
  const [lastRefreshed, setLastRefreshed] = useState('Sample dataset')

  const refreshSampleValues = () => {
    setPingRunning(true)
    setTimeout(() => {
      setNodes((prev) =>
        prev.map((n) => ({
          ...n,
          latencyMs: Math.max(3, Math.round(n.latencyMs + (Math.random() * 4 - 2))),
          throughputMbps: Math.max(10, Math.round(n.throughputMbps + (Math.random() * 10 - 5)))
        }))
      )
      setPingRunning(false)
      setLastRefreshed(new Date().toLocaleTimeString('sw-TZ'))
    }, 1200)
  }

  const cloudNode = nodes[0]
  const branchNodes = nodes.slice(1)

  return (
    <div className="space-y-6">
      {/* Topology Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#072444] p-6 rounded-2xl border border-white/10 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#f26522] to-amber-600 text-white shadow-lg shadow-orange-500/20">
            <Radio className="size-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-white">
                Ramani ya Mtandao · Sample Topology
              </h3>
              <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold bg-amber-500/15 text-amber-200 border border-amber-500/30 px-2 py-0.5 rounded">
                DEMO · no router connection
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Illustrative links only. No live MikroTik, UniFi, Omada or RADIUS session is connected.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={refreshSampleValues}
            disabled={pingRunning}
            className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 px-3.5 py-2 text-xs font-bold text-white transition cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`size-3.5 ${pingRunning ? 'animate-spin' : ''}`} />
            <span>{pingRunning ? 'Refreshing sample...' : 'Refresh sample values'}</span>
          </button>
        </div>
      </div>

      {/* Sample topology visualization; this does not probe external devices. */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* Left: Topology Canvas */}
        <div className="lg:col-span-8 rounded-2xl border border-white/10 bg-[#041221] p-4 sm:p-6 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[440px]">
          {/* Subtle Grid Background */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)',
              backgroundSize: '24px 24px'
            }}
          />

          {/* SVG Animated Connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="tunnelGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f26522" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Connecting lines from Core to each branch */}
            {branchNodes.map((b) => (
              <g key={b.id}>
                {/* Static line */}
                <line
                  x1={`${cloudNode.x}%`}
                  y1={`${cloudNode.y}%`}
                  x2={`${b.x}%`}
                  y2={`${b.y}%`}
                  stroke="rgba(255, 255, 255, 0.15)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />

                {/* Animated pulsing line */}
                <line
                  x1={`${cloudNode.x}%`}
                  y1={`${cloudNode.y}%`}
                  x2={`${b.x}%`}
                  y2={`${b.y}%`}
                  stroke="url(#tunnelGradient)"
                  strokeWidth="2.5"
                  strokeDasharray="6 12"
                  className="animate-pulse opacity-70"
                />
              </g>
            ))}
          </svg>

          {/* Canvas Nodes */}
          <div className="relative flex-1 min-h-[380px]">
            {/* Core Node */}
            <button
              type="button"
              aria-label={`Select sample node ${cloudNode.name}`}
              aria-pressed={selectedNode.id === cloudNode.id}
              style={{ left: `${cloudNode.x}%`, top: `${cloudNode.y}%` }}
              onClick={() => setSelectedNodeId(cloudNode.id)}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group appearance-none border-0 bg-transparent p-0 text-inherit focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400"
            >
              <div className={`relative flex flex-col items-center transition transform group-hover:scale-105 ${
                selectedNode.id === cloudNode.id ? 'scale-110' : ''
              }`}>
                {/* Glow ring */}
                <div className="absolute -inset-2 rounded-2xl bg-orange-500/30 blur-md animate-pulse" />
                
                <div className="relative size-14 rounded-2xl bg-gradient-to-br from-[#f26522] to-red-600 border-2 border-white/40 flex items-center justify-center text-white shadow-xl shadow-orange-500/30">
                  <Server className="size-6" />
                </div>
                
                <div className="mt-2 text-center whitespace-nowrap bg-[#072444]/95 border border-white/20 px-2.5 py-1 rounded-lg backdrop-blur-md shadow-md">
                  <div className="font-black text-xs text-white">ALTAVOX CLOUD CORE</div>
                  <div className="text-[10px] font-mono text-emerald-400 font-bold">{cloudNode.ip}</div>
                </div>
              </div>
            </button>

            {/* Branch Nodes */}
            {branchNodes.map((node) => {
              const isSelected = selectedNode.id === node.id
              return (
                <button
                  type="button"
                  key={node.id}
                  aria-label={`Select sample node ${node.name}`}
                  aria-pressed={isSelected}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  onClick={() => setSelectedNodeId(node.id)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group appearance-none border-0 bg-transparent p-0 text-inherit focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400"
                >
                  <div className={`relative flex flex-col items-center transition transform group-hover:scale-105 ${
                    isSelected ? 'scale-110' : ''
                  }`}>
                    {isSelected && (
                      <div className="absolute -inset-2 rounded-2xl bg-cyan-500/30 blur-md animate-pulse" />
                    )}

                    <div className={`size-11 rounded-xl flex items-center justify-center text-white border-2 shadow-lg transition ${
                      isSelected
                        ? 'bg-[#06b6d4] border-white shadow-cyan-500/40'
                        : 'bg-[#07294d] border-white/20 hover:border-white/40'
                    }`}>
                      {node.type === 'ap' ? <Wifi className="size-5" /> : <Router className="size-5" />}
                    </div>

                    <div className="mt-1.5 text-center whitespace-nowrap bg-[#051c33]/90 border border-white/10 px-2 py-0.5 rounded-lg shadow-sm">
                      <div className="text-[11px] font-extrabold text-white truncate max-w-[140px]">
                        {node.name.split('—')[0]}
                      </div>
                      <div className="text-[9px] font-mono text-cyan-300 font-semibold flex items-center justify-center gap-1">
                        <span className="size-1.5 rounded-full bg-emerald-400" />
                        <span>{node.activeClients} Wateja · {node.latencyMs}ms</span>
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Canvas Footer Status bar */}
          <div className="relative z-10 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 font-mono gap-2">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <ShieldCheck className="size-4" />
                <span>Demo topology · uptime not measured</span>
              </span>
              <span>Sample clients: <strong className="text-white">{nodes.reduce((total, node) => total + node.activeClients, 0)} vifaa</strong></span>
            </div>
            <div>
              <span>Sample refresh: {lastRefreshed}</span>
            </div>
          </div>
        </div>

        {/* Right: Selected Node Telemetry Inspector */}
        <div className="lg:col-span-4 rounded-2xl border border-white/10 bg-[#072444] p-5 sm:p-6 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-orange-400 block">
                  Kifaa Kilichochaguliwa
                </span>
                <h4 className="text-base font-black text-white mt-0.5">
                  {selectedNode.name}
                </h4>
              </div>
              <span className="text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">
                SAMPLE
              </span>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                <span className="text-[10px] text-slate-400 block uppercase">Mahali Kifaa Kilipo</span>
                <span className="text-white font-bold">{selectedNode.location}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                  <span className="text-[10px] text-slate-400 block uppercase">Anwani ya IP</span>
                  <span className="text-cyan-400 font-bold">{selectedNode.ip}</span>
                </div>
                <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                  <span className="text-[10px] text-slate-400 block uppercase">Itifaki ya Tunnel</span>
                  <span className="text-orange-300 font-bold">{selectedNode.tunnelType}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                  <span className="text-[10px] text-slate-400 block">Latency</span>
                  <span className="text-sm font-black text-emerald-400">{selectedNode.latencyMs}ms</span>
                </div>
                <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                  <span className="text-[10px] text-slate-400 block">Trafiki</span>
                  <span className="text-sm font-black text-white">{selectedNode.throughputMbps}M</span>
                </div>
                <div className="bg-white/5 p-2 rounded-xl border border-white/5">
                  <span className="text-[10px] text-slate-400 block">CPU Load</span>
                  <span className="text-sm font-black text-orange-400">{selectedNode.cpu}%</span>
                </div>
              </div>

              {/* Ping Stability Progress */}
              <div className="bg-white/5 p-3 rounded-xl border border-white/5 space-y-1.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-400">Sample packet loss:</span>
                  <span className="text-emerald-400 font-bold">{selectedNode.packetLoss}% example</span>
                </div>
                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full w-[99%]" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 space-y-2">
            <button
              onClick={refreshSampleValues}
              className="w-full rounded-xl bg-[#f26522] py-2.5 text-xs font-bold text-white hover:bg-[#e05312] transition shadow-md cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Zap className="size-3.5" />
              <span>Refresh sample metrics</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
