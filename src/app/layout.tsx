import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import BubbleBackground from '@/components/BubbleBackground'

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
  title: 'Magicwrites - Premium Writing & Journaling Platform',
  description: 'A luxurious platform for writings, anthologies, and quotes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <div className="min-h-screen flex flex-col bg-premium-black">
          {/* Animated Bubble Background */}
          <BubbleBackground />
          
          <Navigation />
          
          <main className="flex-1 relative z-10">
            {children}
          </main>
          
          <Footer />
        </div>
      </body>
    </html>
  )
}
