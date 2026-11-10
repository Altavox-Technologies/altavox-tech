import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  Code2,
  GraduationCap,
  Target,
  Layers,
  Laptop,
  ShieldCheck,
  MessageSquare,
  Sparkles,
  Award,
  CreditCard,
  HelpCircle
} from 'lucide-react'
import { AltavoxHeader } from '@/components/altavox-header'
import { AltavoxFooter } from '@/components/altavox-footer'
import { CourseEnrollmentActions } from '@/components/course-enrollment-actions'
import { coursesData } from '@/lib/courses-data'

export function generateStaticParams() {
  return coursesData.map((course) => ({ slug: course.slug }))
}

export default async function AcademyCourseDetailPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const course = coursesData.find((item) => item.slug === slug)
  if (!course) notFound()

  const relatedCourses = coursesData.filter((item) => item.id !== course.id).slice(0, 3)

  const faqs = [
    {
      q: 'How does online and laboratory delivery work?',
      a: 'We operate a hybrid model. Students in Arusha have direct access to our physical engineering laboratories at Nduruma Road, Unguuni. Students across Tanzania and internationally join via interactive live workshops, virtual router environments, and asynchronous lab assignments.'
    },
    {
      q: 'What payment methods are supported for course enrollment?',
      a: 'We support international credit cards and PayPal via our Altavox Technologies PayPal Business gateway, as well as East African mobile-money payments (Vodacom M-Pesa, Tigo Pesa, Airtel Money) and direct bank wire for corporate teams.'
    },
    {
      q: 'How do I earn my official Altavox Academy Certificate?',
      a: 'Certificates are awarded only upon verified completion of all curriculum modules, submission of working code for both practical capstone projects, and successful defense review with our senior engineering team.'
    },
    {
      q: 'Can corporate and enterprise teams enroll as a cohort?',
      a: 'Yes. We offer custom corporate training tracks for ISPs, WISPs, schools, and enterprise IT teams with flexible weekend or evening scheduling.'
    }
  ]

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-800">
      <AltavoxHeader />

      <main className="flex-1 pb-16">
        {/* Course Hero Banner */}
        <section className="bg-gradient-to-b from-[#07294d] via-[#093563] to-[#051c36] text-white py-12 lg:py-16 border-b border-white/10">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:px-8">
            <div>
              <nav className="mb-5 flex items-center gap-2 text-xs text-sky-200">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span>/</span>
                <Link href="/academy" className="hover:text-white transition-colors">Altavox Academy</Link>
                <span>/</span>
                <span className="text-orange-300">{course.category}</span>
              </nav>

              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="rounded bg-[#f26522]/20 border border-[#f26522]/40 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-[#f48b57]">
                  {course.category}
                </span>
                <span className="rounded bg-white/10 border border-white/15 px-2.5 py-0.5 text-xs font-semibold text-slate-200">
                  {course.difficulty}
                </span>
                {course.badge && (
                  <span className="rounded bg-sky-500/20 border border-sky-400/30 px-2.5 py-0.5 text-xs font-semibold text-sky-200">
                    {course.badge}
                  </span>
                )}
              </div>

              <h1 className="mt-2 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl text-white">
                {course.title}
              </h1>

              <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-200">
                {course.overview}
              </p>

              <div className="mt-6 flex flex-wrap items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-mono font-extrabold text-white">
                  ${course.discountPrice} USD
                </span>
                <span className="text-sm font-mono text-slate-400 line-through">
                  ${course.originalPrice} USD
                </span>
                <span className="text-xs text-orange-300 font-semibold">
                  (Regional: TZS {course.priceTZS.toLocaleString()})
                </span>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="#course-enquiry"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#f26522] px-6 py-3.5 text-sm font-bold text-white shadow-lg hover:bg-[#d9531e] transition-colors"
                >
                  <CreditCard className="size-4" /> Enroll with PayPal / Card <ArrowRight className="size-4" />
                </a>
                <Link
                  href="/academy"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  <ArrowLeft className="size-4" /> All 20 Courses
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-xl">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-xs">
                  <Clock3 className="size-4 text-[#f26522]" />
                  <p className="mt-2 text-[10px] uppercase font-bold tracking-wider text-slate-400">Duration</p>
                  <p className="mt-0.5 text-xs font-bold text-white">{course.duration}</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-xs">
                  <BookOpen className="size-4 text-[#f26522]" />
                  <p className="mt-2 text-[10px] uppercase font-bold tracking-wider text-slate-400">Curriculum</p>
                  <p className="mt-0.5 text-xs font-bold text-white">{course.modules.length} Modules</p>
                </div>
                <div className="col-span-2 sm:col-span-1 rounded-xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-xs">
                  <Layers className="size-4 text-emerald-400" />
                  <p className="mt-2 text-[10px] uppercase font-bold tracking-wider text-slate-400">Practical Labs</p>
                  <p className="mt-0.5 text-xs font-bold text-white">{course.practicalProjects.length} Capstones</p>
                </div>
              </div>
            </div>

            {/* Course Visual Banner */}
            <div className="relative aspect-[16/11] w-full overflow-hidden rounded-2xl border border-white/15 bg-slate-900 shadow-2xl">
              <Image
                src={course.image}
                alt={course.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-black/30" />
              <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/15 bg-slate-900/80 p-4 backdrop-blur-md">
                <p className="text-[10px] font-bold uppercase tracking-wider text-orange-400">
                  Core Skills Focus
                </p>
                <p className="mt-1 text-xs text-slate-200 leading-relaxed font-medium">
                  {course.skillsCovered.slice(0, 4).join(' • ')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Course Core Content & Sidebar Grid */}
        <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
          <div className="space-y-10">
            {/* 1. Learning Objectives */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="flex size-10 items-center justify-center rounded-xl bg-[#f26522]/10 text-[#f26522]">
                  <Target className="size-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#07294d]">Learning Objectives & Outcomes</h2>
                  <p className="text-xs text-slate-500">Measurable competencies acquired upon successful graduation.</p>
                </div>
              </div>
              <div className="mt-6 grid gap-3.5 sm:grid-cols-2">
                {course.learningObjectives.map((obj, idx) => (
                  <div key={idx} className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-4 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#f26522]" />
                    <span className="leading-relaxed">{obj}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 2. Practical Capstone Projects */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="flex size-10 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
                  <Layers className="size-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#07294d]">Practical Capstone Projects</h2>
                  <p className="text-xs text-slate-500">End-to-end commercial architectures engineered from scratch.</p>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                {course.practicalProjects.map((proj, idx) => (
                  <article key={idx} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#f26522]">
                        Capstone 0{idx + 1}
                      </span>
                      <span className="rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5">
                        Production Deliverable
                      </span>
                    </div>
                    <h3 className="mt-2 text-base font-bold text-[#07294d]">{proj.title}</h3>
                    <p className="mt-1 text-xs text-slate-600 leading-relaxed">{proj.description}</p>
                    <div className="mt-3 rounded-lg border border-slate-200 bg-white p-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Verified Deliverable:
                      </span>
                      <p className="mt-0.5 text-xs font-medium text-slate-700">{proj.deliverable}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* 3. Detailed Curriculum Syllabus */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="flex size-10 items-center justify-center rounded-xl bg-[#f26522]/10 text-[#f26522]">
                  <BookOpen className="size-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#07294d]">Comprehensive Curriculum Outline</h2>
                  <p className="text-xs text-slate-500">Module-by-module breakdown with guided lab exercises.</p>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                {course.modules.map((mod, index) => (
                  <div key={mod.week} className="rounded-xl border border-slate-200 bg-white p-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#f26522]">
                        {mod.week}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        Module {index + 1} of {course.modules.length}
                      </span>
                    </div>
                    <h3 className="mt-2 text-base font-bold text-[#07294d]">{mod.title}</h3>
                    <ul className="mt-3.5 grid gap-2 sm:grid-cols-2">
                      {mod.topics.map((topic) => (
                        <li key={topic} className="flex gap-2 text-xs sm:text-sm text-slate-600">
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#f26522]" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 rounded-lg border-l-4 border-[#f26522] bg-orange-50/70 p-3.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#c94e16] block">
                        Hands-on Lab Exercise:
                      </span>
                      <p className="mt-0.5 text-xs font-medium text-slate-700">{mod.project}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. Prerequisites & Hardware Requirements */}
            <section className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                <div className="flex items-center gap-2.5 text-[#07294d]">
                  <CheckCircle2 className="size-5 text-[#f26522]" />
                  <h3 className="text-base font-bold">Prerequisites</h3>
                </div>
                <ul className="mt-4 space-y-2.5">
                  {course.prerequisites.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                      <span className="mt-1 size-1 rounded-full bg-slate-400" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
                <div className="flex items-center gap-2.5 text-[#07294d]">
                  <Laptop className="size-5 text-sky-600" />
                  <h3 className="text-base font-bold">Hardware Requirements</h3>
                </div>
                <p className="mt-4 text-xs text-slate-600 leading-relaxed">
                  {course.hardwareRequirements}
                </p>
                <div className="mt-4 rounded-lg bg-sky-50 p-3 border border-sky-100 text-[11px] text-sky-900 leading-relaxed">
                  Altavox Tech provides developer environment onboarding and virtual laboratory instances.
                </div>
              </div>
            </section>

            {/* 5. FAQs */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="flex size-10 items-center justify-center rounded-xl bg-orange-100 text-[#f26522]">
                  <HelpCircle className="size-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#07294d]">Frequently Asked Questions</h2>
                  <p className="text-xs text-slate-500">Everything you need to know before enrolling.</p>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                {faqs.map((f, i) => (
                  <div key={i} className="rounded-xl border border-slate-100 bg-slate-50/60 p-4">
                    <h3 className="font-bold text-sm text-[#07294d]">{f.q}</h3>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">{f.a}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sticky Enrollment Sidebar with PayPal Checkout */}
          <aside id="course-enquiry" className="space-y-6">
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#f26522]">
                ALTAVOX ACADEMY ENROLLMENT
              </span>
              <h3 className="mt-1 text-xl font-bold text-[#07294d]">Secure Course Enrollment</h3>

              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-slate-500">Tuition Fee:</span>
                  <span className="text-2xl font-mono font-extrabold text-[#07294d]">
                    ${course.discountPrice} USD
                  </span>
                </div>
                <div className="mt-1 flex justify-between text-[11px] text-slate-400">
                  <span>Regular: ${course.originalPrice}</span>
                  <span>TZS {course.priceTZS.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-5">
                <CourseEnrollmentActions course={course} />
              </div>

              <div className="mt-6 border-t border-slate-100 pt-4 text-xs text-slate-500 space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-emerald-600" />
                  <span>Immediate access to student LMS dashboard</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-emerald-600" />
                  <span>Server-side PayPal & card payment verification</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-emerald-600" />
                  <span>Authenticated completion certificate upon defense</span>
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-[#07294d] p-4 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400">
                  Campus & Virtual NOC
                </span>
                <p className="mt-1 text-xs text-slate-200 font-medium">
                  Nduruma Road, Unguuni, Arusha, Tanzania.
                </p>
                <p className="mt-1 text-[11px] text-slate-400">
                  Hybrid: On-site labs + interactive virtual classroom.
                </p>
              </div>
            </div>
          </aside>
        </section>

        {/* Related Pathways */}
        <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
          <div className="border-t border-slate-200 pt-10">
            <h2 className="text-xl font-bold text-[#07294d]">Related Engineering Pathways</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              {relatedCourses.map((item) => (
                <Link
                  key={item.id}
                  href={`/academy/courses/${item.slug}`}
                  className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-[#f26522] hover:shadow-md flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#f26522]">
                      {item.category}
                    </span>
                    <h3 className="mt-1.5 font-bold text-[#07294d] text-base leading-snug">{item.title}</h3>
                    <p className="mt-2 line-clamp-2 text-xs text-slate-600 leading-relaxed">
                      {item.overview}
                    </p>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#f26522]">
                    View Course <ArrowRight className="size-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <AltavoxFooter />
    </div>
  )
}
