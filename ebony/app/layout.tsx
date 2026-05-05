import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'EBONY Lounge — Luxury Nightclub Experience',
  description: 'Experience the finest nightlife at EBONY Lounge. Premium cocktails, exclusive events, and unforgettable nights in an atmosphere of pure luxury.',
  keywords: 'EBONY, nightclub, lounge, luxury, events, cocktails, VIP',
  openGraph: {
    title: 'EBONY Lounge',
    description: 'Luxury Nightclub Experience',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-ebony-black text-[#F5F0E8] font-body antialiased noise-overlay">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
