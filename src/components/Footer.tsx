'use client'

import Link from 'next/link'
import { Mail, Instagram, Twitter, Facebook, Feather } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative z-10 bg-premium-darkGray border-t border-premium-gold/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Feather className="w-8 h-8 text-premium-gold" />
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
                href="#"
                className="p-2 bg-premium-gold/10 rounded-lg hover:bg-premium-gold/20 text-premium-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="p-2 bg-premium-gold/10 rounded-lg hover:bg-premium-gold/20 text-premium-gold transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="p-2 bg-premium-gold/10 rounded-lg hover:bg-premium-gold/20 text-premium-gold transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="mailto:contact@magicwrites.com"
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
