'use client'

import { useState } from 'react'
import { Calendar, Clock3, Tag, CheckCircle2, Users, ShieldAlert, Sparkles, CreditCard } from 'lucide-react'
import { CourseItem } from '@/lib/courses-data'

export function BatchScheduleCalculator({
  course
}: {
  course: CourseItem
}) {
  const [selectedBatchId, setSelectedBatchId] = useState('b-1')
  const [timezone, setTimezone] = useState('EST (US Eastern)')
  const [coupon, setCoupon] = useState('JANBASK40')
  const [couponApplied, setCouponApplied] = useState(true)
  const [enrolled, setEnrolled] = useState(false)
  const [enrolling, setEnrolling] = useState(false)

  const batches = [
    {
      id: 'b-1',
      type: 'Weekend Live Batch',
      days: 'Sat & Sun (4 Weeks · 4 hrs/day)',
      time: timezone.includes('EST') ? '10:00 AM - 02:00 PM EST' : '02:00 PM - 06:00 PM GMT',
      startDate: 'Starts This Saturday',
      seatsLeft: 3,
      badge: 'Filling Fast'
    },
    {
      id: 'b-2',
      type: 'Weekday Evening Batch',
      days: 'Mon to Thu (6 Weeks · 2 hrs/day)',
      time: timezone.includes('EST') ? '08:00 PM - 10:00 PM EST' : '12:00 AM - 02:00 AM GMT',
      startDate: 'Starts Next Tuesday',
      seatsLeft: 6,
      badge: 'Popular'
    },
    {
      id: 'b-3',
      type: 'Fast-Track Intensive Bootcamp',
      days: 'Mon to Fri (3 Weeks · 4 hrs/day)',
      time: timezone.includes('EST') ? '09:00 AM - 01:00 PM EST' : '01:00 PM - 05:00 PM GMT',
      startDate: 'Starts Next Monday',
      seatsLeft: 2,
      badge: 'Limited Seats'
    }
  ]

  const discountAmount = couponApplied ? 150 : 0
  const finalPrice = Math.max(course.discountPrice - discountAmount, 199)

  function handleEnroll(e: React.FormEvent) {
    e.preventDefault()
    setEnrolling(true)
    setTimeout(() => {
      setEnrolling(false)
      setEnrolled(true)
    }, 700)
  }

  return (
    <div className="rounded-2xl border-2 border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#f26522]">
            Interactive Batch Scheduler & Fee Calculator
          </span>
          <h3 className="text-xl font-bold text-[#07294d]">Upcoming Live Batches for {course.shortTitle}</h3>
        </div>

        {/* Timezone Switcher */}
        <div className="flex items-center gap-2">
          <Clock3 className="size-4 text-slate-400" />
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 outline-none"
          >
            <option value="EST (US Eastern)">Timezone: EST (New York)</option>
            <option value="GMT (London)">Timezone: GMT (London)</option>
            <option value="EAT (Nairobi)">Timezone: EAT (East Africa)</option>
            <option value="IST (India)">Timezone: IST (India)</option>
            <option value="PST (California)">Timezone: PST (Los Angeles)</option>
          </select>
        </div>
      </div>

      {enrolled ? (
        <div className="py-8 text-center space-y-3">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 className="size-7" />
          </div>
          <h4 className="text-2xl font-bold text-[#07294d]">Enrollment Pass Reserved!</h4>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Your seat in the <strong>{batches.find(b => b.id === selectedBatchId)?.type}</strong> has been tentatively held for 2 hours.
          </p>
          <div className="inline-block rounded-xl bg-orange-50 border border-orange-200 px-4 py-2 text-xs font-bold text-[#f26522]">
            Total Payable at Checkout: ${finalPrice} (You saved ${course.originalPrice - finalPrice}!)
          </div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 max-w-md mx-auto text-xs text-left space-y-2">
            <p className="font-bold text-[#07294d]">Direct Payment & Activation:</p>
            <p className="text-slate-600">Lipa kwa <strong>M-Pesa / Tigo Pesa / Airtel Money</strong> au Card. Tuma uthibitisho kwa Direct Desk:</p>
            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href="https://wa.me/255750227073?text=Habari%20Altavox%2C%20nimechagua%20batch%20ya%20mafunzo%20na%20nahitaji%20kulipa."
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-emerald-600 text-white px-3 py-1.5 font-bold hover:bg-emerald-700 transition"
              >
                Thibitisha WhatsApp (+255 750 227 073)
              </a>
              <a
                href="tel:+255750227073"
                className="rounded-lg bg-[#07294d] text-white px-3 py-1.5 font-bold hover:bg-[#051c36] transition"
              >
                Piga Direct Desk (+255 750 227 073)
              </a>
            </div>
          </div>
          <div>
            <button
              type="button"
              onClick={() => setEnrolled(false)}
              className="mt-3 text-xs text-slate-500 underline"
            >
              Choose a different batch
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Batch Radio Cards */}
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Select Batch Schedule
            </p>
            {batches.map((b) => {
              const isSelected = selectedBatchId === b.id
              return (
                <div
                  key={b.id}
                  onClick={() => setSelectedBatchId(b.id)}
                  className={`cursor-pointer rounded-xl border p-4 transition ${
                    isSelected
                      ? 'border-[#f26522] bg-orange-50/40 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        checked={isSelected}
                        onChange={() => setSelectedBatchId(b.id)}
                        className="size-4 accent-[#f26522]"
                      />
                      <span className="font-bold text-sm text-[#07294d]">{b.type}</span>
                    </div>
                    <span className="rounded bg-rose-50 border border-rose-200 px-2 py-0.5 text-[10px] font-bold text-rose-700">
                      ⚡ {b.seatsLeft} Seats Left
                    </span>
                  </div>

                  <div className="mt-2.5 pl-6.5 text-xs text-slate-600 space-y-1">
                    <p className="flex items-center gap-1.5 font-medium text-slate-800">
                      <Calendar className="size-3.5 text-[#f26522]" /> {b.startDate} · {b.days}
                    </p>
                    <p className="flex items-center gap-1.5 text-slate-500">
                      <Clock3 className="size-3.5 text-slate-400" /> {b.time}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Pricing & Checkout Summary Box */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Tuition Fee Breakdown
              </p>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Standard Tuition Fee:</span>
                  <span className="line-through">${course.originalPrice}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Live Batch Discount:</span>
                  <span>-${course.originalPrice - course.discountPrice}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-[#f26522] font-semibold">
                    <span>Coupon ({coupon}):</span>
                    <span>-${discountAmount}</span>
                  </div>
                )}
                <div className="border-t border-slate-200 pt-2 flex justify-between items-baseline">
                  <span className="font-bold text-sm text-[#07294d]">Final Price:</span>
                  <span className="font-black text-2xl text-[#f26522]">${finalPrice}</span>
                </div>
              </div>

              {/* Promo code field */}
              <div className="mt-4 pt-3 border-t border-slate-200">
                <div className="flex gap-2">
                  <input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                    placeholder="Enter Coupon Code"
                    className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-mono uppercase text-slate-800 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setCouponApplied(coupon.trim().length > 0)}
                    className="rounded-lg bg-[#07294d] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#051c36]"
                  >
                    Apply
                  </button>
                </div>
                {couponApplied && (
                  <p className="mt-1 text-[11px] text-emerald-600 font-medium">
                    ✓ Promo code &quot;{coupon}&quot; applied successfully!
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={handleEnroll}
                disabled={enrolling}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#f26522] py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/25 hover:bg-[#e05312] transition disabled:opacity-50"
              >
                <CreditCard className="size-4" />
                {enrolling ? 'Holding your seat…' : `Enroll in ${batches.find(b => b.id === selectedBatchId)?.type.split(' ')[0]} Batch`}
              </button>
              <p className="mt-2 text-center text-[10px] text-slate-500">
                100% Money-Back Satisfaction Guarantee (7-day trial policy)
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
