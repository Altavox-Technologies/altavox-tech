'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'
import {
  Activity,
  ArrowRight,
  Check,
  CheckCircle2,
  CloudUpload,
  Database,
  ExternalLink,
  FolderPlus,
  Loader2,
  LogIn,
  LogOut,
  PhoneCall,
  RefreshCw,
  Trash2,
  X,
} from 'lucide-react'
import { AltavoxHeader } from '@/components/altavox-header'
import { AltavoxFooter } from '@/components/altavox-footer'
import { ProjectPreview } from '@/components/project-preview'
import { useFirebaseAuth } from '@/components/firebase-provider'
import { ProjectItem, projects as staticProjects } from '@/lib/site-data'
import {
  deleteProjectFromFirestore,
  mergeProjectsWithStatic,
  saveProjectInFirestore,
  subscribePublicProjects,
  syncAllProjectsToFirestore,
} from '@/lib/firebase-projects'

export default function ProjectsPage() {
  const { user, isAdmin, signInWithGoogle, signOutFirebase } = useFirebaseAuth()
  const [firestoreProjects, setFirestoreProjects] = useState<ProjectItem[]>([])
  const [firestoreSynced, setFirestoreSynced] = useState(false)
  const [activeFilter, setActiveFilter] = useState<'all' | 'client' | 'ecosystem'>('all')
  const [syncingAll, setSyncingAll] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [savingProject, setSavingProject] = useState(false)

  // New / Edit project form state
  const [formState, setFormState] = useState({
    slug: '',
    name: '',
    category: 'Software Engineering',
    client: 'Altavox Technologies',
    summary: '',
    description: '',
    engineeringChallenge: '',
    engineeringSolution: '',
    status: 'Production' as ProjectItem['status'],
    projectGroup: 'client' as 'client' | 'ecosystem',
    url: 'https://altavox.space',
    screenshotUrl: '',
    tagsInput: 'Next.js, TypeScript, Firebase',
    featuresInput: 'Production architecture\nRole-based security',
  })

  useEffect(() => {
    const unsubscribe = subscribePublicProjects((items) => {
      setFirestoreProjects(items)
      setFirestoreSynced(true)
    })
    return () => unsubscribe()
  }, [])

  const allProjects = useMemo(
    () => mergeProjectsWithStatic(firestoreProjects),
    [firestoreProjects]
  )

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return allProjects
    return allProjects.filter((p) => p.projectGroup === activeFilter)
  }, [allProjects, activeFilter])

  const clientCount = allProjects.filter((p) => p.projectGroup === 'client').length
  const ecosystemCount = allProjects.filter((p) => p.projectGroup === 'ecosystem').length

  async function handleSyncAllToFirebase() {
    if (!user || !isAdmin) return
    setSyncingAll(true)
    setFeedback(null)
    try {
      const count = await syncAllProjectsToFirestore(user.uid)
      setFeedback({
        type: 'success',
        text: `Synced ${count} portfolio projects to Firebase Firestore.`,
      })
    } catch (err: unknown) {
      setFeedback({
        type: 'error',
        text: err instanceof Error ? err.message : 'Unable to sync projects to Firestore.',
      })
    } finally {
      setSyncingAll(false)
    }
  }

  async function handleSaveProject(e: React.FormEvent) {
    e.preventDefault()
    if (!user || !isAdmin) return
    setSavingProject(true)
    setFeedback(null)

    try {
      const tags = formState.tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
      const keyFeatures = formState.featuresInput
        .split('\n')
        .map((f) => f.trim())
        .filter(Boolean)

      const newProj: ProjectItem = {
        slug: formState.slug.trim().toLowerCase(),
        name: formState.name.trim(),
        category: formState.category.trim(),
        client: formState.client.trim(),
        summary: formState.summary.trim(),
        description: formState.description.trim(),
        engineeringChallenge: formState.engineeringChallenge.trim() || undefined,
        engineeringSolution: formState.engineeringSolution.trim() || undefined,
        status: formState.status,
        projectGroup: formState.projectGroup,
        visibility: 'public',
        url: formState.url.trim(),
        screenshotUrl: formState.screenshotUrl.trim() || undefined,
        tags,
        keyFeatures,
      }

      await saveProjectInFirestore(newProj, user.uid)
      setModalOpen(false)
      setFeedback({
        type: 'success',
        text: `Project "${newProj.name}" saved to Firebase Firestore.`,
      })
    } catch (err: unknown) {
      setFeedback({
        type: 'error',
        text: err instanceof Error ? err.message : 'Failed to save project.',
      })
    } finally {
      setSavingProject(false)
    }
  }

  async function handleDeleteFirestoreProject(slug: string, name: string) {
    if (!user || !isAdmin) return
    try {
      await deleteProjectFromFirestore(slug)
      setFeedback({
        type: 'success',
        text: `Removed Firestore document for "${name}".`,
      })
    } catch (err: unknown) {
      setFeedback({
        type: 'error',
        text: err instanceof Error ? err.message : 'Unable to delete project.',
      })
    }
  }

  const firestoreSlugSet = useMemo(
    () => new Set(firestoreProjects.map((p) => p.slug)),
    [firestoreProjects]
  )

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 selection:bg-[#f26522] selection:text-white font-sans">
      <AltavoxHeader />

      <main className="flex-1">
        {/* Executive Hero Banner */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#07294d] via-[#093563] to-[#051c36] text-white py-16 sm:py-20 border-b border-white/10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-[#f26522]/20 border border-[#f26522]/40 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-orange-200 mb-4">
                <Activity className="size-3.5 text-[#f26522]" />
                <span>Complete Projects Portfolio & Cloud Registry</span>
              </div>

              <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
                <div className="lg:col-span-8 space-y-4">
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                    Software Platforms. <span className="text-[#f26522]">Built for Real Operations.</span>
                  </h1>
                  <p className="max-w-2xl text-base sm:text-lg text-slate-200 leading-relaxed">
                    Every Altavox client platform and digital ecosystem product in one unified registry—spanning ISP automation, education SIMS, creative commerce, hotspot infrastructure, and technical education.
                  </p>
                </div>

                <div className="lg:col-span-4 border-l-2 border-[#f26522] pl-6 py-4 bg-white/5 rounded-r-2xl border border-white/10 backdrop-blur-md space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-3xl font-extrabold text-white font-mono">
                      {String(allProjects.length).padStart(2, '0')}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-300">
                      <Database className="size-3" />
                      {firestoreSynced ? `${firestoreProjects.length} synced in Firebase` : 'Connecting Firebase...'}
                    </span>
                  </div>
                  <span className="block text-xs uppercase font-bold tracking-wider text-orange-300">
                    Unified Engineering Projects
                  </span>
                  <p className="text-[11px] text-slate-300">
                    {clientCount} Client Deployments · {ecosystemCount} Altavox Ecosystem Platforms
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filter & Firebase Portfolio Management Toolbar */}
        <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: `All Projects (${allProjects.length})` },
                { id: 'client', label: `Client Deployments (${clientCount})` },
                { id: 'ecosystem', label: `Altavox Ecosystem (${ecosystemCount})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id as 'all' | 'client' | 'ecosystem')}
                  className={`rounded-xl px-4 py-2 text-xs font-bold transition cursor-pointer ${
                    activeFilter === tab.id
                      ? 'bg-[#07294d] text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {user ? (
                <>
                  {isAdmin && (
                    <>
                      <button
                        type="button"
                        onClick={handleSyncAllToFirebase}
                        disabled={syncingAll}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs font-bold text-[#07294d] hover:bg-slate-100 transition cursor-pointer disabled:opacity-50"
                      >
                        {syncingAll ? (
                          <Loader2 className="size-3.5 animate-spin text-[#f26522]" />
                        ) : (
                          <CloudUpload className="size-3.5 text-[#f26522]" />
                        )}
                        <span>Sync Portfolio to Firebase</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setModalOpen(true)}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-[#f26522] px-4 py-2 text-xs font-bold text-white hover:bg-[#d9531e] transition shadow-xs cursor-pointer"
                      >
                        <FolderPlus className="size-3.5" />
                        <span>Add Project</span>
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => void signOutFirebase()}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                  >
                    <LogOut className="size-3.5" />
                    <span>{user.email}</span>
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => void signInWithGoogle()}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs font-bold text-[#07294d] hover:bg-slate-100 transition cursor-pointer"
                >
                  <LogIn className="size-3.5 text-[#f26522]" />
                  <span>Admin Sign In (Firebase)</span>
                </button>
              )}
            </div>
          </div>

          {feedback && (
            <div
              className={`mt-4 flex items-center justify-between rounded-xl border px-4 py-3 text-xs font-semibold ${
                feedback.type === 'success'
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                  : 'border-rose-200 bg-rose-50 text-rose-800'
              }`}
            >
              <span className="flex items-center gap-2">
                <CheckCircle2 className="size-4 shrink-0" />
                {feedback.text}
              </span>
              <button type="button" onClick={() => setFeedback(null)} className="p-1">
                <X className="size-3.5" />
              </button>
            </div>
          )}
        </section>

        {/* Projects Showcase Grid */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end">
            <div>
              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#f26522]">
                Our Portfolio
              </span>
              <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold text-[#07294d]">
                Featured Platforms & Ecosystem Systems
              </h2>
            </div>
            <p className="max-w-md text-xs sm:text-sm text-slate-500">
              Inspect verified architectures, sandboxed live previews, and repository capabilities. Records synchronized via Firebase Firestore when published.
            </p>
          </div>

          <div className="space-y-12">
            {filteredProjects.map((project, index) => (
              <motion.article
                id={project.slug}
                key={project.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.25), ease: [0.22, 1, 0.36, 1] }}
                className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm hover:border-[#f26522] transition-colors duration-150"
              >
                <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 items-center">
                  <div className="lg:col-span-6 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#f26522]">
                        {String(index + 1).padStart(2, '0')} // {project.category}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-700">
                          {project.projectGroup === 'client' ? 'Client System' : 'Altavox Platform'}
                        </span>
                        <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">
                          {project.status}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#07294d]">{project.name}</h3>
                    <p className="text-sm font-semibold text-slate-700 leading-relaxed">{project.summary}</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{project.description}</p>

                    {(project.engineeringChallenge || project.engineeringSolution) && (
                      <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200 text-xs space-y-2">
                        {project.engineeringChallenge && (
                          <div>
                            <span className="font-bold text-[#07294d] uppercase text-[10px] tracking-wider block">
                              Engineering Challenge:
                            </span>
                            <p className="text-slate-600 mt-0.5 leading-relaxed">{project.engineeringChallenge}</p>
                          </div>
                        )}
                        {project.engineeringSolution && (
                          <div className="pt-2 border-t border-slate-200/60">
                            <span className="font-bold text-[#f26522] uppercase text-[10px] tracking-wider block">
                              Engineering Solution:
                            </span>
                            <p className="text-slate-700 mt-0.5 leading-relaxed font-medium">{project.engineeringSolution}</p>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-slate-200 bg-slate-100 px-2.5 py-1 text-[11px] font-mono text-slate-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Core Capabilities:
                      </p>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {project.keyFeatures.map((feature) => (
                          <li key={feature} className="flex items-start gap-2.5">
                            <Check className="mt-0.5 size-4 shrink-0 text-[#f26522]" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 flex flex-wrap items-center gap-3">
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl bg-[#f26522] px-5 py-3 text-xs font-bold text-white shadow-md hover:bg-[#e05312] transition cursor-pointer"
                        >
                          <span>Open Platform</span>
                          <ExternalLink className="size-3.5" />
                        </a>
                      )}
                      <Link
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-xs font-semibold text-[#07294d] hover:bg-slate-100 transition"
                      >
                        <span>Architecture Spec</span>
                        <ArrowRight className="size-3.5" />
                      </Link>
                      {isAdmin && firestoreSlugSet.has(project.slug) && !staticProjects.some((s) => s.slug === project.slug) && (
                        <button
                          type="button"
                          onClick={() => void handleDeleteFirestoreProject(project.slug, project.name)}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3 py-3 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition cursor-pointer"
                        >
                          <Trash2 className="size-3.5" />
                          <span>Delete</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Locked, read-only embedded website preview */}
                  <div className="lg:col-span-6">
                    <ProjectPreview
                      project={project}
                      projectName={project.name}
                      projectUrl={project.url}
                      screenshot={project.screenshotUrl}
                      initialMode={
                        project.slug === 'mrisho-art' || project.slug === 'mrisho-art-gallery' || !project.screenshotUrl
                          ? 'iframe'
                          : 'screenshot'
                      }
                    />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Bottom CTA Section */}
        <section className="bg-slate-100 py-16 border-t border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-[#07294d] text-white p-8 sm:p-12 shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="max-w-2xl space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-300">
                  Engineering Partnership
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Have an Operational Platform to Architect?
                </h3>
                <p className="text-sm text-slate-300">
                  From custom ISP billing bridges to school SIMS portals, our team builds dependable software systems that stay running.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/start-project"
                  className="rounded-xl bg-[#f26522] px-6 py-3.5 text-xs font-bold text-white shadow-md hover:bg-[#e05312] transition"
                >
                  Start a Project
                </Link>
                <a
                  href="tel:+255750227073"
                  className="rounded-xl border border-white/20 bg-white/10 px-4 py-3.5 text-xs font-semibold text-white hover:bg-white/20 transition flex items-center gap-2"
                >
                  <PhoneCall className="size-4 text-[#f26522]" />
                  <span>+255 750 227 073</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Admin Add Project Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#f26522]">
                  Firebase Firestore Admin
                </span>
                <h3 className="text-lg font-extrabold text-[#07294d]">Add Portfolio Project</h3>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="mt-4 space-y-4 text-xs">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block font-bold text-slate-700">Project Name *</label>
                  <input
                    required
                    value={formState.name}
                    onChange={(e) => {
                      const name = e.target.value
                      const autoSlug = name
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/^-|-$/g, '')
                      setFormState((s) => ({
                        ...s,
                        name,
                        slug: s.slug || autoSlug,
                      }))
                    }}
                    placeholder="e.g. Arusha Fiber Mesh"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-[#f26522]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700">URL Slug *</label>
                  <input
                    required
                    pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
                    value={formState.slug}
                    onChange={(e) => setFormState((s) => ({ ...s, slug: e.target.value.toLowerCase() }))}
                    placeholder="arusha-fiber-mesh"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-mono outline-none focus:border-[#f26522]"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block font-bold text-slate-700">Category *</label>
                  <input
                    required
                    value={formState.category}
                    onChange={(e) => setFormState((s) => ({ ...s, category: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-[#f26522]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700">Group *</label>
                  <select
                    value={formState.projectGroup}
                    onChange={(e) =>
                      setFormState((s) => ({
                        ...s,
                        projectGroup: e.target.value === 'ecosystem' ? 'ecosystem' : 'client',
                      }))
                    }
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-[#f26522]"
                  >
                    <option value="client">Client Platform</option>
                    <option value="ecosystem">Altavox Ecosystem</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700">Status *</label>
                  <select
                    value={formState.status}
                    onChange={(e) =>
                      setFormState((s) => ({
                        ...s,
                        status: e.target.value as ProjectItem['status'],
                      }))
                    }
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-[#f26522]"
                  >
                    <option value="Production">Production</option>
                    <option value="In development">In development</option>
                    <option value="Exploration">Exploration</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block font-bold text-slate-700">Client / Operator *</label>
                  <input
                    required
                    value={formState.client}
                    onChange={(e) => setFormState((s) => ({ ...s, client: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-[#f26522]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700">Platform URL *</label>
                  <input
                    required
                    type="url"
                    value={formState.url}
                    onChange={(e) => setFormState((s) => ({ ...s, url: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-mono outline-none focus:border-[#f26522]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700">Short Summary (min 10 chars) *</label>
                <input
                  required
                  minLength={10}
                  value={formState.summary}
                  onChange={(e) => setFormState((s) => ({ ...s, summary: e.target.value }))}
                  placeholder="Concise one-sentence operational description"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-[#f26522]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700">Full Technical Description (min 10 chars) *</label>
                <textarea
                  required
                  minLength={10}
                  rows={3}
                  value={formState.description}
                  onChange={(e) => setFormState((s) => ({ ...s, description: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-[#f26522]"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block font-bold text-slate-700">Tags (comma separated)</label>
                  <input
                    value={formState.tagsInput}
                    onChange={(e) => setFormState((s) => ({ ...s, tagsInput: e.target.value }))}
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-[#f26522]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700">Screenshot URL (optional)</label>
                  <input
                    value={formState.screenshotUrl}
                    onChange={(e) => setFormState((s) => ({ ...s, screenshotUrl: e.target.value }))}
                    placeholder="/projects/jaslyn-net-live.png"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 font-mono outline-none focus:border-[#f26522]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700">Key Capabilities (one per line)</label>
                <textarea
                  rows={3}
                  value={formState.featuresInput}
                  onChange={(e) => setFormState((s) => ({ ...s, featuresInput: e.target.value }))}
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-[#f26522]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl border border-slate-300 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingProject}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#f26522] px-5 py-2 font-bold text-white hover:bg-[#d9531e] disabled:opacity-50"
                >
                  {savingProject ? <Loader2 className="size-3.5 animate-spin" /> : <RefreshCw className="size-3.5" />}
                  <span>Save Project to Firestore</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <AltavoxFooter />
    </div>
  )
}
