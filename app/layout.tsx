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

const title = 'PEN Group Foundation — Where every story takes root'
const description =
  'PEN Group Foundation is the charitable foundation of PEN Group Holdings, putting books, learning and green community space within reach of every child. Give, volunteer or partner with us.'

export const metadata: Metadata = {
  metadataBase: new URL('https://foundation.pencloud.uk'),
  title,
  description,
  icons: { icon: '/favicon.png', apple: '/apple-touch-icon.png' },
  openGraph: {
    title,
    description: 'Books, learning and green community space within reach of every child.',
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
