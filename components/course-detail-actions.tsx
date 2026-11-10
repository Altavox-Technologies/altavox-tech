'use client'

import { useState } from 'react'
import { DemoModal } from '@/components/demo-modal'

export function CourseDetailActions({ courseTitle }: { courseTitle: string }) {
  const [open, setOpen] = useState(false)
  return <>
    <button type="button" onClick={() => setOpen(true)} className="w-full bg-[#f26522] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#df5518]">Send course enquiry</button>
    <DemoModal isOpen={open} onClose={() => setOpen(false)} initialCourse={courseTitle}/>
  </>
}
