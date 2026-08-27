import type { Metadata, Viewport } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'

// Self-hosted by Next at build time — no third-party connection blocking text.
const outfit = Outfit({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-outfit',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

const title = 'PEN Group Foundation | Charitable, educational and community initiatives'
const description =
  'The PEN Group Foundation supports charitable, educational and community-focused initiatives around the world, investing in people, supporting worthwhile causes and partnering with organisations that share our values.'

export const metadata: Metadata = {
  metadataBase: new URL('https://foundation.pencloud.uk'),
  title,
  description,
  icons: { icon: '/favicon.png', apple: '/apple-touch-icon.png' },
  openGraph: {
    title,
    description:
      'Supporting charitable, educational and community-focused initiatives around the world.',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
}

export const viewport: Viewport = {
  themeColor: '#05274E',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
