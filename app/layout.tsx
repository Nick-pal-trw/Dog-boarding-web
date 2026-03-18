import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'The Pawsome Retreat | Luxury Dog Boarding in Orange County',
  description: 'Premium dog boarding with 24/7 camera-monitored private cabins and daily digital pup-reports. Your dog deserves a luxury home away from home.',
  generator: 'v0.app',
  openGraph: {
    title: 'The Pawsome Retreat | Luxury Dog Boarding in Orange County',
    description: 'Premium dog boarding with 24/7 camera-monitored private cabins and daily digital pup-reports. Your dog deserves a luxury home away from home.',
    siteName: 'The Pawsome Retreat',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'A happy Golden Retriever relaxing in a luxury dog boarding suite',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Pawsome Retreat | Luxury Dog Boarding',
    description: '24/7 camera-monitored luxury cabins for your peace of mind.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
