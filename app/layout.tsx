import type { Metadata, Viewport } from 'next'
import './globals.css'

const brandEmblem = '/capricorn_emblem_clean_black.svg'

export const metadata: Metadata = {
  metadataBase: new URL('https://altavox.space'),
  title: {
    default: 'Altavox Technologies | Software, AI & Digital Systems',
    template: '%s | Altavox Technologies',
  },
  description: 'Altavox Tech engineers software platforms, ISP billing systems, cloud infrastructure, and operational tools designed for reliability and clarity.',
  applicationName: 'Altavox Tech',
  generator: 'Altavox Tech',
  alternates: { canonical: '/' },
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' },
      { url: '/favicon.svg', type: 'image/svg+xml', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml', sizes: 'any' },
    ],
    shortcut: [{ url: '/favicon.ico', type: 'image/x-icon' }],
    apple: [{ url: '/apple-icon.svg', type: 'image/svg+xml' }],
  },
  openGraph: {
    type: 'website',
    siteName: 'Altavox Technologies',
    title: 'Altavox Technologies | Software, AI & Digital Systems',
    description: 'Software engineering, digital product development, ISP billing, infrastructure, and connected systems.',
    url: 'https://altavox.space',
    images: [{ url: brandEmblem, alt: 'Altavox Tech Capricorn brand emblem' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Altavox Technologies',
    description: 'Software engineering, digital product development, ISP billing, infrastructure, and connected systems.',
    images: [brandEmblem],
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#07294d',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://altavox.space/#organization',
      name: 'Altavox Tech',
      url: 'https://altavox.space',
      logo: 'https://altavox.space/capricorn_emblem_clean_black.svg',
      description: 'Software systems engineering, ISP billing automation, educational SIMS platforms, and technical training.',
      telephone: '+255750227073',
      email: 'engineering@altavox.space',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Nduruma Road, Unguuni',
        addressLocality: 'Arusha',
        postalCode: '23219',
        addressCountry: 'TZ'
      },
      sameAs: [
        'https://github.com/yurian51/altavox-tech',
        'https://jaslyn-net.altavox.space',
        'https://sammena.altavox.space'
      ]
    },
    {
      '@type': 'WebSite',
      '@id': 'https://altavox.space/#website',
      url: 'https://altavox.space',
      name: 'Altavox Tech',
      publisher: {
        '@id': 'https://altavox.space/#organization'
      },
      inLanguage: 'en-US'
    }
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
