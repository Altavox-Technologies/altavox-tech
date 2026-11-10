import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, Clock3, Code2, GraduationCap, Target } from 'lucide-react'
import { AltavoxHeader } from '@/components/altavox-header'
import { AltavoxFooter } from '@/components/altavox-footer'
import { CourseDetailActions } from '@/components/course-detail-actions'
import { coursesData } from '@/lib/courses-data'

export function generateStaticParams() {
  return coursesData.map((course) => ({ slug: course.slug }))
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const course = coursesData.find((item) => item.slug === slug)
  if (!course) notFound()

  const relatedCourses = coursesData.filter((item) => item.id !== course.id).slice(0, 3)

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-800">
      <AltavoxHeader />
      <main className="flex-1">
        <section className="bg-[#071d34] text-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:px-8 lg:py-16">
            <div>
              <nav className="mb-6 flex items-center gap-2 text-xs text-slate-300">
                <Link href="/" className="hover:text-white">Home</Link><span>/</span>
                <Link href="/courses" className="hover:text-white">Academy</Link><span>/</span>
                <span className="text-orange-300">{course.category}</span>
              </nav>
              <p className="text-xs font-bold uppercase tracking-[.22em] text-orange-400">Altavox Academy · Course pathway</p>
              <h1 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">{course.title}</h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">{course.overview}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="#course-enquiry" className="inline-flex items-center gap-2 bg-[#f26522] px-5 py-3 text-sm font-bold text-white hover:bg-[#df5518]">Enquire about this course <ArrowRight className="size-4" /></a>
                <Link href="/courses" className="inline-flex items-center gap-2 border border-white/25 px-5 py-3 text-sm font-bold text-white hover:bg-white/10"><ArrowLeft className="size-4" /> All courses</Link>
              </div>
              <div className="mt-8 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-3">
                <div className="border border-white/15 bg-white/5 p-3"><Clock3 className="size-4 text-orange-400"/><p className="mt-2 text-[10px] uppercase tracking-wide text-slate-400">Duration</p><p className="mt-1 text-xs font-semibold">Confirm with Academy</p></div>
                <div className="border border-white/15 bg-white/5 p-3"><BookOpen className="size-4 text-orange-400"/><p className="mt-2 text-[10px] uppercase tracking-wide text-slate-400">Curriculum</p><p className="mt-1 text-xs font-semibold">{course.modules.length} learning modules</p></div>
                <div className="col-span-2 border border-white/15 bg-white/5 p-3 sm:col-span-1"><GraduationCap className="size-4 text-orange-400"/><p className="mt-2 text-[10px] uppercase tracking-wide text-slate-400">Learning style</p><p className="mt-1 text-xs font-semibold">Project-focused</p></div>
              </div>
            </div>
            <div className="relative overflow-hidden border border-white/15 bg-white/5">
              <img src={course.image} alt={course.imageAlt} className="aspect-[16/10] w-full object-cover" />
              <div className="border-t border-white/10 p-4 sm:p-5">
                <p className="text-[10px] font-bold uppercase tracking-[.2em] text-orange-300">Course focus</p>
                <p className="mt-2 text-sm leading-6 text-slate-200">{course.skillsCovered.slice(0, 4).join(' · ')}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_340px] lg:px-8">
          <div className="space-y-8">
            <section className="border border-slate-200 bg-white p-6 sm:p-8">
              <div className="flex items-center gap-3"><Target className="size-5 text-[#f26522]"/><h2 className="text-xl font-semibold text-[#071d34]">What you will learn</h2></div>
              <p className="mt-3 text-sm leading-6 text-slate-600">The course is structured around practical skills that can be demonstrated through exercises and a final project.</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {course.skillsCovered.map((skill) => <div key={skill} className="flex items-start gap-2 text-sm text-slate-700"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#f26522]"/><span>{skill}</span></div>)}
              </div>
            </section>

            <section className="border border-slate-200 bg-white p-6 sm:p-8">
              <div className="flex items-center gap-3"><BookOpen className="size-5 text-[#f26522]"/><h2 className="text-xl font-semibold text-[#071d34]">Course syllabus</h2></div>
              <p className="mt-2 text-sm leading-6 text-slate-600">A practical outline of the subjects and project work covered in this learning pathway. The Academy will confirm the final delivery schedule.</p>
              <div className="mt-6 space-y-4">
                {course.modules.map((module, index) => <article key={module.week} className="border border-slate-200 p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2"><span className="text-[10px] font-bold uppercase tracking-[.18em] text-[#f26522]">{module.week}</span><span className="text-[10px] text-slate-400">Module {index + 1} of {course.modules.length}</span></div>
                  <h3 className="mt-2 text-base font-bold text-[#071d34]">{module.title}</h3>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">{module.topics.map((topic) => <li key={topic} className="flex gap-2 text-sm leading-5 text-slate-600"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#f26522]"/>{topic}</li>)}</ul>
                  <div className="mt-5 border-l-2 border-[#f26522] bg-orange-50 px-4 py-3"><p className="text-[10px] font-bold uppercase tracking-wide text-[#a94316]">Practical project</p><p className="mt-1 text-sm font-medium leading-5 text-slate-700">{module.project}</p></div>
                </article>)}
              </div>
            </section>

            <section className="grid gap-5 sm:grid-cols-2">
              <div className="border border-slate-200 bg-white p-6"><h2 className="text-base font-bold text-[#071d34]">Who should take this course?</h2><ul className="mt-4 space-y-3">{course.targetAudience.map((item) => <li key={item} className="flex gap-2 text-sm leading-5 text-slate-600"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#f26522]"/>{item}</li>)}</ul></div>
              <div className="border border-slate-200 bg-white p-6"><h2 className="text-base font-bold text-[#071d34]">Possible career pathways</h2><ul className="mt-4 space-y-3">{course.careerRoles.map((item) => <li key={item} className="flex gap-2 text-sm leading-5 text-slate-600"><Code2 className="mt-0.5 size-4 shrink-0 text-[#f26522]"/>{item}</li>)}</ul><p className="mt-4 text-xs leading-5 text-slate-500">These are example pathways, not a promise of employment or placement.</p></div>
            </section>

            <section className="border border-slate-200 bg-white p-6 sm:p-8"><h2 className="text-lg font-bold text-[#071d34]">Assessment & completion</h2><p className="mt-3 text-sm leading-6 text-slate-600">{course.certificationAlignment}</p><p className="mt-3 text-xs leading-5 text-slate-500">Course completion requirements, assessment format and any certificate arrangements will be confirmed by Altavox Academy before enrolment.</p></section>
          </div>

          <aside id="course-enquiry" className="space-y-5">
            <div className="border border-slate-200 bg-white p-6">
              <p className="text-xs font-bold uppercase tracking-[.18em] text-[#f26522]">Interested in this pathway?</p>
              <h2 className="mt-2 text-xl font-semibold text-[#071d34]">Get course information</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">Ask the Academy to confirm fees, duration, delivery format, entry requirements and the next available intake before you enrol.</p>
              <div className="mt-5"><CourseDetailActions courseTitle={course.title}/></div>
              <p className="mt-4 text-xs leading-5 text-slate-500">No payment is taken through this enquiry. Enrolment details are shared after the Academy responds.</p>
            </div>
            <div className="border border-slate-200 bg-[#071d34] p-6 text-white"><h3 className="text-base font-bold">Learning with purpose</h3><p className="mt-2 text-sm leading-6 text-slate-300">Altavox Academy focuses on technology skills, guided practice and demonstrable project work.</p><Link href="/courses" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-orange-300 hover:text-white">Explore other courses <ArrowRight className="size-4"/></Link></div>
          </aside>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8"><div className="border-t border-slate-200 pt-8"><h2 className="text-xl font-semibold text-[#071d34]">Explore related learning paths</h2><div className="mt-5 grid gap-4 sm:grid-cols-3">{relatedCourses.map((item)=><Link key={item.id} href={`/courses/${item.slug}`} className="border border-slate-200 bg-white p-5 transition hover:border-[#f26522]"><p className="text-[10px] font-bold uppercase tracking-wide text-[#f26522]">{item.category}</p><h3 className="mt-2 font-bold text-[#071d34]">{item.title}</h3><p className="mt-2 line-clamp-3 text-xs leading-5 text-slate-500">{item.overview}</p><span className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#f26522]">View course <ArrowRight className="size-3.5"/></span></Link>)}</div></div></section>
      </main>
      <AltavoxFooter />
    </div>
  )
}
