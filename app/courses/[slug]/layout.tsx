import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Course Details',
  description: 'Explore course information, learning outcomes and syllabus details from Altavox Academy.',
  alternates: { canonical: '/courses' },
  openGraph: { type: 'website', title: 'Course Details | Altavox Technologies', description: 'Explore course information, learning outcomes and syllabus details from Altavox Academy.', url: '/courses', siteName: 'Altavox Technologies' },
  twitter: { card: 'summary', title: 'Course Details | Altavox Technologies', description: 'Explore course information, learning outcomes and syllabus details from Altavox Academy.' },
}

export default function RouteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
