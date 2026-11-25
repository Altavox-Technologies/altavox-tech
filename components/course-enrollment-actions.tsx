'use client'

import { useEffect, useState } from 'react'
import { CreditCard, MessageSquare, Mail, AlertCircle, Loader2, ExternalLink } from 'lucide-react'
import { CourseItem } from '@/lib/courses-data'
import { DemoModal } from '@/components/demo-modal'
import { useFirebaseAuth } from '@/components/firebase-provider'

export function CourseEnrollmentActions({ course }: { course: CourseItem }) {
  const { user } = useFirebaseAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [enquiryOpen, setEnquiryOpen] = useState(false)
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)
  const [customerEmail, setCustomerEmail] = useState('')
  const [customerName, setCustomerName] = useState('')

  useEffect(() => {
    if (user?.email && !customerEmail) {
      setCustomerEmail(user.email)
    }
    if (user?.displayName && !customerName) {
      setCustomerName(user.displayName)
    }
  }, [user, customerEmail, customerName])

  async function handlePayPalEnroll(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const email = customerEmail.trim().toLowerCase()
    const name = customerName.trim()

    if (!email || !name) {
      setError('Enter your full name and email address to initiate checkout.')
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/payments/paypal/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemType: 'course',
          itemSlug: course.slug,
          customerEmail: email,
          customerName: name,
        }),
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Unable to initiate PayPal checkout.')
      }

      const order = data.order
      if (!order?.approvalUrl) {
        throw new Error('PayPal did not return an approval link. Please contact admissions for manual invoicing.')
      }

      if (typeof window !== 'undefined') {
        sessionStorage.setItem(
          'altavox_pending_paypal_order',
          JSON.stringify({
            internalOrderId: order.internalOrderId,
            providerOrderId: order.providerOrderId,
            itemType: 'course',
            itemSlug: course.slug,
            courseTitle: course.title,
            customerEmail: email,
            customerName: name,
          })
        )
      }

      window.location.assign(order.approvalUrl)
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : 'PayPal checkout is currently unavailable. Please contact WhatsApp Admissions Desk.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => {
          setError('')
          setShowCheckoutModal(true)
        }}
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#f26522] px-5 py-3.5 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-[#d9531e] transition-colors cursor-pointer"
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
        className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
      >
        <Mail className="size-3.5 text-slate-400" /> Submit Detailed Inquiry
      </button>

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
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
              <p className="mt-1 text-[11px] text-slate-500">
                Redirects to official PayPal checkout. Enrollment activates after server-verified capture.
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
                  placeholder="Your full name"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3.5 py-2 text-xs text-slate-900 outline-none focus:border-[#f26522]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700">Email Address (for Receipt & LMS)</label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3.5 py-2 text-xs text-slate-900 outline-none focus:border-[#f26522]"
                />
              </div>

              {error && (
                <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                  <AlertCircle className="size-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0070ba] hover:bg-[#003087] px-4 py-3 text-xs sm:text-sm font-bold text-white transition disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="size-4 animate-spin" /> Creating PayPal Order...
                    </>
                  ) : (
                    <>
                      <ExternalLink className="size-4" /> Continue to PayPal (${course.discountPrice} USD)
                    </>
                  )}
                </button>
              </div>

              <p className="text-center text-[10px] text-slate-400">
                Server-quoted pricing & cryptographic return verification.
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
