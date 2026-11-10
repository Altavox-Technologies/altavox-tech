import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Altavox Tech',
    short_name: 'Altavox',
    description: 'Altavox Tech',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#07294d',
    icons: [
      { src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
      { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  }
}
