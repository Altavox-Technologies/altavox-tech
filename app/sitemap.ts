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
    'case-studies',
    'courses',
    'wifi',
    'launchpad',
    'deployments',
    'computer',
    'store',
    'contact',
    'start-project',
    'insights',
    'technology',
    'corporate',
    'privacy',
    'terms'
  ]

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: route ? `${siteUrl}/${route}` : siteUrl,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : ['services', 'projects', 'courses', 'wifi', 'store'].includes(route) ? 0.8 : 0.6
  }))

  const courseEntries: MetadataRoute.Sitemap = coursesData.map((course) => ({
    url: `${siteUrl}/courses/${course.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7
  }))

  const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.75
  }))

  return [...staticEntries, ...courseEntries, ...projectEntries]
}
