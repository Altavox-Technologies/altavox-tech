import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  type Unsubscribe,
} from 'firebase/firestore'
import { db, handleFirestoreError, OperationType } from '@/lib/firebase'
import { ProjectItem, projects as staticProjects } from '@/lib/site-data'

const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export interface FirestoreProjectRecord {
  slug: string
  name: string
  category: string
  client: string
  summary: string
  description: string
  engineeringChallenge?: string
  engineeringSolution?: string
  status: 'In development' | 'Production' | 'Exploration' | 'Archived'
  projectGroup: 'client' | 'ecosystem'
  visibility: 'public' | 'private'
  url: string
  screenshotUrl?: string
  tags: string[]
  keyFeatures: string[]
  frontendStack?: string
  backendStack?: string
  databaseStack?: string
  infrastructureStack?: string
  ownerUid: string
}

function mapFirestoreDocToProjectItem(data: Record<string, unknown>, id: string): ProjectItem {
  const status = (['Production', 'In development', 'Exploration', 'Archived'].includes(String(data.status))
    ? data.status
    : 'Production') as ProjectItem['status']
  const projectGroup = data.projectGroup === 'ecosystem' ? 'ecosystem' : 'client'

  return {
    slug: String(data.slug || id),
    name: String(data.name || 'Untitled Project'),
    category: String(data.category || 'Software Engineering'),
    client: String(data.client || 'Altavox Technologies'),
    summary: String(data.summary || ''),
    description: String(data.description || ''),
    ...(typeof data.engineeringChallenge === 'string' && data.engineeringChallenge
      ? { engineeringChallenge: data.engineeringChallenge }
      : {}),
    ...(typeof data.engineeringSolution === 'string' && data.engineeringSolution
      ? { engineeringSolution: data.engineeringSolution }
      : {}),
    status,
    projectGroup,
    visibility: data.visibility === 'private' ? 'private' : 'public',
    url: String(data.url || 'https://altavox.space'),
    ...(typeof data.screenshotUrl === 'string' && data.screenshotUrl
      ? { screenshotUrl: data.screenshotUrl }
      : {}),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : ['Altavox Tech'],
    keyFeatures: Array.isArray(data.keyFeatures)
      ? data.keyFeatures.map(String)
      : ['Production software architecture'],
    architecture: {
      frontend: String(data.frontendStack || 'Next.js, TypeScript, Tailwind CSS'),
      backend: String(data.backendStack || 'Node.js & REST APIs'),
      database: String(data.databaseStack || 'PostgreSQL / Firebase Firestore'),
      infrastructure: String(data.infrastructureStack || 'Managed Cloud Containers & TLS'),
    },
  }
}

export function mergeProjectsWithStatic(firestoreProjects: ProjectItem[]): ProjectItem[] {
  const bySlug = new Map<string, ProjectItem>()
  for (const item of staticProjects) {
    bySlug.set(item.slug, item)
  }
  for (const fsItem of firestoreProjects) {
    const existing = bySlug.get(fsItem.slug)
    bySlug.set(fsItem.slug, existing ? { ...existing, ...fsItem } : fsItem)
  }
  return Array.from(bySlug.values())
}

export function subscribePublicProjects(
  onData: (items: ProjectItem[]) => void
): Unsubscribe {
  const path = 'projects'
  const q = query(collection(db, path), where('visibility', '==', 'public'))
  return onSnapshot(
    q,
    (snapshot) => {
      const items = snapshot.docs.map((docSnap) =>
        mapFirestoreDocToProjectItem(docSnap.data() as Record<string, unknown>, docSnap.id)
      )
      onData(items)
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, path)
    }
  )
}

export async function fetchPublicProjectsOnce(): Promise<ProjectItem[]> {
  const path = 'projects'
  try {
    const q = query(collection(db, path), where('visibility', '==', 'public'))
    const snap = await getDocs(q)
    return snap.docs.map((docSnap) =>
      mapFirestoreDocToProjectItem(docSnap.data() as Record<string, unknown>, docSnap.id)
    )
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path)
  }
}

function buildValidatedPayload(project: ProjectItem) {
  const cleanSlug = project.slug.trim().toLowerCase()
  if (!SLUG_REGEX.test(cleanSlug) || cleanSlug.length < 2 || cleanSlug.length > 100) {
    throw new Error('Slug must use lowercase letters, numbers, and hyphens only (2-100 chars).')
  }

  const name = project.name.trim().slice(0, 160)
  const category = project.category.trim().slice(0, 120)
  const client = project.client.trim().slice(0, 160)
  const summary = project.summary.trim().slice(0, 500)
  const description = project.description.trim().slice(0, 3000)

  if (name.length < 2 || category.length < 2 || client.length < 2 || summary.length < 10 || description.length < 10) {
    throw new Error('Project name, category, client, summary (>=10 chars), and description (>=10 chars) are required.')
  }

  const tags = (project.tags.length > 0 ? project.tags : ['Altavox Tech'])
    .map((t) => t.trim().slice(0, 60))
    .filter(Boolean)
    .slice(0, 12)

  const keyFeatures = (project.keyFeatures.length > 0 ? project.keyFeatures : ['Operational production system'])
    .map((f) => f.trim().slice(0, 240))
    .filter(Boolean)
    .slice(0, 12)

  const payload: Record<string, unknown> = {
    slug: cleanSlug,
    name,
    category,
    client,
    summary,
    description,
    status: project.status,
    projectGroup: project.projectGroup,
    visibility: project.visibility === 'private' ? 'private' : 'public',
    url: (project.url || `https://altavox.space/projects/${cleanSlug}`).trim().slice(0, 300),
    tags,
    keyFeatures,
  }

  if (project.engineeringChallenge?.trim()) {
    payload.engineeringChallenge = project.engineeringChallenge.trim().slice(0, 2000)
  }
  if (project.engineeringSolution?.trim()) {
    payload.engineeringSolution = project.engineeringSolution.trim().slice(0, 2000)
  }
  if (project.screenshotUrl?.trim()) {
    payload.screenshotUrl = project.screenshotUrl.trim().slice(0, 500)
  }
  if (project.architecture?.frontend?.trim()) {
    payload.frontendStack = project.architecture.frontend.trim().slice(0, 240)
  }
  if (project.architecture?.backend?.trim()) {
    payload.backendStack = project.architecture.backend.trim().slice(0, 240)
  }
  if (project.architecture?.database?.trim()) {
    payload.databaseStack = project.architecture.database.trim().slice(0, 240)
  }
  if (project.architecture?.infrastructure?.trim()) {
    payload.infrastructureStack = project.architecture.infrastructure.trim().slice(0, 240)
  }

  return { cleanSlug, payload }
}

export async function saveProjectInFirestore(project: ProjectItem, ownerUid: string): Promise<void> {
  const { cleanSlug, payload } = buildValidatedPayload(project)
  const docPath = `projects/${cleanSlug}`
  const ref = doc(db, 'projects', cleanSlug)

  try {
    const existing = await getDoc(ref)
    if (existing.exists()) {
      await updateDoc(ref, {
        ...payload,
        updatedAt: serverTimestamp(),
      })
    } else {
      await setDoc(ref, {
        ...payload,
        ownerUid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, docPath)
  }
}

export async function syncAllProjectsToFirestore(ownerUid: string): Promise<number> {
  let count = 0
  for (const proj of staticProjects) {
    await saveProjectInFirestore(proj, ownerUid)
    count += 1
  }
  return count
}

export async function deleteProjectFromFirestore(slug: string): Promise<void> {
  const docPath = `projects/${slug}`
  try {
    await deleteDoc(doc(db, 'projects', slug))
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, docPath)
  }
}
