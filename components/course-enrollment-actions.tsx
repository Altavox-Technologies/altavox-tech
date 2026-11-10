'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CreditCard, MessageSquare, Mail, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { CourseItem } from '@/lib/courses-data'
import { DemoModal } from '@/components/demo-modal'

export function CourseEnrollmentActions({ course }: { course: CourseItem }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [enquiryOpen, setEnquiryOpen] = useState(false)
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)
  const [customerEmail, setCustomerEmail] = useState('')
  const [customerName, setCustomerName] = useState('')

  async function handlePayPalEnroll(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // 1. Create order on server side
      const res = await fetch('/api/payments/paypal/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemType: 'course',
          itemSlug: course.slug,
          customerEmail: customerEmail.trim() || 'student@altavox.space',
          customerName: customerName.trim() || 'Enrolled Student'
        })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Unable to initiate PayPal checkout.')

      const order = data.order

      // 2. Capture order (handles both live sandbox and simulation)
      const captureRes = await fetch('/api/payments/paypal/capture-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          internalOrderId: order.internalOrderId,
          providerOrderId: order.providerOrderId,
          itemType: 'course',
          itemSlug: course.slug,
          customerEmail: customerEmail.trim() || 'student@altavox.space'
        })
      })

      const captureData = await captureRes.json()
      if (!captureRes.ok) throw new Error(captureData.error || 'Payment capture failed.')

      // Save local enrollment active state in browser
      if (typeof window !== 'undefined') {
        const stored = JSON.parse(localStorage.getItem('altavox_enrolled_courses') || '[]')
        if (!stored.includes(course.slug)) {
          stored.push(course.slug)
          localStorage.setItem('altavox_enrolled_courses', JSON.stringify(stored))
        }
      }

      setShowCheckoutModal(false)
      // Redirect to student dashboard with success notification
      router.push(`/academy/dashboard?enrolled=${course.slug}`)
    } catch (err: any) {
      setError(err.message || 'Payment initiation failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => setShowCheckoutModal(true)}
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#f26522] px-5 py-3.5 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-[#d9531e] transition-colors"
      >
        <CreditCard className="size-4" /> Enroll via PayPal (${course.discountPrice} USD)
      </button>

      <a
        href={`https://wa.me/255750227073?text=${encodeURIComponent(
          `Hello Altavox Academy, I would like to inquire about enrolling in "${course.title}".`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 transition-colors"
      >
        <MessageSquare className="size-4" /> WhatsApp Admissions Desk
      </a>

      <button
        type="button"
        onClick={() => setEnquiryOpen(true)}
        className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
      >
        <Mail className="size-3.5 text-slate-400" /> Submit Detailed Inquiry
      </button>

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#f26522]">
                  PAYPAL BUSINESS CHECKOUT
                </span>
                <h4 className="text-base font-bold text-[#07294d]">{course.title}</h4>
              </div>
              <button
                type="button"
                onClick={() => setShowCheckoutModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 rounded-xl bg-slate-50 p-4 border border-slate-200">
              <div className="flex justify-between text-xs text-slate-600">
                <span>Tuition Total:</span>
                <strong className="text-sm font-mono text-[#07294d]">
                  ${course.discountPrice}.00 USD
                </strong>
              </div>
              <p className="mt-1 text-[11px] text-slate-400">
                Merchant: Altavox Technologies • Automated student LMS activation
              </p>
            </div>

            <form onSubmit={handlePayPalEnroll} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700">Full Name</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Michael Kweka"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3.5 py-2 text-xs outline-none focus:border-[#f26522]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">Email Address (for LMS Login)</label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3.5 py-2 text-xs outline-none focus:border-[#f26522]"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-xs text-red-700">
                  <AlertCircle className="size-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0070ba] hover:bg-[#003087] px-4 py-3 text-xs sm:text-sm font-bold text-white transition disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="size-4 animate-spin" /> Verifying with PayPal…
                    </>
                  ) : (
                    <>
                      <CreditCard className="size-4" /> Pay with PayPal (${course.discountPrice} USD)
                    </>
                  )}
                </button>
              </div>

              <p className="text-center text-[10px] text-slate-400">
                Encrypted with TLS 1.3. Server-side payment capture and reconciliation.
              </p>
            </form>
          </div>
        </div>
      )}

      <DemoModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        initialCourse={course.title}
      />
    </div>
  )
}
