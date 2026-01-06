'use client'

import Link from 'next/link'
import { Mail, Instagram } from 'lucide-react'
import Image from 'next/image'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative z-10 bg-premium-darkGray border-t border-premium-gold/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10">
                <Image
                  src="/magicwrites_logo.jpg"
                  alt="Magicwrites Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-serif font-bold gold-text-gradient">
                Magicwrites
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              A premium platform for timeless writings, anthologies, and quotes.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-premium-gold font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-premium-gold transition-colors">
                  Journal
                </Link>
              </li>
              <li>
                <Link href="/anthologies" className="text-gray-400 hover:text-premium-gold transition-colors">
                  Anthologies
                </Link>
              </li>
              <li>
                <Link href="/novels" className="text-gray-400 hover:text-premium-gold transition-colors">
                  Novels
                </Link>
              </li>
              <li>
                <Link href="/quotes" className="text-gray-400 hover:text-premium-gold transition-colors">
                  Quotes
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-premium-gold transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-premium-gold font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/magicwrites_official"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-premium-gold/10 rounded-lg hover:bg-premium-gold/20 text-premium-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/pari-meena-5b7814297"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-premium-gold/10 rounded-lg hover:bg-premium-gold/20 text-premium-gold transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="mailto:magicwritesofficial@gmail.com"
                className="p-2 bg-premium-gold/10 rounded-lg hover:bg-premium-gold/20 text-premium-gold transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-premium-gold/10 text-center text-gray-500 text-sm">
          <p>© {currentYear} Magicwrites. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
