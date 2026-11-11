import type { MetadataRoute } from 'next'
import { coursesData } from '@/lib/courses-data'
import { projects } from '@/lib/site-data'

const siteUrl = 'https://altavox.space'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    'about',
    'services',
    'projects',
    'academy',
    'academy/dashboard',
    'cloud',
    'ai',
    'developers',
    'marketplace',
    'portal',
    'business',
    'support',
    'connect',
    'labs',
    'partners',
    'refund',
    'store',
    'case-studies',
    'courses',
    'wifi',
    'launchpad',
    'deployments',
    'computer',
    'contact',
    'start-project',
    'insights',
    'technology',
    'corporate',
    'privacy',
    'terms',
    'os',
    'trust',
    'status',
    'partners/portal'
  ]

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: route ? `${siteUrl}/${route}` : siteUrl,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : ['academy', 'cloud', 'ai', 'developers', 'marketplace', 'projects'].includes(route) ? 0.9 : 0.7
  }))

  const courseEntries: MetadataRoute.Sitemap = coursesData.flatMap((course) => [
    {
      url: `${siteUrl}/academy/courses/${course.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8
    },
    {
      url: `${siteUrl}/courses/${course.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.75
    }
  ])

  const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8
  }))

  return [...staticEntries, ...courseEntries, ...projectEntries]
}
