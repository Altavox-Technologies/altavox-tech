'use client'

import { useState } from 'react'
import {
  Phone,
  MessageSquare,
  X,
  ChevronUp,
  CheckCircle2,
  Send,
  Clock3,
  Headphones,
  Bot,
  Sparkles,
  HelpCircle,
  ArrowRight
} from 'lucide-react'

interface ChatMessage {
  sender: 'user' | 'assistant'
  text: string
  time: string
  actionUrl?: string
  actionLabel?: string
}

export function QuickContactWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'contacts' | 'chat'>('contacts')
  const [callbackSent, setCallbackSent] = useState(false)
  const [phoneInput, setPhoneInput] = useState('')

  // Interactive Live Chat State
  const [chatInput, setChatInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'assistant',
      text: 'Habari! Karibu Altavox Tech Operations Desk. Je, ungependa kupata ufafanuzi kuhusu Jaslyn Net (MikroTik & M-Pesa), Sammena School SIMS, au kuwasiliana na Lead Engineer moja kwa moja?',
      time: '10:45 AM'
    }
  ])

  function handleCallback(e: React.FormEvent) {
    e.preventDefault()
    if (!phoneInput) return
    setCallbackSent(true)
    setTimeout(() => {
      setCallbackSent(false)
      setPhoneInput('')
    }, 4000)
  }

  function handleSendMessage(questionText?: string) {
    const textToSend = questionText || chatInput
    if (!textToSend.trim()) return

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const userMsg: ChatMessage = { sender: 'user', text: textToSend, time }
    setMessages((prev) => [...prev, userMsg])
    if (!questionText) setChatInput('')

    // Generate intelligent assistant reply based on prompt
    setTimeout(() => {
      const lower = textToSend.toLowerCase()
      let reply: string
      let actionUrl: string | undefined
      let actionLabel: string | undefined

      if (lower.includes('mikrotik') || lower.includes('isp') || lower.includes('jaslyn') || lower.includes('m-pesa') || lower.includes('mpesa')) {
        reply = 'Jaslyn Net inaunganisha moja kwa moja RouterOS (v6 & v7) kupitia API/Socket na kurekodi malipo ya M-Pesa papo hapo. Mteja akilipa, foleni (queue) inafunguliwa ndani ya sekunde 2 bila kukata mtandao!'
        actionUrl = 'https://wa.me/255750227073?text=Nahitaji%20demo%20ya%20Jaslyn%20Net%20ISP%20Billing'
        actionLabel = 'Chat na Engineer wa ISP'
      } else if (lower.includes('shule') || lower.includes('school') || lower.includes('sammena') || lower.includes('sims') || lower.includes('ada')) {
        reply = 'Sammena School SIMS inasimamia usajili wa wanafunzi 850+, hesabu za ada, na kutoa ripoti za PDF (report cards) kwa mbofyo mmoja tu. Wazazi pia wanapokea SMS za salio la ada kiotomatiki.'
        actionUrl = 'https://wa.me/255750227073?text=Nahitaji%20taarifa%20za%20Sammena%20School%20SIMS'
        actionLabel = 'Pata Quote ya Mfumo wa Shule'
      } else if (lower.includes('namba') || lower.includes('simu') || lower.includes('piga') || lower.includes('call') || lower.includes('desk') || lower.includes('direct')) {
        reply = 'Namba zetu rasmi za Direct Desk ni +255 750 227 073 (Primary) na +255 708 227 073 (Secondary). Unaweza kutupigia sasa hivi au kupitia WhatsApp.'
        actionUrl = 'tel:+255750227073'
        actionLabel = 'Piga Simu Moja kwa Moja'
      } else if (lower.includes('bei') || lower.includes('gharama') || lower.includes('cost') || lower.includes('price')) {
        reply = 'Gharama zetu hutegemea ukubwa wa operesheni yako (idadi ya subscribers au wanafunzi). Tunatoa tathmini ya bure (Free Scope Analysis) ndani ya siku 1 ya kazi.'
        actionUrl = '/corporate#quote-form'
        actionLabel = 'Jaza Fomu ya Enterprise Proposal'
      } else {
        reply = 'Ahsante kwa swali lako! Wahandisi wetu wa Altavox Tech wapo tayari kukupa ufafanuzi wa kina. Unaweza kutupigia simu moja kwa moja kupitia +255 750 227 073 au kupitia WhatsApp.'
        actionUrl = 'https://wa.me/255750227073?text=Habari%20Altavox%2C%20nahitaji%20msaada%20wa%20kiufundi.'
        actionLabel = 'Fungua WhatsApp'
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'assistant',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actionUrl,
          actionLabel
        }
      ])
    }, 600)
  }

  const quickQuestions = [
    'Je, Jaslyn Net inafanya kazi na RouterOS gani?',
    'Sammena SIMS inasaidiaje kutoa ripoti za mitihani?',
    'Namba za simu za Direct Desk ni zipi?'
  ]

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end font-sans">
      {/* Popover Window */}
      {isOpen && (
        <div className="mb-3 w-84 sm:w-96 rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-3 duration-200 flex flex-col max-h-[520px]">
          
          {/* Header */}
          <div className="bg-[#07294d] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-xl bg-[#f26522] text-white shadow-xs">
                <Headphones className="size-4.5" />
              </span>
              <div>
                <h4 className="text-sm font-bold flex items-center gap-1.5">
                  <span>Altavox Direct Desk</span>
                </h4>
                <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Available 24/7 · East Africa & Global
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 text-slate-300 hover:bg-white/10 hover:text-white transition cursor-pointer"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="grid grid-cols-2 border-b border-slate-200 bg-slate-50 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab('contacts')}
              className={`py-2.5 text-center transition cursor-pointer border-b-2 ${
                activeTab === 'contacts'
                  ? 'border-[#f26522] text-[#07294d] bg-white font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Call & WhatsApp Lines
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('chat')}
              className={`py-2.5 text-center transition cursor-pointer border-b-2 flex items-center justify-center gap-1.5 ${
                activeTab === 'chat'
                  ? 'border-[#f26522] text-[#07294d] bg-white font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Bot className="size-3.5 text-[#f26522]" />
              <span>Live Assistant</span>
            </button>
          </div>

          {/* TAB 1: CONTACTS & DIRECT DESK */}
          {activeTab === 'contacts' && (
            <div className="p-4 space-y-3.5 text-xs overflow-y-auto">
              {/* Quick WhatsApp Action */}
              <a
                href="https://wa.me/255750227073?text=Habari%20Altavox%20Engineering%2C%20nahitaji%20maelezo%20kuhusu%20mifumo%20yenu."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white p-3 font-bold transition shadow-xs group"
              >
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="size-4" />
                  <span>Chat on WhatsApp</span>
                </div>
                <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded font-mono">
                  +255 750 227 073
                </span>
              </a>

              {/* Direct Phone Lines */}
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5 space-y-2.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Direct Call Desks (Tap to dial)
                </span>
                
                <div className="flex items-center justify-between">
                  <a
                    href="tel:+255750227073"
                    className="font-bold text-[#07294d] hover:text-[#f26522] flex items-center gap-1.5 text-xs"
                  >
                    <Phone className="size-3.5 text-[#f26522]" />
                    <span>+255 750 227 073</span>
                  </a>
                  <span className="text-[10px] bg-[#07294d]/10 text-[#07294d] font-bold px-2 py-0.5 rounded">
                    Desk 1 (Primary)
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                  <a
                    href="tel:+255708227073"
                    className="font-bold text-[#07294d] hover:text-[#f26522] flex items-center gap-1.5 text-xs"
                  >
                    <Phone className="size-3.5 text-[#f26522]" />
                    <span>+255 708 227 073</span>
                  </a>
                  <span className="text-[10px] bg-slate-200 text-slate-700 font-semibold px-2 py-0.5 rounded">
                    Desk 2 (Support)
                  </span>
                </div>
              </div>

              {/* Quick 1-click Callback Request */}
              <div className="border-t border-slate-100 pt-3">
                {callbackSent ? (
                  <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-center text-emerald-800 text-xs animate-in fade-in">
                    <CheckCircle2 className="size-4 text-emerald-600 mx-auto mb-1" />
                    <span className="font-semibold">Ahsante! Mhandisi wa Altavox atakupigia mara moja.</span>
                  </div>
                ) : (
                  <form onSubmit={handleCallback} className="space-y-2">
                    <label className="block text-[11px] font-bold text-slate-700">
                      Omba Tupige Mara Moja (Instant Callback):
                    </label>
                    <div className="flex gap-1.5">
                      <input
                        required
                        type="tel"
                        value={phoneInput}
                        onChange={(e) => setPhoneInput(e.target.value)}
                        placeholder="Namba yako ya simu..."
                        className="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#f26522]"
                      />
                      <button
                        type="submit"
                        className="rounded-xl bg-[#07294d] hover:bg-[#051c36] text-white px-3.5 py-2 text-xs font-bold transition shrink-0 cursor-pointer"
                      >
                        Pigiwa
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: LIVE ENGINEER CHAT ASSISTANT */}
          {activeTab === 'chat' && (
            <div className="flex flex-col flex-1 p-3 text-xs overflow-hidden">
              <div className="flex-1 overflow-y-auto space-y-3 p-1 max-h-64">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3 leading-relaxed ${
                        m.sender === 'user'
                          ? 'bg-[#07294d] text-white rounded-br-none'
                          : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200'
                      }`}
                    >
                      <p>{m.text}</p>
                      {m.actionUrl && (
                        <a
                          href={m.actionUrl}
                          className="mt-2 inline-flex items-center gap-1 rounded-lg bg-[#f26522] px-2.5 py-1 text-[11px] font-bold text-white shadow-xs hover:bg-[#e05312] transition"
                        >
                          <span>{m.actionLabel}</span>
                          <ArrowRight className="size-3" />
                        </a>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 px-1">{m.time}</span>
                  </div>
                ))}
              </div>

              {/* Preset Quick Prompts */}
              <div className="mt-2 border-t border-slate-100 pt-2 space-y-1">
                <p className="text-[10px] font-semibold text-slate-400">Maswali ya Haraka:</p>
                <div className="flex flex-col gap-1">
                  {quickQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSendMessage(q)}
                      className="text-left text-[11px] text-[#07294d] hover:text-[#f26522] bg-slate-50 hover:bg-orange-50/50 p-1.5 rounded-lg border border-slate-200 transition truncate cursor-pointer"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Input */}
              <div className="mt-2.5 flex items-center gap-1.5 pt-1 border-t border-slate-100">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Andika swali lako hapa..."
                  className="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-xs text-slate-900 outline-none focus:border-[#f26522]"
                />
                <button
                  type="button"
                  onClick={() => handleSendMessage()}
                  className="rounded-xl bg-[#f26522] text-white p-2 hover:bg-[#e05312] transition cursor-pointer"
                >
                  <Send className="size-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Footer note */}
          <div className="bg-slate-50 p-2.5 text-center text-[10px] text-slate-400 border-t border-slate-200">
            Altavox Engineering Desk · Dar es Salaam, Tanzania · +255 750 227 073
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full bg-[#f26522] text-white px-4 py-3 shadow-xl hover:bg-[#e05312] transition-all hover:scale-105 active:scale-95 duration-150 border-2 border-white cursor-pointer"
        title="Wasiliana na Direct Desk"
      >
        <span className="relative flex size-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
          <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400" />
        </span>
        <Phone className="size-4" />
        <span className="text-xs font-bold tracking-wide hidden sm:inline">Direct Desk: +255 750 227 073</span>
        <span className="text-xs font-bold tracking-wide sm:hidden">+255 750 227 073</span>
      </button>
    </div>
  )
}
