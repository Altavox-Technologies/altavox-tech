'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  Terminal,
  Play,
  RotateCcw,
  CheckCircle2,
  Activity,
  Zap,
  Server,
  Network,
  Database,
  Layers,
  Copy,
  Check,
  ShieldCheck,
  Info,
  Download,
  Volume2,
  VolumeX,
  Cpu,
  Radio,
  Send,
  HelpCircle,
  Clock3,
  ExternalLink
} from 'lucide-react'

type TabType = 'routeros' | 'sims' | 'cloud'

export function LiveTerminalSandbox() {
  const [activeTab, setActiveTab] = useState<TabType>('routeros')
  const [isRunning, setIsRunning] = useState(false)
  const [copied, setCopied] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [commandInput, setCommandInput] = useState('')
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState<number>(-1)
  const [latencyJitter, setLatencyJitter] = useState<number>(3.2)
  const [cpuUsage, setCpuUsage] = useState<number>(14)
  const terminalScrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Real-time jitter simulator for godlevel realism
  useEffect(() => {
    const interval = setInterval(() => {
      setLatencyJitter(Number((2.8 + Math.random() * 0.9).toFixed(1)))
      setCpuUsage(Math.floor(11 + Math.random() * 7))
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  // Web Audio API Synthesizer (Zero asset dependencies, instant mechanical & terminal feedback)
  const playSound = useCallback((type: 'click' | 'execute' | 'success') => {
    if (!soundEnabled || typeof window === 'undefined') return
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)

      if (type === 'click') {
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(320, ctx.currentTime)
        gain.gain.setValueAtTime(0.04, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04)
        osc.start()
        osc.stop(ctx.currentTime + 0.04)
      } else if (type === 'execute') {
        osc.type = 'sine'
        osc.frequency.setValueAtTime(540, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(780, ctx.currentTime + 0.08)
        gain.gain.setValueAtTime(0.06, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08)
        osc.start()
        osc.stop(ctx.currentTime + 0.08)
      } else if (type === 'success') {
        osc.type = 'sine'
        osc.frequency.setValueAtTime(660, ctx.currentTime)
        osc.frequency.setValueAtTime(880, ctx.currentTime + 0.07)
        gain.gain.setValueAtTime(0.06, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16)
        osc.start()
        osc.stop(ctx.currentTime + 0.16)
      }
    } catch {
      // Audio context might be restricted before user gesture
    }
  }, [soundEnabled])

  const [routerLogs, setRouterLogs] = useState<string[]>([
    '[2026-10-29 10:45:01] [INFO] MikroTik CCR2004 socket connected via RouterOS API (tls=true, port=8729)',
    '[2026-10-29 10:45:02] [SYNC] Loaded 2,418 active PPPoE interface sessions across 4 distribution towers',
    '[2026-10-29 10:45:04] [NET] Core gateway latency: 3.2ms | Packet loss: 0.00% | BGP status: ESTABLISHED',
    '[2026-10-29 10:45:05] [READY] Awaiting automated M-Pesa IPN payment webhooks or operator CLI commands...'
  ])

  const [simsLogs, setSimsLogs] = useState<string[]>([
    '[2026-10-29 10:45:01] [SIMS] Connected to Sammena PostgreSQL 16 relational ledger database (pool=20)',
    '[2026-10-29 10:45:02] [RECORDS] 852 student profiles loaded · Current term: Term 3 Final Examinations',
    '[2026-10-29 10:45:03] [AUDIT] Fee ledger balance verified: 98.6% reconciliation match against bank exports',
    '[2026-10-29 10:45:05] [READY] Ready to compile gradebook transcripts or dispatch automated parent balance SMS.'
  ])

  const [cloudLogs, setCloudLogs] = useState<string[]>([
    '[2026-10-29 10:45:01] [FABRIC] Altavox Nexora Cloud Runtime initialized (Ubuntu 24.04 LTS / Docker v27.1)',
    '[2026-10-29 10:45:02] [HEALTH] 14 microservice containers running in isolated namespaces (CPU: 12%, RAM: 24%)',
    '[2026-10-29 10:45:03] [EDGE] Cloudflare zero-trust tunnel active · SSL wildcard *.altavox.space valid',
    '[2026-10-29 10:45:05] [READY] Production cluster healthy with 99.99% blue/green rollout readiness.'
  ])

  // Scroll to bottom when logs update
  useEffect(() => {
    if (terminalScrollRef.current) {
      terminalScrollRef.current.scrollTop = terminalScrollRef.current.scrollHeight
    }
  }, [routerLogs, simsLogs, cloudLogs, isRunning])

  function simulateRouterPayment() {
    setIsRunning(true)
    playSound('execute')
    const timestamp = new Date().toLocaleTimeString()
    const newEvents = [
      `[${timestamp}] [WEBHOOK] <<< Incoming M-Pesa IPN: BillRef="ACC-7742" | Amount=TZS 45,000 | TransID=QJK88291X`,
      `[${timestamp}] [AUTH] Verified Safaricom/Vodacom HMAC-SHA256 signature (valid=true)`,
      `[${timestamp}] [ROUTEROS] Executing: /queue/simple/set [find name="sub-7742"] max-limit=25M/25M burst-limit=35M/35M`,
      `[${timestamp}] [SUCCESS] Account 7742 provisioned! Connection resumed without TCP session drop (latency: 3.4ms)`
    ]

    let i = 0
    const interval = setInterval(() => {
      if (i < newEvents.length) {
        setRouterLogs((prev) => [...prev, newEvents[i]])
        playSound('click')
        i++
      } else {
        clearInterval(interval)
        setIsRunning(false)
        playSound('success')
      }
    }, 450)
  }

  function simulateSimsCompilation() {
    setIsRunning(true)
    playSound('execute')
    const timestamp = new Date().toLocaleTimeString()
    const newEvents = [
      `[${timestamp}] [TASK] Batch PDF gradebook compilation requested for Grade 7 (42 students)`,
      `[${timestamp}] [COMPUTE] Calculating GPA, percentile rankings, and automated teacher remarks`,
      `[${timestamp}] [RENDER] Compiling 42 high-resolution tamper-evident PDF transcripts with school seal`,
      `[${timestamp}] [DISPATCH] PDFs uploaded to secure student portal & balance alert SMS queued (status=COMPLETE)`
    ]

    let i = 0
    const interval = setInterval(() => {
      if (i < newEvents.length) {
        setSimsLogs((prev) => [...prev, newEvents[i]])
        playSound('click')
        i++
      } else {
        clearInterval(interval)
        setIsRunning(false)
        playSound('success')
      }
    }, 450)
  }

  function simulateCloudHealthCheck() {
    setIsRunning(true)
    playSound('execute')
    const timestamp = new Date().toLocaleTimeString()
    const newEvents = [
      `[${timestamp}] [PROBE] Initiating multi-region endpoint health check from 4 probe locations`,
      `[${timestamp}] [LATENCY] Dar es Salaam: 3.2ms | Nairobi: 14ms | Frankfurt: 98ms | Ashburn: 122ms`,
      `[${timestamp}] [POSTGRES] Checking table row constraints and Drizzle ORM migration status: IN_SYNC`,
      `[${timestamp}] [VERIFIED] All 14 services report 100% operational status with zero packet degradation.`
    ]

    let i = 0
    const interval = setInterval(() => {
      if (i < newEvents.length) {
        setCloudLogs((prev) => [...prev, newEvents[i]])
        playSound('click')
        i++
      } else {
        clearInterval(interval)
        setIsRunning(false)
        playSound('success')
      }
    }, 450)
  }

  // Interactive CLI Command Interpreter
  function handleCommandSubmit(e: React.FormEvent) {
    e.preventDefault()
    const cmd = commandInput.trim()
    if (!cmd) return

    playSound('execute')
    setCommandHistory((prev) => [...prev, cmd])
    setHistoryIndex(-1)
    setCommandInput('')

    const timestamp = new Date().toLocaleTimeString()
    const appendLog = (line: string) => {
      if (activeTab === 'routeros') setRouterLogs((prev) => [...prev, line])
      else if (activeTab === 'sims') setSimsLogs((prev) => [...prev, line])
      else setCloudLogs((prev) => [...prev, line])
    }

    appendLog(`[${timestamp}] root@altavox-edge:~# ${cmd}`)

    const lower = cmd.toLowerCase()
    if (lower === 'help') {
      appendLog(`  Available commands:`)
      appendLog(`  • mpesa test       - Simulate incoming M-Pesa IPN & simple queue provisioning`)
      appendLog(`  • queues           - Inspect active MikroTik RouterOS simple queues`)
      appendLog(`  • ping mikrotik    - Probe RouterOS API socket latency and packet jitter`)
      appendLog(`  • sims compile     - Compile Grade 7 student gradebook PDFs`)
      appendLog(`  • health           - Run multi-region latency & container probe`)
      appendLog(`  • whoami           - Print active operator credentials and RBAC level`)
      appendLog(`  • version          - Print Altavox Engine & RouterOS API bridge version`)
      appendLog(`  • export           - Download complete terminal telemetry diagnostic file`)
      appendLog(`  • clear            - Wipe terminal buffer`)
    } else if (lower === 'clear') {
      if (activeTab === 'routeros') setRouterLogs([])
      else if (activeTab === 'sims') setSimsLogs([])
      else setCloudLogs([])
    } else if (lower === 'mpesa test' || lower === 'simulate') {
      simulateRouterPayment()
    } else if (lower === 'sims compile' || lower === 'compile') {
      simulateSimsCompilation()
    } else if (lower === 'health' || lower === 'diagnostics') {
      simulateCloudHealthCheck()
    } else if (lower === 'queues') {
      appendLog(`[${timestamp}] [ROUTEROS] Querying /queue/simple print detail stats:`)
      appendLog(`  #  NAME      TARGET           MAX-LIMIT   BURST       DROPS  PACKETS`)
      appendLog(`  0  sub-7742  10.10.14.88/32   25M/25M     35M/35M     0      4.81 MB`)
      appendLog(`  1  sub-5120  10.10.12.19/32   15M/15M     20M/20M     0      2.14 MB`)
      appendLog(`  2  sub-8901  10.10.19.4/32    50M/50M     70M/70M     0      9.42 MB`)
      appendLog(`  3  sub-1044  10.10.08.77/32   10M/10M     15M/15M     0      1.19 MB`)
      appendLog(`[${timestamp}] [STATUS] Total active queues: 2,418 | Zero drop rate maintained.`)
    } else if (lower.startsWith('ping')) {
      appendLog(`[${timestamp}] PING 10.200.0.1 (MikroTik CCR2004 Core Gateway): 56 data bytes`)
      appendLog(`[${timestamp}] 64 bytes from 10.200.0.1: icmp_seq=1 ttl=64 time=2.94 ms`)
      appendLog(`[${timestamp}] 64 bytes from 10.200.0.1: icmp_seq=2 ttl=64 time=3.12 ms`)
      appendLog(`[${timestamp}] 64 bytes from 10.200.0.1: icmp_seq=3 ttl=64 time=2.88 ms`)
      appendLog(`[${timestamp}] --- 10.200.0.1 ping statistics --- 3 packets transmitted, 0% packet loss`)
    } else if (lower === 'whoami') {
      appendLog(`  operator: altavox-systems-engineer`)
      appendLog(`  station : Dar es Salaam Core NOC (Zone A)`)
      appendLog(`  role    : Lead Systems Administrator (Full Access)`)
      appendLog(`  session : TLSv1.3 · ECDHE-RSA-AES256-GCM-SHA384`)
    } else if (lower === 'version') {
      appendLog(`  Altavox Edge Kernel: v7.14.2-carrier`)
      appendLog(`  RouterOS API Bridge : v3.8.1 (Non-blocking async socket)`)
      appendLog(`  Drizzle ORM Engine  : v0.45.4 / PostgreSQL 16.2`)
      appendLog(`  Runtime Environment : Next.js 16 App Router on Node.js v22`)
    } else if (lower === 'export') {
      handleExportDiagnostic()
    } else {
      appendLog(`  bash: ${cmd}: command not found. Type 'help' to see valid operations.`)
    }
  }

  function currentLogs() {
    if (activeTab === 'routeros') return routerLogs
    if (activeTab === 'sims') return simsLogs
    return cloudLogs
  }

  function handleCopy() {
    navigator.clipboard.writeText(currentLogs().join('\n'))
    setCopied(true)
    playSound('success')
    setTimeout(() => setCopied(false), 2000)
  }

  function handleExportDiagnostic() {
    const textContent = [
      `=================================================================`,
      `ALTAVOX TECH — CARRIER-GRADE ENGINEERING TELEMETRY LOG`,
      `Generated: ${new Date().toISOString()}`,
      `Host: altavox-edge.dar-noc.local | Kernel: RouterOS API Bridge v7.14`,
      `=================================================================`,
      ``,
      ...currentLogs()
    ].join('\n')

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `altavox-${activeTab}-telemetry-${Date.now()}.log`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    playSound('success')
  }

  function handleReset() {
    playSound('click')
    if (activeTab === 'routeros') {
      setRouterLogs([
        '[10:45:01] [INFO] MikroTik CCR2004 socket connected via RouterOS API (tls=true, port=8729)',
        '[10:45:02] [SYNC] Loaded 2,418 active PPPoE interface sessions across 4 distribution towers',
        '[10:45:04] [READY] Ready for M-Pesa IPN payment simulation...'
      ])
    } else if (activeTab === 'sims') {
      setSimsLogs([
        '[10:45:01] [SIMS] Connected to Sammena PostgreSQL 16 database (pool=20)',
        '[10:45:02] [RECORDS] 852 student profiles loaded · Ready for gradebook batch run.'
      ])
    } else {
      setCloudLogs([
        '[10:45:01] [FABRIC] Altavox Nexora Cloud Runtime initialized',
        '[10:45:02] [HEALTH] 14 containers active · All systems operational.'
      ])
    }
  }

  return (
    <div className="rounded-2xl border border-slate-800 bg-[#061424] text-slate-200 overflow-hidden shadow-2xl">
      {/* 1. Live Telemetry HUD Strip */}
      <div className="bg-[#020b14] border-b border-white/10 px-4 py-2.5 flex flex-wrap items-center justify-between text-[11px] font-mono gap-3">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-slate-300">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-emerald-500 shrink-0" />
            <span className="text-white font-bold">NOC Gateway:</span>
            <span className="text-emerald-400 font-bold">ONLINE ({latencyJitter}ms)</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-slate-400">
            <Cpu className="size-3 text-[#f26522]" />
            <span>CPU: <strong className="text-white">{cpuUsage}%</strong></span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 text-slate-400">
            <Radio className="size-3 text-cyan-400" />
            <span>PPPoE Sockets: <strong className="text-cyan-300">2,418 active</strong></span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 text-slate-400">
            <Database className="size-3 text-amber-400" />
            <span>PostgreSQL Pool: <strong className="text-emerald-400">20/20 ACID</strong></span>
          </div>
        </div>

        {/* Audio Toggle & Quick Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled)
              if (!soundEnabled) {
                // Prime audio context on click
                playSound('success')
              }
            }}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-semibold transition cursor-pointer ${
              soundEnabled
                ? 'bg-[#f26522] text-white shadow-xs'
                : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
            }`}
            title="Toggle synthesized terminal sound effects"
          >
            {soundEnabled ? <Volume2 className="size-3" /> : <VolumeX className="size-3" />}
            <span>Sound: {soundEnabled ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={handleExportDiagnostic}
            className="flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition cursor-pointer"
            title="Download full .log telemetry file"
          >
            <Download className="size-3 text-[#f26522]" />
            <span className="hidden sm:inline">Export .log</span>
          </button>
        </div>
      </div>

      {/* 2. Top Bar with Tabs and Status */}
      <div className="flex flex-wrap items-center justify-between border-b border-white/10 bg-[#030d17] px-4 py-3 gap-3">
        <div className="flex items-center gap-2">
          <span className="flex size-3 rounded-full bg-rose-500" />
          <span className="flex size-3 rounded-full bg-amber-500" />
          <span className="flex size-3 rounded-full bg-emerald-500" />
          <span className="ml-2 font-mono text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <Terminal className="size-3.5 text-[#f26522]" />
            altavox-edge-console
          </span>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 text-xs">
          <button
            type="button"
            onClick={() => {
              setActiveTab('routeros')
              playSound('click')
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition font-semibold cursor-pointer ${
              activeTab === 'routeros'
                ? 'bg-[#f26522] text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Network className="size-3.5" />
            <span>Jaslyn Net RouterOS</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('sims')
              playSound('click')
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition font-semibold cursor-pointer ${
              activeTab === 'sims'
                ? 'bg-[#f26522] text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="size-3.5" />
            <span>Sammena SIMS</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('cloud')
              playSound('click')
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition font-semibold cursor-pointer ${
              activeTab === 'cloud'
                ? 'bg-[#f26522] text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Server className="size-3.5" />
            <span>Nexora Cloud & DB</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:bg-white/10 transition cursor-pointer"
            title="Copy logs to clipboard"
          >
            {copied ? <Check className="size-3 text-emerald-400" /> : <Copy className="size-3" />}
            <span>{copied ? 'Copied' : 'Copy Logs'}</span>
          </button>
          <button
            onClick={handleReset}
            className="rounded-lg border border-white/10 bg-white/5 p-1 text-slate-400 hover:text-white transition cursor-pointer"
            title="Clear and reset terminal"
          >
            <RotateCcw className="size-3.5" />
          </button>
        </div>
      </div>

      {/* 3. Terminal Output Screen */}
      <div
        ref={terminalScrollRef}
        className="p-4 sm:p-5 font-mono text-xs leading-relaxed max-h-80 min-h-64 overflow-y-auto space-y-1 bg-[#030d17]/85 selection:bg-[#f26522] selection:text-white border-b border-white/5"
      >
        {currentLogs().map((log, idx) => {
          const isHighlight = log.includes('[WEBHOOK]') || log.includes('[SUCCESS]') || log.includes('[RENDER]') || log.includes('[VERIFIED]')
          const isWarn = log.includes('[SYNC]') || log.includes('[AUTH]') || log.includes('Executing:')
          const isPrompt = log.includes('root@altavox-edge:~#')
          return (
            <div
              key={`${idx}-${log.slice(0, 20)}`}
              className={`flex items-start gap-2 ${
                isHighlight
                  ? 'text-emerald-300 font-semibold'
                  : isWarn
                  ? 'text-cyan-300'
                  : isPrompt
                  ? 'text-amber-300 font-bold'
                  : 'text-slate-300'
              }`}
            >
              <span className="text-[#f26522] shrink-0 font-bold">›</span>
              <span className="break-all">{log}</span>
            </div>
          )
        })}

        {isRunning && (
          <div className="flex items-center gap-2 text-orange-400 pt-1">
            <span className="size-1.5 rounded-full bg-orange-400 animate-pulse" />
            <span>Processing operational protocol command...</span>
          </div>
        )}
      </div>

      {/* 4. Interactive Command Line Input (Godlevel Feature) */}
      <div className="bg-[#04111f] border-t border-white/10 px-4 py-2.5">
        <form onSubmit={handleCommandSubmit} className="flex items-center gap-2">
          <span className="font-mono text-xs text-emerald-400 font-bold shrink-0 hidden sm:inline">
            root@altavox-edge:~#
          </span>
          <span className="font-mono text-xs text-[#f26522] font-bold shrink-0 sm:hidden">
            #
          </span>
          <input
            ref={inputRef}
            type="text"
            value={commandInput}
            onChange={(e) => setCommandInput(e.target.value)}
            placeholder="Type a CLI command (e.g. 'help', 'mpesa test', 'queues', 'ping', 'diagnostics')..."
            className="flex-1 bg-transparent border-0 outline-none font-mono text-xs text-white placeholder-slate-500 focus:ring-0"
          />
          <button
            type="submit"
            className="rounded-lg bg-[#f26522] px-3 py-1 text-xs font-bold text-white hover:bg-[#e05312] transition flex items-center gap-1 cursor-pointer"
          >
            <span>Run</span>
            <Send className="size-3" />
          </button>
        </form>

        {/* Quick Suggestion Chips */}
        <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px] font-mono text-slate-400">
          <span className="text-slate-500 text-[10px]">Quick:</span>
          {['help', 'mpesa test', 'queues', 'ping mikrotik', 'health', 'clear', 'export'].map((suggest) => (
            <button
              key={suggest}
              type="button"
              onClick={() => {
                setCommandInput(suggest)
                playSound('click')
                inputRef.current?.focus()
              }}
              className="rounded bg-white/5 px-2 py-0.5 text-slate-300 hover:bg-[#f26522] hover:text-white transition cursor-pointer"
            >
              {suggest}
            </button>
          ))}
        </div>
      </div>

      {/* 5. Interactive Trigger Controls Footer */}
      <div className="border-t border-white/10 bg-[#071d33] p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="size-2 rounded-full bg-emerald-500 shrink-0" />
          <p className="text-xs text-slate-300">
            Simulate real-world operational traffic:
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {activeTab === 'routeros' && (
            <button
              onClick={simulateRouterPayment}
              disabled={isRunning}
              className="flex items-center gap-2 rounded-xl bg-[#f26522] px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-[#e05312] transition disabled:opacity-50 cursor-pointer"
            >
              <Play className="size-3.5 fill-current" />
              <span>Simulate M-Pesa IPN Payment & Queue Refresh</span>
            </button>
          )}

          {activeTab === 'sims' && (
            <button
              onClick={simulateSimsCompilation}
              disabled={isRunning}
              className="flex items-center gap-2 rounded-xl bg-[#f26522] px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-[#e05312] transition disabled:opacity-50 cursor-pointer"
            >
              <Play className="size-3.5 fill-current" />
              <span>Compile Grade 7 Report Card PDFs</span>
            </button>
          )}

          {activeTab === 'cloud' && (
            <button
              onClick={simulateCloudHealthCheck}
              disabled={isRunning}
              className="flex items-center gap-2 rounded-xl bg-[#f26522] px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-[#e05312] transition disabled:opacity-50 cursor-pointer"
            >
              <Play className="size-3.5 fill-current" />
              <span>Run Multi-Region Health Diagnostic</span>
            </button>
          )}

          <a
            href="tel:+255750227073"
            className="flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200 hover:text-white hover:bg-white/10 transition"
          >
            <span>Ask Lead Engineer</span>
          </a>
        </div>
      </div>
    </div>
  )
}
